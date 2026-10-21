# CodeLearn - Nền tảng Học Lập Trình Tương Tác & Trợ Lý AI

Website học lập trình Python hiện đại với trình chạy mã trực tiếp trong trình duyệt, hệ thống chấm test cases tự động, bài học tương tác, trắc nghiệm củng cố, lộ trình trực quan và chatbot AI trợ giảng.

**Stack:** React 18 + Vite · Monaco Editor · Skulpt (In-browser Python 3 Runtime) · Node.js/Express · MySQL · AI API

---

## 🚀 Khởi chạy dự án (VS Code / PowerShell)

```powershell
cd code-learning-frontend
npm install
copy .env.example .env
npm run dev
```

Mở trình duyệt tại **http://localhost:5173**. 
- Mặc định `VITE_USE_MOCK=true` nên chạy được đầy đủ tính năng ngay lập tức không cần backend.
- Tài khoản thử nghiệm:
  - **Học viên**: `student@demo.com` / `123456`
  - **Người hướng dẫn (Mentor)**: `mentor@demo.com` / `123456`

---

## 🌟 Các tính năng học tập nổi bật

### 1. 🖥️ Trình thực thi Python trực tiếp trong trình duyệt (In-Browser Runner)
- Tích hợp động cơ **Skulpt** cho phép biên dịch và chạy mã Python 3 trực tiếp phía client mà không cần máy chủ backend.
- Hỗ trợ đầy đủ `print()`, `input()`, các cấu trúc rẽ nhánh, vòng lặp, xử lý chuỗi, List Comprehension, Dictionary, Hàm và Lớp (OOP).
- Console Terminal mô phỏng chuyên nghiệp với kết quả đầu ra (stdout), phân tích lỗi (stderr) và đo thời gian thực thi (ms).

### 2. 🧪 Chấm tự động bộ Test Cases (Automated Test Runner)
- Mỗi bài tập đi kèm nhiều test case với Input, Expected Output và mô tả thực tế.
- Tự động so sánh kết quả in ra của học viên với kết quả mong đợi, hiển thị chi tiết trạng thái **ĐẠT (Passed)** hoặc **CHƯA ĐẠT (Failed)**.
- Học viên có thể kiểm tra test cases trước khi nộp bài cho Mentor.

### 3. 📚 Giáo trình 8 chủ đề toàn diện & bài học tương tác
1. **Biến, Kiểu dữ liệu & Toán tử**: Cú pháp cơ bản, biến số, ép kiểu, toán tử số học, logic.
2. **Cấu trúc Rẽ nhánh**: `if - elif - else`, thụt lề chuẩn PEP 8, toán tử 3 ngôi (Ternary).
3. **Vòng lặp & Luồng điều khiển**: `for` với `range()`, `while`, `break`, `continue`.
4. **Chuỗi ký tự & Text Processing**: Cắt chuỗi (Slicing `[::-1]`), định dạng `f-string`, các phương thức chuỗi.
5. **Danh sách (List) & Tuple**: Thêm, xóa, sắp xếp, List Comprehension 1 dòng mã, tính bất biến của Tuple.
6. **Từ điển (Dictionary) & Tập hợp (Set)**: Cặp Key-Value, truy xuất an toàn với `get()`, phép toán tập hợp.
7. **Hàm & Lập trình mô-đun**: Khái niệm `def`, tham số mặc định, *args, Scope và hàm ẩn danh `lambda`.
8. **Lập trình Hướng đối tượng (OOP) & Ngoại lệ**: Class, Object, `__init__`, kế thừa và xử lý lỗi với `try - except`.

Mỗi bài học đều có **Ví dụ tương tác có thể chỉnh sửa và bấm "Chạy thử ví dụ"** ngay trong bài đọc, cùng tính năng **"Đánh dấu đã học" (+15 XP)** và **Sổ tay ghi chú cá nhân**.

### 4. 💻 Sân chơi Code tự do (Playground)
- Môi trường viết mã tự do không bị giới hạn trong bài tập.
- Có sẵn 5 mẫu mã chuẩn (Hello World, Fibonacci, Thống kê List Comprehension, Đếm tần suất từ, Lớp SinhVien OOP).
- Hỗ trợ nhập dữ liệu đầu vào tiêu chuẩn (Standard Input) và tải mã về máy tính định dạng `.py`.

### 5. 🧠 Trắc nghiệm củng cố kiến thức (Quizzes)
- Ngân hàng câu hỏi trắc nghiệm theo từng chủ đề.
- Phản hồi đúng/sai tức thì và hiển thị thẻ **"Giải thích chi tiết"** tại sao đáp án đó đúng.
- Theo dõi tỷ lệ phần trăm và điểm số.

### 6. 🗺️ Lộ trình học tập trực quan (Roadmap)
- 8 chặng từ Nhập môn đến Cơ bản, Trung cấp và Nâng cao.
- Hiển thị tỷ lệ hoàn thành từng chặng, danh sách kỹ năng đạt được và nút chuyển nhanh đến bài học.

### 7. 📖 Sổ tay Tra cứu Nhanh Cú pháp (CheatSheet)
- Tra cứu nhanh các cú pháp, phương thức thông dụng nhất của Python.
- Bộ lọc tìm kiếm trực tiếp (live search) theo từ khóa (`f-string`, `list`, `split`, `def`...).
- Nút sao chép mã ví dụ 1 chạm.

### 8. 🏆 Hệ thống Gamification (Điểm XP, Chuỗi Streak, Cấp bậc & Leaderboard)
- Học viên tích lũy điểm XP qua các hoạt động: Đọc bài (+15 XP), Nộp bài tập (+30 XP), Làm trắc nghiệm (+20 XP).
- Chuỗi ngày học liên tục (🔥 Streak) tạo động lực học tập mỗi ngày.
- Bục vinh danh Top 3 (Hạng 1 🥇, Hạng 2 🥈, Hạng 3 🥉) và bảng xếp hạng tuần đầy đủ.
- Bộ sưu tập 5 huy hiệu thành tích có thể mở khóa.

### 9. 🤖 Trợ lý AI Chatbot thông minh
- Tích hợp cạnh trình soạn thảo mã nguồn.
- Nút tắt nhanh: "Giải thích mã nguồn của tôi", "Phân tích thông báo lỗi", "Gợi ý tư duy giải bài".
- Phân tích chi tiết các loại lỗi thường gặp: `IndentationError`, `SyntaxError`, `NameError`, `TypeError`, `ZeroDivisionError`...

---

## 📁 Cấu trúc thư mục

```
src/
  api/
    client.js           # Client fetch HTTP API
    services.js         # API services (auth, topics, lessons, exercises, quizzes, cheatsheet, leaderboard)
    mockDb.js           # Cơ sở dữ liệu mẫu toàn diện 8 chủ đề, 13 bài học, 14 bài tập, trắc nghiệm
  context/
    AuthContext.jsx     # Context lưu trạng thái đăng nhập và hồ sơ
  components/
    CodeEditor.jsx      # Trình soạn thảo Monaco với toolbar, font sizing, theme sáng/tối, copy mã
    ChatbotPanel.jsx    # Giao diện chatbot AI với phím tắt nhanh
    Layout.jsx          # Sidebar điều hướng hiện đại, phân loại nhóm chức năng
    ProgressBar.jsx     # Thanh tiến độ phần trăm
    ProtectedRoute.jsx  # Bảo vệ các route yêu cầu đăng nhập và phân quyền mentor
  pages/
    Dashboard.jsx       # Trang tổng quan với Hero banner, XP, Streak, tiến độ chủ đề
    Topics.jsx          # Danh sách chủ đề với bộ lọc tìm kiếm và độ khó
    LessonDetail.jsx    # Chi tiết bài học kèm ví dụ tương tác có thể chạy mã trực tiếp
    ExerciseWorkspace.jsx # Không gian làm bài tập: Monaco editor, chạy thử, chấm test cases, gợi ý
    Playground.jsx      # Sân chơi viết code tự do với stdin và tải file .py
    Quizzes.jsx         # Trắc nghiệm ôn tập theo chủ đề kèm giải thích chi tiết
    Roadmap.jsx         # Lộ trình học 8 chặng trực quan
    CheatSheet.jsx      # Sổ tay tra cứu cú pháp nhanh với ô tìm kiếm
    Leaderboard.jsx     # Bảng vinh danh Top 3 và bộ sưu tập huy hiệu
    Submissions.jsx     # Quản lý danh sách bài tập đã nộp và điểm số
    ChatHistory.jsx     # Lịch sử hội thoại với chatbot
    Profile.jsx         # Hồ sơ cá nhân, chỉ số học tập và khôi phục dữ liệu mẫu
    Mentor.jsx          # Giao diện chấm bài và nhận xét dành cho người hướng dẫn
    Manage.jsx          # Quản lý thêm/xóa bài học và bài tập
  utils/
    pythonRunner.js     # Động cơ chạy Python 3 trong trình duyệt bằng Skulpt & chấm test case
  index.css             # Hệ thống thiết kế hiện đại, typography Plus Jakarta Sans, Fira Code
```
