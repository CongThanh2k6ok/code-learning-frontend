import { request } from './client';
import { load, save, nextId, fakeAi } from './mockDb';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';
const wait = (v) => new Promise((r) => setTimeout(() => r(v), 120));
const currentUser = () => JSON.parse(localStorage.getItem('user') || 'null');
const strip = ({ password, ...u }) => u;

/* ---------------- Xác thực & hồ sơ ---------------- */
export const authApi = {
  async login({ email, password }) {
    if (!USE_MOCK) return request('/auth/login', { method: 'POST', body: { email, password } });
    const u = load().users.find((x) => x.email === email && x.password === password);
    if (!u) throw new Error('Email hoặc mật khẩu không đúng');
    return wait({ token: `mock-${u.id}`, user: strip(u) });
  },
  async register({ name, email, password }) {
    if (!USE_MOCK) return request('/auth/register', { method: 'POST', body: { name, email, password } });
    const db = load();
    if (db.users.some((x) => x.email === email)) throw new Error('Email đã được sử dụng');
    const u = {
      id: nextId(db.users),
      name,
      email,
      password,
      role: 'student',
      bio: '',
      language: 'Python',
      xp: 50,
      streak: 1,
      level: 'Lập trình viên Tập sự',
    };
    db.users.push(u);
    save(db);
    return wait({ token: `mock-${u.id}`, user: strip(u) });
  },
  async updateProfile(data) {
    if (!USE_MOCK) return request('/auth/profile', { method: 'PUT', body: data });
    const db = load();
    const cur = currentUser();
    if (!cur) throw new Error('Chưa đăng nhập');
    const u = db.users.find((x) => x.id === cur.id);
    if (u) {
      Object.assign(u, {
        name: data.name !== undefined ? data.name : u.name,
        bio: data.bio !== undefined ? data.bio : u.bio,
        avatar: data.avatar !== undefined ? data.avatar : u.avatar,
        avatarType: data.avatarType !== undefined ? data.avatarType : u.avatarType,
        title: data.title !== undefined ? data.title : u.title,
        github: data.github !== undefined ? data.github : u.github,
        linkedin: data.linkedin !== undefined ? data.linkedin : u.linkedin,
        skills: data.skills !== undefined ? data.skills : u.skills,
        language: data.language || u.language,
        arenaElo: data.arenaElo !== undefined ? data.arenaElo : (u.arenaElo || 1200),
        arenaWins: data.arenaWins !== undefined ? data.arenaWins : (u.arenaWins || 0),
      });
      save(db);
      return wait(strip(u));
    }
    return wait(null);
  },
};

/* ---------------- Chủ đề / bài học / bài tập ---------------- */
export const topicApi = {
  async list() {
    if (!USE_MOCK) return request('/topics');
    return wait(load().topics);
  },
  async get(id) {
    if (!USE_MOCK) return request(`/topics/${id}`);
    return wait(load().topics.find((t) => t.id === Number(id)));
  },
};

export const lessonApi = {
  async list(topicId) {
    if (!USE_MOCK) return request(`/lessons${topicId ? `?topicId=${topicId}` : ''}`);
    const db = load();
    const uid = currentUser()?.id;
    const completed = db.completedLessons || [];
    return wait(
      db.lessons
        .filter((l) => !topicId || l.topicId === Number(topicId))
        .map((l) => ({
          ...l,
          completed: completed.includes(l.id),
        }))
    );
  },
  async get(id) {
    if (!USE_MOCK) return request(`/lessons/${id}`);
    const db = load();
    const l = db.lessons.find((x) => x.id === Number(id));
    if (!l) return wait(null);
    const completed = (db.completedLessons || []).includes(l.id);
    return wait({ ...l, completed });
  },
  async markComplete(id) {
    const db = load();
    if (!db.completedLessons) db.completedLessons = [];
    const numId = Number(id);
    if (!db.completedLessons.includes(numId)) {
      db.completedLessons.push(numId);
      // Thêm điểm XP cho người dùng
      const cur = currentUser();
      if (cur) {
        const u = db.users.find((x) => x.id === cur.id);
        if (u) u.xp = (u.xp || 0) + 15;
      }
      save(db);
    }
    return wait({ success: true, completedLessons: db.completedLessons });
  },
  async create(data) {
    if (!USE_MOCK) return request('/lessons', { method: 'POST', body: data });
    const db = load();
    const item = { ...data, id: nextId(db.lessons), topicId: Number(data.topicId) };
    db.lessons.push(item);
    save(db);
    return wait(item);
  },
  async remove(id) {
    if (!USE_MOCK) return request(`/lessons/${id}`, { method: 'DELETE' });
    const db = load();
    db.lessons = db.lessons.filter((l) => l.id !== id);
    save(db);
    return wait({ ok: true });
  },
};

const withState = (db, ex) => {
  if (!ex) return null;
  const uid = currentUser()?.id;
  const p = (db.progress || []).find((x) => x.userId === uid && x.exerciseId === ex.id);
  const done = (db.submissions || []).some((s) => s.userId === uid && s.exerciseId === ex.id);
  const { solution, ...rest } = ex;
  return { ...rest, hintsUsed: p?.hintsUsed || 0, done };
};

export const exerciseApi = {
  async list(topicId) {
    if (!USE_MOCK) return request(`/exercises${topicId ? `?topicId=${topicId}` : ''}`);
    const db = load();
    return wait(db.exercises.filter((e) => !topicId || e.topicId === Number(topicId)).map((e) => withState(db, e)));
  },
  async get(id) {
    if (!USE_MOCK) return request(`/exercises/${id}`);
    const db = load();
    return wait(withState(db, db.exercises.find((e) => e.id === Number(id))));
  },
  async useHint(id) {
    if (!USE_MOCK) return request(`/exercises/${id}/hints`, { method: 'POST' });
    const db = load();
    const ex = db.exercises.find((e) => e.id === Number(id));
    const uid = currentUser()?.id;
    if (!db.progress) db.progress = [];
    let p = db.progress.find((x) => x.userId === uid && x.exerciseId === ex.id);
    if (!p) {
      p = { userId: uid, exerciseId: ex.id, hintsUsed: 0 };
      db.progress.push(p);
    }
    if (p.hintsUsed < ex.hints.length) p.hintsUsed += 1;
    save(db);
    return wait({ hintsUsed: p.hintsUsed, hints: ex.hints.slice(0, p.hintsUsed) });
  },
  async hints(id) {
    if (!USE_MOCK) return request(`/exercises/${id}/hints`);
    const db = load();
    const ex = db.exercises.find((e) => e.id === Number(id));
    if (!ex) return wait({ hintsUsed: 0, hints: [] });
    const p = (db.progress || []).find((x) => x.userId === currentUser()?.id && x.exerciseId === ex.id);
    return wait({ hintsUsed: p?.hintsUsed || 0, hints: ex.hints.slice(0, p?.hintsUsed || 0) });
  },
  async solution(id) {
    if (!USE_MOCK) return request(`/exercises/${id}/solution`);
    const db = load();
    const ex = db.exercises.find((e) => e.id === Number(id));
    if (!ex) throw new Error('Không tìm thấy bài tập');
    const p = (db.progress || []).find((x) => x.userId === currentUser()?.id && x.exerciseId === ex.id);
    if ((p?.hintsUsed || 0) < ex.hints.length) throw new Error('Hãy dùng hết các gợi ý trước khi xem lời giải');
    return wait({ solution: ex.solution });
  },
  async create(data) {
    if (!USE_MOCK) return request('/exercises', { method: 'POST', body: data });
    const db = load();
    const item = {
      ...data,
      id: nextId(db.exercises),
      topicId: Number(data.topicId),
      hints: typeof data.hints === 'string' ? data.hints.split('\n').filter(Boolean) : (data.hints || []),
      testCases: data.testCases || [],
      solution: data.solution || '',
    };
    db.exercises.push(item);
    save(db);
    return wait(item);
  },
  async remove(id) {
    if (!USE_MOCK) return request(`/exercises/${id}`, { method: 'DELETE' });
    const db = load();
    db.exercises = db.exercises.filter((e) => e.id !== id);
    save(db);
    return wait({ ok: true });
  },
};

/* ---------------- Trắc nghiệm (Quizzes) ---------------- */
export const quizApi = {
  async list(topicId) {
    const db = load();
    const qList = (db.quizzes || []).filter((q) => !topicId || q.topicId === Number(topicId));
    return wait(qList);
  },
};

/* ---------------- Sổ tay tra cứu (CheatSheet) ---------------- */
export const cheatsheetApi = {
  async list() {
    const db = load();
    return wait(db.cheatsheet || []);
  },
};

/* ---------------- Ghi chú cá nhân (Personal Notes) ---------------- */
export const noteApi = {
  async get(contextKey) {
    const db = load();
    const uid = currentUser()?.id;
    const key = `${uid}_${contextKey}`;
    return wait((db.notes && db.notes[key]) || '');
  },
  async save(contextKey, content) {
    const db = load();
    const uid = currentUser()?.id;
    if (!db.notes) db.notes = {};
    const key = `${uid}_${contextKey}`;
    db.notes[key] = content;
    save(db);
    return wait({ ok: true });
  },
};

/* ---------------- Thành tích & Huy hiệu (Achievements) ---------------- */
export const achievementApi = {
  async list() {
    const db = load();
    return wait(db.achievements || []);
  },
};

/* ---------------- Bảng xếp hạng (Leaderboard) ---------------- */
export const leaderboardApi = {
  async get() {
    const db = load();
    const students = (db.users || [])
      .filter((u) => u.role !== 'mentor')
      .map((u) => ({
        id: u.id,
        name: u.name,
        xp: u.xp || 150,
        streak: u.streak || 3,
        level: u.level || 'Lập trình viên Tập sự',
        submissionsCount: (db.submissions || []).filter((s) => s.userId === u.id).length,
      }))
      .sort((a, b) => b.xp - a.xp);
    return wait(students);
  },
};

/* ---------------- Nộp bài & nhận xét ---------------- */
export const submissionApi = {
  async list({ all = false } = {}) {
    if (!USE_MOCK) return request(`/submissions${all ? '?all=1' : ''}`);
    const db = load();
    const uid = currentUser()?.id;
    return wait(
      (db.submissions || [])
        .filter((s) => all || s.userId === uid)
        .map((s) => ({
          ...s,
          exerciseTitle: db.exercises.find((e) => e.id === s.exerciseId)?.title,
          studentName: db.users.find((u) => u.id === s.userId)?.name,
        }))
        .reverse()
    );
  },
  async create({ exerciseId, code }) {
    if (!USE_MOCK) return request('/submissions', { method: 'POST', body: { exerciseId, code } });
    const db = load();
    const cur = currentUser();
    const s = {
      id: nextId(db.submissions),
      userId: cur?.id,
      exerciseId: Number(exerciseId),
      code,
      status: 'submitted',
      feedback: '',
      score: null,
      createdAt: new Date().toISOString(),
    };
    db.submissions.push(s);

    // Cộng XP khi nộp bài
    if (cur) {
      const u = db.users.find((x) => x.id === cur.id);
      if (u) {
        u.xp = (u.xp || 0) + 30;
      }
    }
    save(db);
    return wait(s);
  },
  async review(id, { feedback, score }) {
    if (!USE_MOCK) return request(`/submissions/${id}/review`, { method: 'PUT', body: { feedback, score } });
    const db = load();
    const s = db.submissions.find((x) => x.id === id);
    if (s) {
      Object.assign(s, { feedback, score: score === '' ? null : Number(score), status: 'reviewed' });
      save(db);
    }
    return wait(s);
  },
};

/* ---------------- Chatbot (AI API qua backend hoặc mock) ---------------- */
export const chatApi = {
  async history(contextKey) {
    if (!USE_MOCK) return request(`/chat/history${contextKey ? `?contextKey=${encodeURIComponent(contextKey)}` : ''}`);
    const uid = currentUser()?.id;
    return wait((load().chats || []).filter((c) => c.userId === uid && (!contextKey || c.contextKey === contextKey)));
  },
  async send({ contextKey, contextLabel, message, mode, code, errorText }) {
    if (!USE_MOCK) {
      return request('/chat', { method: 'POST', body: { contextKey, contextLabel, message, mode, code, errorText } });
    }
    const db = load();
    const uid = currentUser()?.id;
    const now = () => new Date().toISOString();
    const userMsg = {
      id: nextId(db.chats),
      userId: uid,
      contextKey,
      contextLabel,
      role: 'user',
      content: message,
      createdAt: now(),
    };
    if (!db.chats) db.chats = [];
    db.chats.push(userMsg);

    const reply = {
      id: nextId(db.chats),
      userId: uid,
      contextKey,
      contextLabel,
      role: 'assistant',
      content: fakeAi({ message, code, errorText, mode }),
      createdAt: now(),
    };
    db.chats.push(reply);
    save(db);
    return wait(reply);
  },
  async all() {
    if (!USE_MOCK) return request('/chat/history');
    const uid = currentUser()?.id;
    return wait((load().chats || []).filter((c) => c.userId === uid));
  },
};

/* ---------------- Thống kê ---------------- */
export const statsApi = {
  async me() {
    if (!USE_MOCK) return request('/stats/me');
    const db = load();
    const cur = currentUser();
    const uid = cur?.id;
    const userRecord = db.users.find((u) => u.id === uid) || cur || {};
    const mine = (db.submissions || []).filter((s) => s.userId === uid);
    const doneIds = new Set(mine.map((s) => s.exerciseId));
    const completedLessonsCount = (db.completedLessons || []).length;

    return wait({
      user: {
        name: userRecord.name,
        xp: userRecord.xp || 280,
        streak: userRecord.streak || 5,
        level: userRecord.level || 'Lập trình viên Bạc',
      },
      totalExercises: db.exercises.length,
      completed: doneIds.size,
      totalLessons: db.lessons.length,
      completedLessons: completedLessonsCount,
      submissions: mine.length,
      reviewed: mine.filter((s) => s.status === 'reviewed').length,
      chats: (db.chats || []).filter((c) => c.userId === uid && c.role === 'user').length,
      byTopic: db.topics.map((t) => {
        const ex = db.exercises.filter((e) => e.topicId === t.id);
        const ls = db.lessons.filter((l) => l.topicId === t.id);
        return {
          topicId: t.id,
          name: t.name,
          icon: t.icon,
          total: ex.length,
          done: ex.filter((e) => doneIds.has(e.id)).length,
          lessonsTotal: ls.length,
          lessonsDone: ls.filter((l) => (db.completedLessons || []).includes(l.id)).length,
        };
      }),
    });
  },
};
