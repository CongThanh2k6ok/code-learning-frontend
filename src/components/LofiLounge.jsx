import React, { useState, useEffect, useRef } from 'react';

/**
 * Lofi Coding Lounge & Mechanical Keyboard Sound Synthesizer
 * Sử dụng Web Audio API để tạo âm thanh gõ phím cơ, tiếng mưa, lofi ambient 100% offline không cần file ngoài
 */
export default function LofiLounge() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [ambientType, setAmbientType] = useState('lofi'); // 'lofi' | 'rain' | 'cafe'
  const [volume, setVolume] = useState(0.3);
  const [enableKeyboardSound, setEnableKeyboardSound] = useState(true);

  const audioCtxRef = useRef(null);
  const ambientNodesRef = useRef([]);

  // Khởi tạo AudioContext
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Tạo âm thanh gõ bàn phím cơ (Mechanical Keyboard Click) bằng Web Audio
  const playKeyClick = () => {
    if (!enableKeyboardSound) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Click tần số ngẫu nhiên nhẹ nhàng
      const freq = 1200 + Math.random() * 400;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04 * (volume * 2), ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // Bỏ qua lỗi audio
    }
  };

  // Lắng nghe sự kiện gõ phím toàn cục khi bật tiếng phím
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Chỉ gõ phím văn bản thông thường
      if (e.key.length === 1 || e.key === 'Enter' || e.key === 'Backspace' || e.key === 'Space') {
        playKeyClick();
      }
    };

    if (enableKeyboardSound) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enableKeyboardSound, volume]);

  // Dừng âm thanh nền
  const stopAmbient = () => {
    ambientNodesRef.current.forEach((node) => {
      try {
        if (node.stop) node.stop();
        node.disconnect();
      } catch (e) {}
    });
    ambientNodesRef.current = [];
    setIsPlayingAmbient(false);
  };

  // Phát âm thanh môi trường tổng hợp (Lofi Synth / Rain)
  const startAmbient = (type) => {
    stopAmbient();
    const ctx = getAudioContext();
    if (!ctx) return;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
    masterGain.connect(ctx.destination);
    ambientNodesRef.current.push(masterGain);

    if (type === 'lofi') {
      // Hợp âm Lofi Chill êm dịu (Cmaj7 / Am9)
      const freqs = [130.81, 164.81, 196.0, 246.94]; // C3, E3, G3, B3
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        g.gain.setValueAtTime(0.08, ctx.currentTime);

        // LFO tạo hiệu ứng rung lofi ấm áp
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(g);
        g.connect(masterGain);
        osc.start();

        ambientNodesRef.current.push(osc, lfo);
      });
    } else if (type === 'rain') {
      // Tiếng mưa rơi (White Noise lọc thông dải thấp)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      ambientNodesRef.current.push(whiteNoise);
    } else if (type === 'cafe') {
      // Tiếng ấm cúng quán cafe (Pink Noise lọc thông dải ấm)
      const freqs = [220, 277.18, 329.63];
      freqs.forEach((f) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        g.gain.setValueAtTime(0.03, ctx.currentTime);
        osc.connect(g);
        g.connect(masterGain);
        osc.start();
        ambientNodesRef.current.push(osc);
      });
    }

    setIsPlayingAmbient(true);
  };

  const toggleAmbient = () => {
    if (isPlayingAmbient) {
      stopAmbient();
    } else {
      startAmbient(ambientType);
    }
  };

  const handleTypeChange = (type) => {
    setAmbientType(type);
    if (isPlayingAmbient) {
      startAmbient(type);
    }
  };

  return (
    <div className="lofi-lounge-widget">
      {/* Nút bấm nổi mở Lounge */}
      <button
        type="button"
        className={`btn-lofi-trigger ${isPlayingAmbient ? 'spinning' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Góc Nhạc Lofi & Âm Thanh Tập Trung"
      >
        <span className="lofi-icon">{isPlayingAmbient ? '🎶' : '🎧'}</span>
        <span className="lofi-badge-text">Lofi Chill</span>
      </button>

      {/* Bảng điều khiển Lofi mở rộng */}
      {isOpen && (
        <div className="lofi-panel card">
          <div className="between lofi-header">
            <div className="row-center gap-2">
              <span style={{ fontSize: '1.2rem' }}>☕</span>
              <h4 style={{ margin: 0 }}>Góc Lập Trình Lofi & Tập Trung</h4>
            </div>
            <button className="btn-close-small" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="lofi-body">
            {/* Âm thanh phím cơ */}
            <div className="lofi-row between">
              <div>
                <div className="lofi-row-title">⌨️ Tiếng Gõ Phím Cơ Học</div>
                <div className="small muted">Âm thanh clicky khi bạn gõ code</div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={enableKeyboardSound}
                  onChange={(e) => setEnableKeyboardSound(e.target.checked)}
                />
                <span className="slider round" />
              </label>
            </div>

            {/* Nhạc nền Ambient */}
            <div className="lofi-row-ambient" style={{ marginTop: '0.8rem' }}>
              <div className="lofi-row-title" style={{ marginBottom: '0.4rem' }}>
                🎵 Âm thanh Môi trường Thư giãn
              </div>
              <div className="ambient-tabs">
                <button
                  type="button"
                  className={`ambient-tab ${ambientType === 'lofi' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('lofi')}
                >
                  🎧 Synth Chill
                </button>
                <button
                  type="button"
                  className={`ambient-tab ${ambientType === 'rain' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('rain')}
                >
                  🌧️ Tiếng Mưa
                </button>
                <button
                  type="button"
                  className={`ambient-tab ${ambientType === 'cafe' ? 'active' : ''}`}
                  onClick={() => handleTypeChange('cafe')}
                >
                  ☕ Cyber Cafe
                </button>
              </div>

              <div className="ambient-play-action between" style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  className={`btn small-btn ${isPlayingAmbient ? 'danger' : 'primary'}`}
                  onClick={toggleAmbient}
                >
                  {isPlayingAmbient ? '⏸ Tạm dừng âm thanh' : '▶ Bật âm thanh nền'}
                </button>

                {isPlayingAmbient && <span className="sound-wave-anim"><span></span><span></span><span></span></span>}
              </div>
            </div>

            {/* Điều chỉnh âm lượng */}
            <div className="lofi-volume-slider" style={{ marginTop: '1rem' }}>
              <div className="between small muted">
                <span>Âm lượng</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
