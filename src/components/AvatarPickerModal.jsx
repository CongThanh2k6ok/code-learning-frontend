import React, { useState } from 'react';
import UserAvatar from './UserAvatar';

const PRESET_AVATARS = [
  { id: 'dev_m', emoji: '👨‍💻', name: 'Cyber Coder (Nam)' },
  { id: 'dev_f', emoji: '👩‍💻', name: 'Tech Girl (Nữ)' },
  { id: 'ninja', emoji: '🥷', name: 'Code Ninja' },
  { id: 'robot', emoji: '🤖', name: 'AI Android' },
  { id: 'cat', emoji: '🐱‍💻', name: 'Hacker Cat' },
  { id: 'rocket', emoji: '🚀', name: 'Cosmic Voyager' },
  { id: 'wizard', emoji: '🧙‍♂️', name: 'Algorithm Wizard' },
  { id: 'pixel', emoji: '👾', name: 'Retro 8-Bit' },
  { id: 'fox', emoji: '🦊', name: 'Firefox Explorer' },
  { id: 'bolt', emoji: '⚡', name: 'Neon Flash' },
  { id: 'brain', emoji: '🧠', name: 'Neural Architect' },
  { id: 'scientist', emoji: '👨‍🔬', name: 'Data Scientist' },
  { id: 'owl', emoji: '🦉', name: 'Night Owl Dev' },
  { id: 'shield', emoji: '🛡️', name: 'Cyber Security' },
  { id: 'dragon', emoji: '🐉', name: 'Dragon Hacker' },
  { id: 'crown', emoji: '👑', name: 'Legendary Lead' },
];

export default function AvatarPickerModal({ currentAvatar, onSave, onClose }) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar || '👨‍💻');
  const [previewCustom, setPreviewCustom] = useState(
    typeof currentAvatar === 'string' && currentAvatar.startsWith('data:image') ? currentAvatar : null
  );
  const [activeTab, setActiveTab] = useState(
    typeof currentAvatar === 'string' && currentAvatar.startsWith('data:image') ? 'upload' : 'preset'
  );
  const [errorMsg, setErrorMsg] = useState('');

  // Xử lý chọn file ảnh từ máy
  const handleFileChange = (e) => {
    setErrorMsg('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Vui lòng chọn định dạng ảnh hợp lệ (PNG, JPG, WebP, GIF)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg('Kích thước ảnh tối đa là 2MB. Vui lòng chọn ảnh nhỏ hơn.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setPreviewCustom(base64);
      setSelectedAvatar(base64);
    };
    reader.onerror = () => {
      setErrorMsg('Không thể đọc file ảnh. Vui lòng thử lại.');
    };
    reader.readAsDataURL(file);
  };

  const handleApply = () => {
    onSave(selectedAvatar);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card avatar-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="between modal-head">
          <div className="row-center gap-2">
            <span style={{ fontSize: '1.4rem' }}>🎨</span>
            <h3 style={{ margin: 0 }}>Tùy Chỉnh Ảnh Đại Diện Cá Nhân</h3>
          </div>
          <button className="btn-close" onClick={onClose} title="Đóng">✕</button>
        </div>

        {/* Live Preview trên đỉnh */}
        <div className="avatar-modal-preview">
          <div className="preview-glow-ring">
            <UserAvatar user={{ avatar: selectedAvatar }} size="2xl" />
          </div>
          <div className="preview-info">
            <div className="preview-title">Ảnh đại diện đang chọn</div>
            <div className="small muted">
              {typeof selectedAvatar === 'string' && selectedAvatar.startsWith('data:image')
                ? 'Ảnh tải lên từ máy tính cá nhân'
                : 'Linh vật lập trình viên 3D'}
            </div>
          </div>
        </div>

        {/* Tab chuyển đổi */}
        <div className="avatar-modal-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'preset' ? 'active' : ''}`}
            onClick={() => setActiveTab('preset')}
          >
            ✨ 16 Linh vật độc quyền
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            📁 Tải ảnh từ máy tính
          </button>
        </div>

        {/* Tab 1: Linh vật Preset */}
        {activeTab === 'preset' && (
          <div className="avatar-presets-grid">
            {PRESET_AVATARS.map((p) => {
              const isSelected = selectedAvatar === p.emoji;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`avatar-preset-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedAvatar(p.emoji);
                    setPreviewCustom(null);
                  }}
                  title={p.name}
                >
                  <span className="preset-emoji">{p.emoji}</span>
                  <span className="preset-name">{p.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: Tải file từ máy */}
        {activeTab === 'upload' && (
          <div className="avatar-upload-area">
            <label className="upload-dropzone">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div className="dropzone-icon">📷</div>
              <div className="dropzone-text">
                <b>Nhấp để chọn ảnh từ máy tính</b>
                <span className="small muted">Hỗ trợ PNG, JPG, WebP, GIF (Tối đa 2MB)</span>
              </div>
            </label>

            {errorMsg && <div className="alert error small" style={{ marginTop: '0.8rem' }}>{errorMsg}</div>}

            {previewCustom && (
              <div className="custom-photo-preview between">
                <span className="small muted">✓ Đã tải ảnh lên thành công</span>
                <button
                  type="button"
                  className="btn-link small danger"
                  onClick={() => {
                    setPreviewCustom(null);
                    setSelectedAvatar('👨‍💻');
                  }}
                >
                  Xóa ảnh
                </button>
              </div>
            )}
          </div>
        )}

        <div className="modal-actions between" style={{ marginTop: '1.5rem' }}>
          <button type="button" className="btn ghost" onClick={onClose}>
            Hủy bỏ
          </button>
          <button type="button" className="btn" onClick={handleApply}>
            Lưu ảnh đại diện ngay ✓
          </button>
        </div>
      </div>
    </div>
  );
}
