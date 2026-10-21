import { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('cl_theme') || 'dark');
  const [fontSize, setFontSize] = useState(() => Number(localStorage.getItem('cl_font_size') || 14));
  const [fontFamily, setFontFamily] = useState(() => localStorage.getItem('cl_font_family') || "'Fira Code', monospace");
  const [notifications, setNotifications] = useState(() => localStorage.getItem('cl_notifications') !== 'false');
  const [soundEffects, setSoundEffects] = useState(() => localStorage.getItem('cl_sounds') !== 'false');
  const [reminder, setReminder] = useState(() => localStorage.getItem('cl_reminder') !== 'false');
  const [reminderTime, setReminderTime] = useState(() => localStorage.getItem('cl_reminder_time') || '20:00');
  const [dailyGoal, setDailyGoal] = useState(() => Number(localStorage.getItem('cl_daily_goal') || 2));
  const [currentLanguage, setCurrentLanguage] = useState(() => localStorage.getItem('cl_active_lang') || 'python');

  // Áp dụng theme vào document element
  useEffect(() => {
    localStorage.setItem('cl_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cl_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('cl_font_family', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('cl_notifications', notifications);
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('cl_sounds', soundEffects);
  }, [soundEffects]);

  useEffect(() => {
    localStorage.setItem('cl_reminder', reminder);
  }, [reminder]);

  useEffect(() => {
    localStorage.setItem('cl_reminder_time', reminderTime);
  }, [reminderTime]);

  useEffect(() => {
    localStorage.setItem('cl_daily_goal', dailyGoal);
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem('cl_active_lang', currentLanguage);
  }, [currentLanguage]);

  // Âm thanh thông báo nhẹ nhàng khi pass test / nhận thưởng
  const playSound = (type = 'success') => {
    if (!soundEffects) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'click') {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch {
      // Bỏ qua nếu audio context bị giới hạn
    }
  };

  const value = {
    theme,
    setTheme,
    fontSize,
    setFontSize,
    fontFamily,
    setFontFamily,
    notifications,
    setNotifications,
    soundEffects,
    setSoundEffects,
    reminder,
    setReminder,
    reminderTime,
    setReminderTime,
    dailyGoal,
    setDailyGoal,
    currentLanguage,
    setCurrentLanguage,
    playSound,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}
