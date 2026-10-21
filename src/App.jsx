import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Topics from './pages/Topics';
import LessonDetail from './pages/LessonDetail';
import ExerciseWorkspace from './pages/ExerciseWorkspace';
import Playground from './pages/Playground';
import Quizzes from './pages/Quizzes';
import Roadmap from './pages/Roadmap';
import CheatSheet from './pages/CheatSheet';
import Leaderboard from './pages/Leaderboard';
import Submissions from './pages/Submissions';
import ChatHistory from './pages/ChatHistory';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Arena from './pages/Arena';
import Mentor from './pages/Mentor';
import Manage from './pages/Manage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="topics" element={<Topics />} />
        <Route path="lessons/:id" element={<LessonDetail />} />
        <Route path="exercises/:id" element={<ExerciseWorkspace />} />
        <Route path="playground" element={<Playground />} />
        <Route path="arena" element={<Arena />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="cheatsheet" element={<CheatSheet />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="submissions" element={<Submissions />} />
        <Route path="chat-history" element={<ChatHistory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="mentor" element={<ProtectedRoute roles={['mentor']}><Mentor /></ProtectedRoute>} />
        <Route path="manage" element={<ProtectedRoute roles={['mentor']}><Manage /></ProtectedRoute>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
