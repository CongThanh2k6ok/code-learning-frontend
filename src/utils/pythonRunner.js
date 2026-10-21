/**
 * Trình thực thi Python trong trình duyệt sử dụng Skulpt
 * Hỗ trợ chạy mã Python 3, thu thập kết quả stdout/stderr, xử lý input(),
 * giới hạn thời gian (tránh lặp vô tận) và chấm tự động bộ test case.
 */

let skulptLoadPromise = null;

export function loadSkulpt() {
  if (window.Sk) return Promise.resolve(window.Sk);
  if (skulptLoadPromise) return skulptLoadPromise;

  skulptLoadPromise = new Promise((resolve) => {
    // Nếu script đã có trong document nhưng đang tải
    if (document.querySelector('script[src*="skulpt.min.js"]')) {
      const check = setInterval(() => {
        if (window.Sk) {
          clearInterval(check);
          resolve(window.Sk);
        }
      }, 100);
      setTimeout(() => {
        clearInterval(check);
        resolve(window.Sk || null);
      }, 5000);
      return;
    }

    const script1 = document.createElement('script');
    script1.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js';
    script1.async = true;

    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js';
      script2.async = true;
      script2.onload = () => resolve(window.Sk);
      script2.onerror = () => resolve(window.Sk);
      document.head.appendChild(script2);
    };

    script1.onerror = (e) => {
      console.warn('Không thể tải Skulpt từ CDN, sẽ dùng bộ giả lập dự phòng.', e);
      resolve(null);
    };

    document.head.appendChild(script1);
  });

  return skulptLoadPromise;
}

// Bộ thực thi dự phòng cơ bản bằng JS khi không có mạng hoặc chưa tải xong Skulpt
function runFallbackPython(code, inputStr = '') {
  const inputs = (inputStr || '').split('\n').filter((l) => l.length > 0);
  let inputIdx = 0;
  let stdout = '';

  const mockPrint = (...args) => {
    stdout += args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n';
  };

  try {
    let jsCode = code
      .replace(/#.*$/gm, '')
      .replace(/\bprint\s*\((.*?)\)/g, 'mockPrint($1)')
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\b/g, '!')
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null')
      .replace(/\belif\b/g, 'else if');

    const fn = new Function('mockPrint', 'inputList', 'inputIdx', `
      let input = () => inputList[inputIdx++] || '';
      try {
        ${jsCode}
      } catch(e) {
        throw e;
      }
    `);
    fn(mockPrint, inputs, inputIdx);
    return { success: true, stdout, error: null };
  } catch (err) {
    return {
      success: false,
      stdout,
      error: `Lỗi thực thi: ${err.message || String(err)}`,
    };
  }
}

/**
 * Chạy mã Python trực tiếp trong trình duyệt
 * @param {string} code - Mã nguồn Python
 * @param {string} inputStr - Chuỗi input truyền vào các hàm input()
 * @param {number} timeoutMs - Thời gian tối đa cho phép chạy (tránh vòng lặp vô tận)
 */
export async function runPython(code, inputStr = '', timeoutMs = 5000) {
  const startTime = performance.now();
  let stdout = '';

  try {
    const Sk = await loadSkulpt();
    if (!Sk) {
      const res = runFallbackPython(code, inputStr);
      return {
        ...res,
        durationMs: Math.round(performance.now() - startTime),
      };
    }

    const inputs = (inputStr || '').split('\n');
    let inputIdx = 0;

    Sk.configure({
      output: (text) => {
        stdout += text;
      },
      read: (filename) => {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles['files'][filename] === undefined) {
          throw new Error(`Không tìm thấy module: '${filename}'`);
        }
        return Sk.builtinFiles['files'][filename];
      },
      inputfun: () => {
        if (inputIdx < inputs.length) {
          return inputs[inputIdx++];
        }
        return '';
      },
      inputfunTakesPrompt: false,
      execLimit: timeoutMs,
      __future__: Sk.python3,
    });

    await Sk.misceval.asyncToPromise(() => {
      return Sk.importMainWithBody('<stdin>', false, code, true);
    });

    return {
      success: true,
      stdout,
      error: null,
      durationMs: Math.round(performance.now() - startTime),
    };
  } catch (err) {
    let errMsg = err.toString();
    if (errMsg.includes('TimeLimitError') || errMsg.includes('execLimit')) {
      errMsg = 'Lỗi thời gian chạy (Time Limit Exceeded): Mã của bạn có thể chứa vòng lặp vô tận (infinite loop).';
    }
    return {
      success: false,
      stdout,
      error: errMsg,
      durationMs: Math.round(performance.now() - startTime),
    };
  }
}

/**
 * Chấm tự động bộ test case cho bài tập
 * @param {string} code
 * @param {Array<{input: string, expected: string, description?: string}>} testCases
 */
export async function runTestCases(code, testCases = []) {
  if (!testCases || testCases.length === 0) {
    const single = await runPython(code);
    return {
      passed: single.success,
      results: [
        {
          id: 1,
          description: 'Kiểm tra cú pháp và thực thi cơ bản',
          input: '(Không có)',
          expected: '(Chạy thành công không lỗi)',
          actual: single.success ? (single.stdout || '(Không có kết quả in ra màn hình)') : single.error,
          passed: single.success,
          error: single.error,
          execTimeMs: single.durationMs,
        },
      ],
    };
  }

  const results = [];
  let allPassed = true;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const res = await runPython(code, tc.input || '');

    const actual = (res.stdout || '').trim();
    const expected = (tc.expected || '').trim();

    // Chuẩn hóa định dạng xuống dòng và khoảng trắng cuối
    const normActual = actual.replace(/\r\n/g, '\n').replace(/\s+$/g, '');
    const normExpected = expected.replace(/\r\n/g, '\n').replace(/\s+$/g, '');

    const isMatch = normActual === normExpected || normActual.endsWith(normExpected);
    const passed = res.success && isMatch;

    if (!passed) allPassed = false;

    results.push({
      id: i + 1,
      description: tc.description || `Test case #${i + 1}`,
      input: tc.input || '(Trống)',
      expected,
      actual: res.success ? (actual || '(Không in ra gì)') : (res.error || 'Lỗi thực thi'),
      passed,
      error: res.error,
      execTimeMs: res.durationMs,
    });
  }

  return {
    passed: allPassed,
    results,
  };
}
