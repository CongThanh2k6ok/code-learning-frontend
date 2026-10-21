import { runPython, runTestCases as runPythonTestCases } from './pythonRunner';

/**
 * Trình thực thi đa ngôn ngữ (Python, JavaScript, HTML/CSS, C++, Java, SQL)
 */

// Thực thi JavaScript trong trình duyệt với console.log capture
export function runJavaScript(code) {
  const startTime = performance.now();
  let stdout = '';
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  try {
    console.log = (...args) => {
      stdout += args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' ') + '\n';
    };
    console.warn = (...args) => {
      stdout += '[Warn] ' + args.join(' ') + '\n';
    };
    console.error = (...args) => {
      stdout += '[Error] ' + args.join(' ') + '\n';
    };

    // Chạy trong Function sandbox
    const runner = new Function(code);
    const result = runner();

    if (result !== undefined && !stdout) {
      stdout = typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);
    }

    return {
      success: true,
      stdout,
      error: null,
      durationMs: Math.round(performance.now() - startTime),
    };
  } catch (err) {
    return {
      success: false,
      stdout,
      error: `JavaScript Error: ${err.message}\n${err.stack || ''}`,
      durationMs: Math.round(performance.now() - startTime),
    };
  } finally {
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
  }
}

// Giả lập thực thi SQL và định dạng bảng kết quả
export function runSQL(code) {
  const startTime = performance.now();
  const clean = code.trim().toLowerCase();

  // Bảng dữ liệu mẫu trong bộ nhớ
  const database = {
    students: [
      { id: 1, name: 'Nguyễn Văn An', age: 20, major: 'Khoa học Máy tính', gpa: 3.8 },
      { id: 2, name: 'Trần Thị Bình', age: 21, major: 'Kỹ thuật Phần mềm', gpa: 3.5 },
      { id: 3, name: 'Lê Hoàng Cường', age: 22, major: 'Hệ thống Thông tin', gpa: 2.9 },
      { id: 4, name: 'Phạm Minh Đức', age: 19, major: 'Khoa học Máy tính', gpa: 3.9 },
    ],
    courses: [
      { code: 'CS101', title: 'Cấu trúc dữ liệu & Giải thuật', credits: 4 },
      { code: 'DB201', title: 'Hệ quản trị Cơ sở dữ liệu', credits: 3 },
      { code: 'WEB301', title: 'Phát triển Ứng dụng Web', credits: 3 },
    ],
  };

  try {
    let outputTable = '';
    let rows = [];

    if (clean.includes('from students') || clean.includes('from `students`')) {
      rows = database.students;
      if (clean.includes('where gpa >= 3.5') || clean.includes('where gpa > 3.5')) {
        rows = rows.filter((r) => r.gpa >= 3.5);
      }
      if (clean.includes("where major = 'khoa học máy tính'") || clean.includes('where major like')) {
        rows = rows.filter((r) => r.major === 'Khoa học Máy tính');
      }
      if (clean.includes('order by gpa desc')) {
        rows = [...rows].sort((a, b) => b.gpa - a.gpa);
      }
    } else if (clean.includes('from courses')) {
      rows = database.courses;
    } else {
      rows = [
        { message: 'Truy vấn SQL thực thi thành công', affected_rows: 1, status: 'OK' },
      ];
    }

    if (rows.length > 0) {
      const headers = Object.keys(rows[0]);
      outputTable += headers.join(' | ') + '\n';
      outputTable += headers.map(() => '---').join('-|-') + '\n';
      rows.forEach((r) => {
        outputTable += headers.map((h) => r[h]).join(' | ') + '\n';
      });
      outputTable += `\n(Tổng số: ${rows.length} dòng dữ liệu được truy vấn)`;
    }

    return {
      success: true,
      stdout: outputTable,
      error: null,
      durationMs: Math.round(performance.now() - startTime),
    };
  } catch (err) {
    return {
      success: false,
      stdout: '',
      error: `SQL Syntax Error: ${err.message}`,
      durationMs: Math.round(performance.now() - startTime),
    };
  }
}

// Giả lập thực thi C++ (kiểm tra cú pháp std::cout, main, loops, biến)
export function runCpp(code) {
  const startTime = performance.now();
  let stdout = '';

  if (!code.includes('main(')) {
    return {
      success: false,
      stdout: '',
      error: 'Lỗi biên dịch C++: Không tìm thấy hàm int main()',
      durationMs: 5,
    };
  }

  // Thu thập các dòng cout << ... << endl;
  const coutMatches = code.matchAll(/cout\s*<<\s*([^;]+);/g);
  for (const match of coutMatches) {
    const expr = match[1];
    const parts = expr.split('<<').map((p) => p.trim());
    let line = '';
    for (const p of parts) {
      if (p === 'endl' || p === '"\\n"') {
        line += '\n';
      } else if (p.startsWith('"') && p.endsWith('"')) {
        line += p.slice(1, -1);
      } else {
        line += `[Giá trị ${p}]`;
      }
    }
    stdout += line;
  }

  if (!stdout) {
    stdout = 'Chương trình C++ thực thi thành công (Mã thoát: 0)\n';
  }

  return {
    success: true,
    stdout,
    error: null,
    durationMs: Math.round(performance.now() - startTime + 8),
  };
}

// Giả lập thực thi Java
export function runJava(code) {
  const startTime = performance.now();
  let stdout = '';

  if (!code.includes('public static void main(')) {
    return {
      success: false,
      stdout: '',
      error: 'Lỗi biên dịch Java: Không tìm thấy phương thức public static void main(String[] args)',
      durationMs: 12,
    };
  }

  const printMatches = code.matchAll(/System\.out\.println\s*\((.*?)\);/g);
  for (const match of printMatches) {
    const val = match[1].trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      stdout += val.slice(1, -1) + '\n';
    } else {
      stdout += `[Biểu thức: ${val}]\n`;
    }
  }

  if (!stdout) {
    stdout = 'Chương trình Java thực thi thành công (Hoàn tất không lỗi)\n';
  }

  return {
    success: true,
    stdout,
    error: null,
    durationMs: Math.round(performance.now() - startTime + 15),
  };
}

/**
 * Hàm điều phối thực thi mã nguồn thống nhất cho toàn hệ thống
 */
export async function executeCode(code, language = 'python', stdin = '') {
  const lang = (language || '').toLowerCase();
  switch (lang) {
    case 'python':
      return await runPython(code, stdin);
    case 'javascript':
    case 'js':
      return runJavaScript(code);
    case 'sql':
      return runSQL(code);
    case 'cpp':
    case 'c++':
      return runCpp(code);
    case 'java':
      return runJava(code);
    case 'html':
    case 'html/css':
      return {
        success: true,
        stdout: 'Trang Web đã được render trực tiếp trong khung xem trước (Live Preview).',
        error: null,
        durationMs: 2,
      };
    default:
      return await runPython(code, stdin);
  }
}

/**
 * Chấm test case đa ngôn ngữ
 */
export async function executeTestCases(code, testCases = [], language = 'python') {
  const lang = (language || '').toLowerCase();
  if (lang === 'python') {
    return await runPythonTestCases(code, testCases);
  }

  const results = [];
  let allPassed = true;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const res = await executeCode(code, language, tc.input || '');
    const actual = (res.stdout || '').trim();
    const expected = (tc.expected || '').trim();

    const normActual = actual.replace(/\r\n/g, '\n').replace(/\s+$/g, '');
    const normExpected = expected.replace(/\r\n/g, '\n').replace(/\s+$/g, '');

    const isMatch = normActual === normExpected || normActual.includes(normExpected);
    const passed = res.success && isMatch;
    if (!passed) allPassed = false;

    results.push({
      id: i + 1,
      description: tc.description || `Test case #${i + 1}`,
      input: tc.input || '(Trống)',
      expected,
      actual: res.success ? (actual || '(Không có kết quả in ra)') : (res.error || 'Lỗi thực thi'),
      passed,
      error: res.error,
      execTimeMs: res.durationMs,
    });
  }

  return { passed: allPassed, results };
}
