import React from 'react';

/**
 * Component hiển thị Avatar người dùng hỗ trợ:
 * - Ảnh tự tải lên từ thiết bị (Data URL base64 hoặc link ảnh ngoài)
 * - Bộ biểu tượng / 3D emoji phong cách lập trình viên
 * - Fallback theo vai trò
 */
export default function UserAvatar({
  user,
  size = 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  showStatus = false,
  status = 'online',
  className = '',
  onClick,
}) {
  const avatar = user?.avatar;
  const isImage = typeof avatar === 'string' && (avatar.startsWith('data:image') || avatar.startsWith('http') || avatar.startsWith('/'));

  const sizeClasses = {
    xs: 'avatar-xs',
    sm: 'avatar-sm',
    md: 'avatar-md',
    lg: 'avatar-lg',
    xl: 'avatar-xl',
    '2xl': 'avatar-2xl',
  };

  const roleEmoji = user?.role === 'mentor' ? '👨‍🏫' : '👨‍💻';
  const displayEmoji = avatar || roleEmoji;

  return (
    <div
      className={`user-avatar-root ${sizeClasses[size] || 'avatar-md'} ${className} ${onClick ? 'clickable' : ''}`}
      onClick={onClick}
      title={user?.name || 'Tài khoản'}
    >
      <div className="avatar-inner">
        {isImage ? (
          <img src={avatar} alt={user?.name || 'Avatar'} className="avatar-img" />
        ) : (
          <span className="avatar-emoji">{displayEmoji}</span>
        )}
      </div>
      {showStatus && <span className={`avatar-status-dot ${status}`} />}
    </div>
  );
}
