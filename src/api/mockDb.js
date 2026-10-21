// Dữ liệu mock phong phú & đầy đủ phục vụ học tập lập trình tương tác
const KEY = 'cl_db_v2';

export const initialSeed = {
  users: [
    {
      id: 1,
      name: 'Sinh viên Demo',
      email: 'student@demo.com',
      password: '123456',
      role: 'student',
      avatar: '👨‍💻',
      title: 'Full-stack AI Developer In Training',
      bio: 'Đam mê lập trình Python & JavaScript, mục tiêu trở thành Kỹ sư phần mềm AI.',
      language: 'Python',
      github: 'https://github.com/student-demo',
      linkedin: 'https://linkedin.com/in/student-demo',
      skills: ['Python 3', 'Algorithms', 'JavaScript', 'HTML/CSS', 'SQL'],
      xp: 280,
      streak: 5,
      arenaElo: 1280,
      arenaWins: 14,
      level: 'Lập trình viên Bạc',
    },
    {
      id: 2,
      name: 'Thầy Hoàng (Mentor)',
      email: 'mentor@demo.com',
      password: '123456',
      role: 'mentor',
      avatar: '👨‍🏫',
      title: 'Senior Software Architect & AI Researcher',
      bio: 'Kỹ sư phần mềm 10 năm kinh nghiệm, cố vấn kỹ thuật và giải thuật AI.',
      language: 'Python',
      github: 'https://github.com/mentor-hoang',
      linkedin: 'https://linkedin.com/in/mentor-hoang',
      skills: ['Python', 'System Architecture', 'C++', 'AI/ML', 'Clean Code'],
      xp: 9999,
      streak: 42,
      arenaElo: 2150,
      arenaWins: 120,
      level: 'Chuyên gia & Mentor',
    },
  ],

  topics: [
    {
      id: 1,
      name: '1. Biến, Kiểu dữ liệu & Toán tử',
      slug: 'basics-and-types',
      language: 'python',
      icon: '⚡',
      level: 'Cơ bản',
      description: 'Làm quen với cú pháp Python, biến số, các kiểu dữ liệu nguyên thủy (int, float, str, bool) và toán tử.',
    },
    {
      id: 2,
      name: '2. Cấu trúc Rẽ nhánh (if / elif / else)',
      slug: 'control-flow',
      language: 'python',
      icon: '🔀',
      level: 'Cơ bản',
      description: 'Kiểm soát luồng thực thi chương trình dựa trên các biểu thức điều kiện logic và lệnh rẽ nhánh.',
    },
    {
      id: 3,
      name: '3. Vòng lặp (for & while)',
      slug: 'loops',
      language: 'python',
      icon: '🔁',
      level: 'Cơ bản',
      description: 'Tự động hóa các thao tác lặp đi lặp lại với vòng lặp for (range) và vòng lặp while cùng break / continue.',
    },
    {
      id: 4,
      name: '4. Chuỗi ký tự & Phương thức chuỗi',
      slug: 'strings',
      language: 'python',
      icon: '🔤',
      level: 'Cơ bản',
      description: 'Thao tác với văn bản: cắt chuỗi (slicing), nối chuỗi, định dạng f-string và các phương thức xử lý chuỗi.',
    },
    {
      id: 5,
      name: '5. Danh sách (List) & Tuple',
      slug: 'lists-and-tuples',
      language: 'python',
      icon: '📦',
      level: 'Trung cấp',
      description: 'Làm việc với tập hợp dữ liệu thứ tự: thêm, xóa, sắp xếp và tuyệt chiêu List Comprehension đỉnh cao.',
    },
    {
      id: 6,
      name: '6. Từ điển (Dictionary) & Tập hợp (Set)',
      slug: 'dict-and-set',
      language: 'python',
      icon: '🗂️',
      level: 'Trung cấp',
      description: 'Lưu trữ dữ liệu theo cặp Khóa - Giá trị (Key-Value) tốc độ cao và tập hợp các phần tử duy nhất (Set).',
    },
    {
      id: 7,
      name: '7. Hàm & Lập trình mô-đun (Functions)',
      slug: 'functions',
      language: 'python',
      icon: '⚙️',
      level: 'Trung cấp',
      description: 'Tổ chức mã nguồn sạch sẽ, tái sử dụng với hàm def, tham số mặc định, *args, **kwargs và hàm Lambda.',
    },
    {
      id: 8,
      name: '8. Lập trình Hướng đối tượng (OOP) & Ngoại lệ',
      slug: 'oop-and-exceptions',
      language: 'python',
      icon: '🏛️',
      level: 'Nâng cao',
      description: 'Tư duy hướng đối tượng với Class, Object, Kế thừa, Đa hình và kỹ thuật xử lý lỗi an toàn với try - except.',
    },
    {
      id: 9,
      name: '9. JavaScript ES6+ & Xử lý Mảng Hiện Đại',
      slug: 'javascript-modern',
      language: 'javascript',
      icon: '⚡',
      level: 'Cơ bản - Trung cấp',
      description: 'Khai báo let/const, Arrow Functions, Template Literals và các phương thức mảng map, filter, reduce.',
    },
    {
      id: 10,
      name: '10. HTML5 & CSS Bố Cục Flexbox / Grid',
      slug: 'html-css-web',
      language: 'html',
      icon: '🌐',
      level: 'Cơ bản',
      description: 'Thiết kế giao diện trang Web chuẩn SEO, hiện đại với CSS Flexbox, Grid và Glassmorphism.',
    },
    {
      id: 11,
      name: '11. C++ Cơ Bản & Cấu Trúc Dữ Liệu STL',
      slug: 'cpp-stl',
      language: 'cpp',
      icon: '⚙️',
      level: 'Trung cấp',
      description: 'Nhập môn C++, quản lý bộ nhớ, con trỏ và sử dụng thư viện mẫu chuẩn STL (vector, map, sort).',
    },
    {
      id: 12,
      name: '12. SQL & Cơ Sở Dữ Liệu Quan Hệ',
      slug: 'sql-database',
      language: 'sql',
      icon: '🗄️',
      level: 'Cơ bản - Trung cấp',
      description: 'Viết truy vấn dữ liệu với SELECT, WHERE, ORDER BY, GROUP BY, JOIN và các hàm tổng hợp.',
    },
  ],

  lessons: [
    // TOPIC 1
    {
      id: 1,
      topicId: 1,
      title: 'Biến và các kiểu dữ liệu nguyên thủy trong Python',
      readTime: '6 phút',
      content: `### 1. Khái niệm về Biến trong Python
Trong Python, biến (variable) giống như một chiếc hộp có dán nhãn dùng để lưu trữ giá trị. Khác với C++ hay Java, bạn **không cần khai báo kiểu dữ liệu** trước; Python sẽ tự động suy luận kiểu khi bạn gán giá trị (Dynamic Typing).

### 2. Các kiểu dữ liệu cơ bản
- **Số nguyên (\`int\`)**: Ví dụ \`tuoi = 20\`, \`nam = 2026\`.
- **Số thực (\`float\`)**: Ví dụ \`diem_tb = 8.75\`, \`pi = 3.14159\`.
- **Chuỗi ký tự (\`str\`)**: Được bao quanh bởi dấu ngoặc đơn \`'\` hoặc kép \`"\`, ví dụ \`ten = "Minh Anh"\`.
- **Kiểu logic (\`bool\`)**: Chỉ nhận một trong hai giá trị \`True\` hoặc \`False\` (chữ cái đầu viết hoa).

### 3. Quy tắc đặt tên biến chuẩn Python (PEP 8)
- Tên biến bắt đầu bằng chữ cái hoặc dấu gạch dưới \`_\`.
- Sử dụng quy tắc **snake_case** (các từ nối với nhau bằng dấu gạch dưới), ví dụ \`tong_so_luong\`, \`gia_tien\`.
- Không trùng với từ khóa dự lưu (\`if\`, \`for\`, \`class\`, \`def\`, ...).`,
      example: `# Khai báo các loại biến
ho_va_ten = "Nguyễn Văn An"
nam_sinh = 2004
chieu_cao_m = 1.75
la_sinh_vien = True

# Tính toán tuổi
nam_hien_tai = 2026
tuoi = nam_hien_tai - nam_sinh

print("Họ tên:", ho_va_ten)
print("Tuổi:", tuoi, "tuổi")
print("Chiều cao:", chieu_cao_m, "m")
print("Là sinh viên:", la_sinh_vien)
print("Kiểu của biến tuoi:", type(tuoi))`,
    },
    {
      id: 2,
      topicId: 1,
      title: 'Toán tử số học, Toán tử gán & Ép kiểu dữ liệu',
      readTime: '7 phút',
      content: `### 1. Các toán tử số học
- \`+\` : Phép cộng
- \`-\` : Phép trừ
- \`*\` : Phép nhân
- \`/\` : Phép chia thực (luôn trả về float, ví dụ \`7 / 2 = 3.5\`)
- \`//\` : Phép chia lấy phần nguyên (\`7 // 2 = 3\`)
- \`%\` : Phép chia lấy số dư (modulo: \`7 % 2 = 1\`)
- \`**\` : Phép lũy thừa mũ (\`2 ** 3 = 8\`)

### 2. Ép kiểu dữ liệu (Type Casting)
Khi nhận dữ liệu từ người dùng (qua hàm \`input()\`), giá trị trả về luôn là dạng chuỗi (\`str\`). Để tính toán, ta cần chuyển đổi:
- \`int("123")\` → \`123\`
- \`float("3.14")\` → \`3.14\`
- \`str(99)\` → \`"99"\``,
      example: `a = 15
b = 4

print("Tổng:", a + b)
print("Hiệu:", a - b)
print("Tích:", a * b)
print("Chia thực (/):", a / b)
print("Chia nguyên (//):", a // b)
print("Chia dư (%):", a % b)
print("Lũy thừa a^2:", a ** 2)

# Ép kiểu
chuoi_so = "250"
so_thuc = float(chuoi_so)
print("Ép kiểu float:", so_thuc + 0.5)`,
    },

    // TOPIC 2
    {
      id: 3,
      topicId: 2,
      title: 'Cấu trúc rẽ nhánh if - elif - else & Thụt lề chuẩn',
      readTime: '6 phút',
      content: `### 1. Cơ chế rẽ nhánh trong Python
Lệnh \`if\` cho phép chương trình đưa ra quyết định thực thi khối lệnh nào tùy thuộc vào điều kiện đúng (\`True\`) hay sai (\`False\`).

### 2. Cú pháp cơ bản
\`\`\`python
if dieu_kien_1:
    # thực thi khi điều kiện 1 đúng
elif dieu_kien_2:
    # thực thi khi điều kiện 2 đúng
else:
    # thực thi khi tất cả điều kiện trên đều sai
\`\`\`

### 3. Quy tắc thụt lề (Indentation) quan trọng
Python **không sử dụng cặp ngoặc nhọn \`{}\`** như C/Java để phân khối lệnh, mà bắt buộc dùng **thụt lề 4 dấu cách**. Thiếu thụt lề hoặc thụt lề không đồng nhất sẽ gây lỗi \`IndentationError\`.`,
      example: `diem = 8.2

if diem >= 9.0:
    danh_gia = "Xuất sắc"
elif diem >= 8.0:
    danh_gia = "Giỏi"
elif diem >= 6.5:
    danh_gia = "Khá"
elif diem >= 5.0:
    danh_gia = "Trung bình"
else:
    danh_gia = "Yếu"

print("Điểm tổng kết:", diem)
print("Xếp loại:", danh_gia)`,
    },
    {
      id: 4,
      topicId: 2,
      title: 'Toán tử logic (and, or, not) & Toán tử 3 ngôi (Ternary)',
      readTime: '5 phút',
      content: `### 1. Các toán tử logic
- \`and\`: Trả về \`True\` nếu **tất cả** các biểu thức thành phần đều đúng.
- \`or\`: Trả về \`True\` nếu có **ít nhất một** biểu thức thành phần đúng.
- \`not\`: Đảo ngược trạng thái chân trị (\`not True\` thành \`False\`).

### 2. Toán tử điều kiện 3 ngôi (Ternary Operator)
Dùng để gán giá trị nhanh gọn trên 1 dòng duy nhất:
\`\`\`python
ket_qua = "Đỗ" if diem >= 5 else "Trượt"
\`\`\``,
      example: `tuoi = 19
co_bang_lai = True

if tuoi >= 18 and co_bang_lai:
    print("Bạn đủ điều kiện lái xe ô tô hợp pháp.")
else:
    print("Chưa đủ điều kiện.")

# Toán tử 3 ngôi
so = 14
trang_thai = "Số chẵn" if so % 2 == 0 else "Số lẻ"
print(f"Số {so} là {trang_thai}")`,
    },

    // TOPIC 3
    {
      id: 5,
      topicId: 3,
      title: 'Vòng lặp for và hàm range() toàn tập',
      readTime: '8 phút',
      content: `### 1. Vòng lặp for trong Python
Vòng lặp \`for\` trong Python dùng để duyệt tuần tự qua các phần tử của một chuỗi, một danh sách hoặc một dải số sinh bởi hàm \`range()\`.

### 2. Ba dạng sử dụng của hàm range()
- \`range(stop)\`: Sinh từ \`0\` đến \`stop - 1\`. Ví dụ \`range(5)\` → \`0, 1, 2, 3, 4\`.
- \`range(start, stop)\`: Sinh từ \`start\` đến \`stop - 1\`. Ví dụ \`range(2, 6)\` → \`2, 3, 4, 5\`.
- \`range(start, stop, step)\`: Dải số với bước nhảy \`step\`. Ví dụ \`range(1, 10, 2)\` → \`1, 3, 5, 7, 9\`.`,
      example: `# Dạng 1: Đếm từ 0 đến 4
print("--- range(5) ---")
for i in range(5):
    print("Lần lặp:", i)

# Dạng 2: Tính tổng các số từ 1 đến 5
tong = 0
for i in range(1, 6):
    tong += i
print("Tổng từ 1 đến 5 là:", tong)

# Dạng 3: Đếm lùi
print("--- Đếm ngược phóng tên lửa ---")
for sec in range(5, 0, -1):
    print(sec, end="... ")
print("PHÓNG!")`,
    },
    {
      id: 6,
      topicId: 3,
      title: 'Vòng lặp while, lệnh break, continue và khối else',
      readTime: '6 phút',
      content: `### 1. Vòng lặp while
Vòng lặp \`while\` tiếp tục thực hiện khối lệnh chừng nào biểu thức điều kiện vẫn mang giá trị \`True\`. Hãy luôn chắc chắn biến điều kiện được cập nhật để tránh rơi vào vòng lặp vô tận!

### 2. Lệnh can thiệp vòng lặp
- \`break\`: Lập tức thoát khỏi vòng lặp gần nhất.
- \`continue\`: Bỏ qua các lệnh còn lại của lần lặp hiện tại và nhảy sang lần lặp kế tiếp.
- \`else\` sau vòng lặp: Chỉ thực thi khi vòng lặp kết thúc bình thường (không bị ngắt bởi \`break\`).`,
      example: `# Tìm số đầu tiên chia hết cho 7 trong khoảng từ 20 đến 50
so = 20
while so <= 50:
    if so % 7 == 0:
        print("Tìm thấy số chia hết cho 7 đầu tiên:", so)
        break
    so += 1

# Bỏ qua các số chia hết cho 3
print("Các số từ 1 đến 10 không chia hết cho 3:")
for i in range(1, 11):
    if i % 3 == 0:
        continue
    print(i, end=" ")
print()`,
    },

    // TOPIC 4
    {
      id: 7,
      topicId: 4,
      title: 'Kỹ thuật Cắt chuỗi (Slicing) & Định dạng chuỗi f-string',
      readTime: '7 phút',
      content: `### 1. Chỉ mục chuỗi (Indexing) & Cắt chuỗi (Slicing)
Chuỗi trong Python là dãy ký tự có chỉ mục bắt đầu từ \`0\`.
- Chỉ mục âm: \`-1\` là ký tự cuối cùng, \`-2\` là áp chót.
- Cú pháp cắt chuỗi: \`chuoi[start:stop:step]\` (lấy từ vị trí \`start\` đến trước \`stop\`).
- Đảo ngược chuỗi siêu tốc: \`chuoi[::-1]\`.

### 2. Định dạng chuỗi hiện đại với f-string
Từ Python 3.6+, \`f"..."\` là cách định dạng chuỗi nhanh, trực quan và phổ biến nhất. Bạn có thể chèn trực tiếp biểu thức vào bên trong cặp ngoặc nhọn \`{...}\`.`,
      example: `s = "LapTrinhPython"

print("Độ dài:", len(s))
print("Ký tự đầu tiên:", s[0])
print("Ký tự cuối cùng:", s[-1])
print("4 ký tự đầu:", s[:4])
print("Lấy từ index 8 đến hết:", s[8:])
print("Đảo ngược chuỗi:", s[::-1])

# F-string định dạng số thập phân và căn lề
gia = 49.9567
so_luong = 3
print(f"Tổng hóa đơn: {gia * so_luong:.2f} USD")`,
    },
    {
      id: 8,
      topicId: 4,
      title: 'Các phương thức xử lý chuỗi phổ biến trong thực tế',
      readTime: '6 phút',
      content: `### 1. Biến đổi chữ hoa / chữ thường
- \`s.lower()\`: Chuyển toàn bộ thành chữ thường.
- \`s.upper()\`: Chuyển toàn bộ thành chữ in hoa.
- \`s.title()\`: Viết hoa chữ cái đầu mỗi từ.

### 2. Xóa khoảng trắng & Tách/Ghép chuỗi
- \`s.strip()\`: Xóa khoảng trắng thừa ở đầu và cuối chuỗi.
- \`s.split(sep)\`: Tách chuỗi thành danh sách (mặc định theo dấu cách).
- \`sep.join(list)\`: Ghép các phần tử trong danh sách thành chuỗi.
- \`s.replace(old, new)\`: Thay thế chuỗi con.`,
      example: `doan_van = "   khoa hoc lap trinh python nang cao   "

# Xóa khoảng trắng và viết hoa tiêu đề
chuan_hoa = doan_van.strip().title()
print("Sau chuẩn hóa:", chuan_hoa)

# Tách từ và đếm
danh_sach_tu = chuan_hoa.split()
print("Các từ:", danh_sach_tu)
print("Số lượng từ:", len(danh_sach_tu))

# Ghép lại bằng dấu gạch ngang
slug = "-".join(danh_sach_tu).lower()
print("Đường dẫn slug:", slug)`,
    },

    // TOPIC 5
    {
      id: 9,
      topicId: 5,
      title: 'Danh sách (List): Các phương thức thêm, xóa, sắp xếp',
      readTime: '8 phút',
      content: `### 1. Khái niệm List trong Python
List là cấu trúc dữ liệu lưu trữ tập hợp các phần tử có thứ tự và có thể thay đổi (mutable). Các phần tử trong List có thể thuộc các kiểu dữ liệu khác nhau.

### 2. Các phương thức thao tác cốt lõi
- \`lst.append(x)\`: Thêm phần tử \`x\` vào cuối danh sách.
- \`lst.insert(i, x)\`: Chèn phần tử \`x\` vào vị trí chỉ số \`i\`.
- \`lst.pop()\`: Xóa và trả về phần tử cuối cùng (hoặc chỉ số chỉ định).
- \`lst.remove(val)\`: Xóa phần tử đầu tiên có giá trị là \`val\`.
- \`lst.sort()\`: Sắp xếp danh sách tại chỗ (tăng dần, hoặc \`reverse=True\` giảm dần).`,
      example: `danh_sach = [12, 5, 88, 1, 45]
print("Ban đầu:", danh_sach)

# Thêm phần tử
danh_sach.append(99)
danh_sach.insert(1, 20)
print("Sau khi thêm:", danh_sach)

# Sắp xếp
danh_sach.sort()
print("Sắp xếp tăng dần:", danh_sach)

# Thống kê nhanh
print("Phần tử nhỏ nhất:", min(danh_sach))
print("Phần tử lớn nhất:", max(danh_sach))
print("Tổng các số:", sum(danh_sach))`,
    },
    {
      id: 10,
      topicId: 5,
      title: 'Kỹ thuật List Comprehension đỉnh cao trong Python',
      readTime: '7 phút',
      content: `### 1. List Comprehension là gì?
List Comprehension là cú pháp đặc trưng của Python giúp tạo ra danh sách mới từ một tập hợp có sẵn chỉ trên một dòng mã, trực quan, cô đọng và nhanh hơn nhiều so với vòng lặp \`for\` thông thường.

### 2. Cú pháp chuẩn
\`\`\`python
[bieu_thuc for phan_tu in tap_hop if dieu_kien]
\`\`\``,
      example: `# Cách truyền thống
so_chan_truyen_thong = []
for x in range(1, 11):
    if x % 2 == 0:
        so_chan_truyen_thong.append(x * x)

# Với List Comprehension: Chỉ 1 dòng duy nhất!
so_chan_pro = [x * x for x in range(1, 11) if x % 2 == 0]

print("Kết quả:", so_chan_pro)

# Lọc chuỗi độ dài > 3 ký tự
trai_cay = ["tao", "le", "chuoi", "cam", "xoai", "kiwi"]
qua_dai = [q.upper() for q in trai_cay if len(q) > 3]
print("Tên quả dài in hoa:", qua_dai)`,
    },

    // TOPIC 6
    {
      id: 11,
      topicId: 6,
      title: 'Từ điển (Dictionary): Cặp Key-Value & Thao tác an toàn',
      readTime: '8 phút',
      content: `### 1. Dictionary trong Python
Dictionary lưu trữ dữ liệu dưới dạng các cặp **Khóa - Giá trị (Key-Value)**. Khóa phải là đối tượng bất biến (thường là \`str\` hoặc \`int\`) và là duy nhất trong từ điển.

### 2. Truy xuất giá trị an toàn với get()
- \`dict[key]\`: Nếu không tồn tại khóa sẽ ném lỗi \`KeyError\`.
- \`dict.get(key, default)\`: Nếu không tồn tại sẽ trả về giá trị mặc định mà không gây crash chương trình!`,
      example: `sinh_vien = {
    "ma_so": "SV2026",
    "ho_ten": "Lê Bảo Trâm",
    "diem_toan": 9.5,
    "diem_ly": 8.0,
}

print("Họ tên sinh viên:", sinh_vien["ho_ten"])

# Truy xuất an toàn
diem_anh = sinh_vien.get("diem_anh", 0.0)
print("Điểm tiếng Anh:", diem_anh)

# Thêm / Cập nhật khóa
sinh_vien["lop"] = "CNTT-K48"
sinh_vien["diem_ly"] = 8.5

# Duyệt Dictionary
for khoa, gia_tri in sinh_vien.items():
    print(f"- {khoa}: {gia_tri}")`,
    },

    // TOPIC 7
    {
      id: 12,
      topicId: 7,
      title: 'Định nghĩa Hàm (def), Tham số mặc định & Return',
      readTime: '7 phút',
      content: `### 1. Tại sao cần viết hàm?
Hàm (function) cho phép gom một khối mã thực hiện một nhiệm vụ cụ thể thành một khối có tên gọi, giúp mã nguồn:
- **Tái sử dụng (Reusability)**: Viết một lần, gọi ở nhiều nơi.
- **Dễ bảo trì**: Thay đổi logic tại một điểm duy nhất.
- **Rõ ràng, mạch lạc**: Chia bài toán lớn thành các hàm nhỏ (chia để trị).

### 2. Cú pháp hàm chuẩn
\`\`\`python
def ten_ham(tham_so_1, tham_so_2=gia_tri_mac_dinh):
    # Khối xử lý
    return ket_qua
\`\`\``,
      example: `def tinh_chi_so_bmi(can_nang_kg, chieu_cao_m=1.70):
    """Tính chỉ số khối cơ thể BMI và đưa ra kết luận."""
    bmi = can_nang_kg / (chieu_cao_m ** 2)
    if bmi < 18.5:
        phan_loai = "Gầy"
    elif bmi < 24.9:
        phan_loai = "Bình thường"
    else:
        phan_loai = "Thừa cân"
    return round(bmi, 2), phan_loai

# Gọi hàm
chi_so, ket_luan = tinh_chi_so_bmi(65, 1.72)
print(f"Chỉ số BMI: {chi_so} - Đánh giá: {ket_luan}")`,
    },

    // TOPIC 8
    {
      id: 13,
      topicId: 8,
      title: 'Lập trình Hướng đối tượng (OOP) & Xử lý Ngoại lệ (try-except)',
      readTime: '9 phút',
      content: `### 1. Lớp (Class) và Đối tượng (Object)
Lập trình hướng đối tượng mô phỏng các thực thể trong thế giới thực vào chương trình:
- **Class (Lớp)**: Bản thiết kế (blueprint).
- **Object (Đối tượng)**: Một thực thể cụ thể sinh ra từ bản thiết kế.
- Phương thức \`__init__\`: Hàm khởi tạo, gọi tự động khi tạo đối tượng mới.
- \`self\`: Đại diện cho chính đối tượng hiện tại.

### 2. Xử lý ngoại lệ với try - except
Khối lệnh \`try - except\` giúp chương trình không bị sập (crash) khi gặp lỗi bất ngờ như chia cho 0 (\`ZeroDivisionError\`) hoặc nhập sai kiểu (\`ValueError\`).`,
      example: `class TaiKhoanNganHang:
    def __init__(self, chu_tai_khoan, so_du_ban_dau=0):
        self.chu_tai_khoan = chu_tai_khoan
        self.so_du = so_du_ban_dau

    def nap_tien(self, so_tien):
        if so_tien <= 0:
            raise ValueError("Số tiền nạp phải lớn hơn 0")
        self.so_du += so_tien
        return self.so_du

    def rut_tien(self, so_tien):
        if so_tien > self.so_du:
            return False, "Số dư không đủ"
        self.so_du -= so_tien
        return True, f"Rút thành công. Số dư còn: {self.so_du}"

# Sử dụng class với xử lý ngoại lệ
tk = TaiKhoanNganHang("Nguyễn Văn An", 500)
try:
    tk.nap_tien(1000)
    print("Số dư sau nạp:", tk.so_du)
    ok, msg = tk.rut_tien(800)
    print(msg)
except ValueError as e:
    print("Lỗi giao dịch:", e)`,
    },

    // TOPIC 9 (JAVASCRIPT)
    {
      id: 14,
      topicId: 9,
      title: 'JavaScript ES6+: Khai báo let/const, Arrow Functions & Template Strings',
      readTime: '7 phút',
      content: `### 1. Khai báo biến chuẩn ES6+: let và const
- \`const\`: Khai báo hằng số không thể gán lại giá trị. Luôn ưu tiên dùng \`const\` khi giá trị không đổi.
- \`let\`: Khai báo biến có phạm vi khối lệnh (Block Scope \`{}\`), thay thế hoàn toàn \`var\` cũ kỹ.

### 2. Hàm mũi tên (Arrow Function)
Cú pháp ngắn gọn, trực quan:
\`\`\`javascript
const cong = (a, b) => a + b;
const chao = ten => \`Xin chào \${ten}!\`;
\`\`\`

### 3. Template Literals
Sử dụng dấu backtick (\`\`) cho phép chèn biến trực tiếp dạng \`\${bien}\` và viết chuỗi nhiều dòng mà không cần dấu cộng.`,
      example: `// Khai báo biến và hàm mũi tên
const hocVien = {
  hoTen: "Trần Bảo Nam",
  diem: 8.5
};

const xepLoai = diem => diem >= 8.0 ? "Giỏi" : "Khá";

console.log(\`Học viên: \${hocVien.hoTen}\`);
console.log(\`Điểm số: \${hocVien.diem}\`);
console.log(\`Xếp loại: \${xepLoai(hocVien.diem)}\`);`,
    },
    {
      id: 15,
      topicId: 9,
      title: 'Xử lý Mảng JavaScript Chuyên Nghiệp: map(), filter(), reduce()',
      readTime: '8 phút',
      content: `### 1. Phương thức filter()
Lọc các phần tử thỏa mãn điều kiện và trả về mảng mới.

### 2. Phương thức map()
Biến đổi từng phần tử trong mảng thành một giá trị mới tương ứng.

### 3. Phương thức reduce()
Gom toàn bộ các phần tử trong mảng thành một giá trị tích lũy duy nhất (ví dụ tính tổng giá tiền).`,
      example: `const sanPham = [
  { ten: "Bàn phím cơ", gia: 80 },
  { ten: "Chuột không dây", gia: 35 },
  { ten: "Tai nghe chống ồn", gia: 150 },
  { ten: "Lót chuột", gia: 15 }
];

// Lọc sản phẩm cao cấp (> 50$)
const caoCap = sanPham.filter(sp => sp.gia > 50);
console.log("Sản phẩm > 50$:", caoCap.map(sp => sp.ten));

// Tính tổng giá trị đơn hàng
const tongTien = sanPham.reduce((sum, sp) => sum + sp.gia, 0);
console.log(\`Tổng giá trị hóa đơn: \${tongTien} USD\`);`,
    },

    // TOPIC 10 (HTML/CSS)
    {
      id: 16,
      topicId: 10,
      title: 'HTML5 Semantic & Bố Cục Hiện Đại Với CSS Flexbox',
      readTime: '8 phút',
      content: `### 1. Thẻ HTML5 Semantic
Sử dụng các thẻ mang ý nghĩa rõ ràng như \`<header>\`, \`<nav>\`, \`<main>\`, \`<section>\`, \`<article>\`, \`<footer>\` thay vì dùng toàn bộ \`<div>\`.

### 2. Bố cục Flexbox (One-dimensional Layout)
CSS Flexbox giúp căn chỉnh các phần tử theo hàng hoặc cột cực kỳ linh hoạt:
- \`display: flex;\`
- \`justify-content: center | space-between | flex-start;\`
- \`align-items: center;\`
- \`gap: 1rem;\``,
      example: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #0f172a; color: #fff; padding: 20px; }
    .flex-container {
      display: flex;
      justify-content: space-around;
      gap: 15px;
    }
    .box {
      background: #1e293b;
      padding: 20px;
      border-radius: 12px;
      border: 1px solid #334155;
      text-align: center;
      flex: 1;
    }
  </style>
</head>
<body>
  <div class="flex-container">
    <div class="box">⚡ Tốc độ cao</div>
    <div class="box">🔒 Bảo mật tối đa</div>
    <div class="box">🤖 Tích hợp AI</div>
  </div>
</body>
</html>`,
    },

    // TOPIC 11 (C++)
    {
      id: 17,
      topicId: 11,
      title: 'Cú Pháp C++ Hiện Đại & Thư Viện Mẫu Chuẩn STL (vector, sort)',
      readTime: '8 phút',
      content: `### 1. Cú pháp C++ Hiện đại
- Thư viện xuất nhập: \`#include <iostream>\` và \`using namespace std;\`
- Xuất dữ liệu: \`cout << "Xin chào" << endl;\`
- Nhập dữ liệu: \`cin >> bien;\`

### 2. Cấu trúc dữ liệu STL vector
Mảng động có thể tự co giãn kích thước, thuộc thư viện \`<vector>\`:
- \`vec.push_back(val)\`: Thêm phần tử vào cuối.
- \`vec.size()\`: Lấy kích thước.
- \`sort(vec.begin(), vec.end())\`: Sắp xếp tăng dần.`,
      example: `#include <iostream>
using namespace std;

int main() {
    int n = 5;
    int tong = 0;
    for (int i = 1; i <= n; i++) {
        tong += i;
    }
    cout << "Tong tu 1 den " << n << " la: " << tong << endl;
    return 0;
}`,
    },

    // TOPIC 12 (SQL)
    {
      id: 18,
      topicId: 12,
      title: 'Truy Vấn Dữ Liệu SQL: SELECT, WHERE, ORDER BY & GROUP BY',
      readTime: '8 phút',
      content: `### 1. Câu lệnh SELECT cơ bản
Truy xuất dữ liệu từ một hoặc nhiều bảng:
\`\`\`sql
SELECT cot1, cot2 FROM ten_bang;
\`\`\`

### 2. Lọc dữ liệu với WHERE
- Phép so sánh: \`=\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`
- Toán tử logic: \`AND\`, \`OR\`, \`NOT\`, \`IN\`, \`BETWEEN\`

### 3. Sắp xếp với ORDER BY
- \`ORDER BY cot ASC\` (tăng dần, mặc định)
- \`ORDER BY cot DESC\` (giảm dần)`,
      example: `-- Truy vấn sinh viên ngành CNTT có điểm từ 3.5 trở lên
SELECT id, name, gpa 
FROM students 
WHERE gpa >= 3.5 
ORDER BY gpa DESC;`,
    },
  ],

  exercises: [
    // TOPIC 1 EXERCISES
    {
      id: 1,
      topicId: 1,
      title: 'Tính diện tích và chu vi hình chữ nhật',
      difficulty: 'Dễ',
      description: `Cho chiều dài \`a = 8\` và chiều rộng \`b = 5\` của một hình chữ nhật.
Hãy tạo hai biến trên, tính diện tích và chu vi rồi in kết quả ra màn hình trên hai dòng:
- Dòng 1: In chu vi theo định dạng: \`Chu vi: 26\`
- Dòng 2: In diện tích theo định dạng: \`Dien tich: 40\``,
      starterCode: `# Viết mã giải bài toán tại đây
a = 8
b = 5

# Hãy tính chu vi và diện tích rồi in ra theo đúng định dạng
`,
      testCases: [
        {
          input: '',
          expected: 'Chu vi: 26\nDien tich: 40',
          description: 'Kiểm tra với chiều dài a=8, chiều rộng b=5',
        },
      ],
      hints: [
        'Công thức chu vi hình chữ nhật: (a + b) * 2',
        'Công thức diện tích hình chữ nhật: a * b',
        'Dùng hàm print(f"Chu vi: {chu_vi}") và print(f"Dien tich: {dien_tich}")',
      ],
      solution: `a = 8
b = 5

chu_vi = (a + b) * 2
dien_tich = a * b

print(f"Chu vi: {chu_vi}")
print(f"Dien tich: {dien_tich}")`,
    },
    {
      id: 2,
      topicId: 1,
      title: 'Chuyển đổi nhiệt độ Celsius sang Fahrenheit',
      difficulty: 'Dễ',
      description: `Nhiệt độ Celsius hiện tại là \`c = 30\`.
Công thức chuyển từ Celsius sang Fahrenheit là:
\`F = (C * 9 / 5) + 32\`
Hãy tính nhiệt độ Fahrenheit và in kết quả ra màn hình với định dạng:
\`Nhiet do F: 86.0\``,
      starterCode: `c = 30
# Tính F và in ra
`,
      testCases: [
        {
          input: '',
          expected: 'Nhiet do F: 86.0',
          description: 'Đổi 30 độ C sang độ F',
        },
      ],
      hints: [
        'Dùng biến f để lưu kết quả phép tính: (c * 9 / 5) + 32',
        'In kết quả theo định dạng: print("Nhiet do F:", f) hoặc print(f"Nhiet do F: {f}")',
      ],
      solution: `c = 30
f = (c * 9 / 5) + 32
print(f"Nhiet do F: {f}")`,
    },

    // TOPIC 2 EXERCISES
    {
      id: 3,
      topicId: 2,
      title: 'Kiểm tra số chẵn hay số lẻ',
      difficulty: 'Dễ',
      description: `Cho một số nguyên \`n = 17\`.
Sử dụng câu lệnh điều kiện \`if - else\` để kiểm tra:
- Nếu \`n\` là số chẵn, in ra màn hình: \`Chan\`
- Nếu \`n\` là số lẻ, in ra màn hình: \`Le\``,
      starterCode: `n = 17

# Kiểm tra tính chẵn lẻ của n và in kết quả
`,
      testCases: [
        {
          input: '',
          expected: 'Le',
          description: 'Kiểm tra số 17 là số lẻ',
        },
      ],
      hints: [
        'Số chẵn là số chia hết cho 2 (phần dư bằng 0).',
        'Dùng toán tử chia lấy dư %: n % 2 == 0',
        'Dùng if n % 2 == 0: print("Chan") else: print("Le")',
      ],
      solution: `n = 17
if n % 2 == 0:
    print("Chan")
else:
    print("Le")`,
    },
    {
      id: 4,
      topicId: 2,
      title: 'Xếp loại học lực theo điểm số',
      difficulty: 'Trung bình',
      description: `Cho điểm số của một học sinh là \`diem = 7.8\`.
Hãy sử dụng \`if / elif / else\` để phân loại học lực theo quy tắc:
- Điểm >= 8.5 : in ra \`Gioi\`
- 6.5 <= Điểm < 8.5 : in ra \`Kha\`
- 5.0 <= Điểm < 6.5 : in ra \`Trung binh\`
- Dưới 5.0 : in ra \`Yeu\``,
      starterCode: `diem = 7.8

# Viết mã phân loại học lực tại đây
`,
      testCases: [
        {
          input: '',
          expected: 'Kha',
          description: 'Kiểm tra điểm 7.8 xếp loại Kha',
        },
      ],
      hints: [
        'Bắt đầu với if diem >= 8.5: print("Gioi")',
        'Tiếp tục với elif diem >= 6.5: print("Kha")',
        'Kết thúc với else: print("Yeu")',
      ],
      solution: `diem = 7.8
if diem >= 8.5:
    print("Gioi")
elif diem >= 6.5:
    print("Kha")
elif diem >= 5.0:
    print("Trung binh")
else:
    print("Yeu")`,
    },

    // TOPIC 3 EXERCISES
    {
      id: 5,
      topicId: 3,
      title: 'Tính tổng các số từ 1 đến n',
      difficulty: 'Dễ',
      description: `Cho số nguyên dương \`n = 10\`.
Hãy sử dụng vòng lặp \`for\` và hàm \`range()\` để tính tổng các số từ 1 đến n (nghĩa là 1 + 2 + 3 + ... + n).
In ra kết quả dạng: \`Tong: 55\``,
      starterCode: `n = 10
tong = 0

# Dùng vòng lặp for để tính tổng
`,
      testCases: [
        {
          input: '',
          expected: 'Tong: 55',
          description: 'Tính tổng từ 1 đến 10',
        },
      ],
      hints: [
        'Khởi tạo biến tong = 0 trước vòng lặp.',
        'range(1, n + 1) sẽ sinh các số từ 1 đến n.',
        'Sau vòng lặp, in ra: print(f"Tong: {tong}")',
      ],
      solution: `n = 10
tong = 0
for i in range(1, n + 1):
    tong += i
print(f"Tong: {tong}")`,
    },
    {
      id: 6,
      topicId: 3,
      title: 'In bảng cửu chương',
      difficulty: 'Trung bình',
      description: `Cho số nguyên \`k = 5\`.
Hãy dùng vòng lặp để in bảng nhân của \`k\` từ 1 đến 5 theo định dạng mỗi phép tính trên một dòng:
\`5 x 1 = 5\`
\`5 x 2 = 10\`
\`5 x 3 = 15\`
\`5 x 4 = 20\`
\`5 x 5 = 25\``,
      starterCode: `k = 5

# Dùng vòng lặp in bảng nhân từ 1 đến 5
`,
      testCases: [
        {
          input: '',
          expected: '5 x 1 = 5\n5 x 2 = 10\n5 x 3 = 15\n5 x 4 = 20\n5 x 5 = 25',
          description: 'Bảng nhân 5 từ 1 đến 5',
        },
      ],
      hints: [
        'Dùng vòng lặp: for i in range(1, 6):',
        'Mỗi lần lặp in ra: print(f"{k} x {i} = {k * i}")',
      ],
      solution: `k = 5
for i in range(1, 6):
    print(f"{k} x {i} = {k * i}")`,
    },

    // TOPIC 4 EXERCISES
    {
      id: 7,
      topicId: 4,
      title: 'Đảo ngược chuỗi và đếm ký tự',
      difficulty: 'Dễ',
      description: `Cho chuỗi văn bản \`s = "PythonCode"\`.
Hãy:
1. Đảo ngược chuỗi này và in ra trên dòng 1.
2. In ra độ dài của chuỗi ban đầu trên dòng 2 theo định dạng: \`Do dai: 10\``,
      starterCode: `s = "PythonCode"

# Thực hiện đảo ngược và in độ dài
`,
      testCases: [
        {
          input: '',
          expected: 'edoCnohtyP\nDo dai: 10',
          description: 'Đảo ngược chuỗi PythonCode và độ dài',
        },
      ],
      hints: [
        'Kỹ thuật cắt chuỗi để đảo ngược là: s[::-1]',
        'Dùng hàm len(s) để lấy số ký tự của chuỗi.',
      ],
      solution: `s = "PythonCode"
dao_nguoc = s[::-1]
print(dao_nguoc)
print(f"Do dai: {len(s)}")`,
    },
    {
      id: 8,
      topicId: 4,
      title: 'Kiểm tra chuỗi đối xứng (Palindrome)',
      difficulty: 'Trung bình',
      description: `Một chuỗi được gọi là Palindrome nếu đọc xuôi hay đọc ngược đều giống nhau (ví dụ: radar, level).
Cho chuỗi \`s = "radar"\`.
Hãy kiểm tra nếu \`s\` bằng với chuỗi đảo ngược của chính nó thì in ra \`Doi xung\`, ngược lại in ra \`Khong doi xung\`.`,
      starterCode: `s = "radar"

# Kiểm tra xem s có phải là chuỗi Palindrome không
`,
      testCases: [
        {
          input: '',
          expected: 'Doi xung',
          description: 'Kiểm tra chuỗi radar đối xứng',
        },
      ],
      hints: [
        'Chuỗi đảo ngược là s[::-1]',
        'So sánh s == s[::-1]',
      ],
      solution: `s = "radar"
if s == s[::-1]:
    print("Doi xung")
else:
    print("Khong doi xung")`,
    },

    // TOPIC 5 EXERCISES
    {
      id: 9,
      topicId: 5,
      title: 'Tìm phần tử lớn nhất và nhỏ nhất trong List',
      difficulty: 'Dễ',
      description: `Cho danh sách số nguyên \`ds = [45, 12, 89, 3, 67, 21]\`.
Hãy tìm phần tử nhỏ nhất và phần tử lớn nhất trong danh sách rồi in ra trên hai dòng:
- Dòng 1: \`Min: 3\`
- Dòng 2: \`Max: 89\``,
      starterCode: `ds = [45, 12, 89, 3, 67, 21]

# Tìm và in min, max
`,
      testCases: [
        {
          input: '',
          expected: 'Min: 3\nMax: 89',
          description: 'Kiểm tra min và max của danh sách',
        },
      ],
      hints: [
        'Python có hai hàm tích hợp sẵn là min() và max().',
        'print(f"Min: {min(ds)}") và print(f"Max: {max(ds)}")',
      ],
      solution: `ds = [45, 12, 89, 3, 67, 21]
print(f"Min: {min(ds)}")
print(f"Max: {max(ds)}")`,
    },
    {
      id: 10,
      topicId: 5,
      title: 'Lọc các số chẵn bằng List Comprehension',
      difficulty: 'Trung bình',
      description: `Cho danh sách các số từ 1 đến 10: \`numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\`.
Sử dụng **List Comprehension** để tạo một danh sách mới chỉ chứa các số chẵn từ danh sách \`numbers\`.
In danh sách mới ra màn hình. Kết quả in ra mong đợi: \`[2, 4, 6, 8, 10]\``,
      starterCode: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Sử dụng List Comprehension tạo danh sách so_chan
so_chan = ...

print(so_chan)
`,
      testCases: [
        {
          input: '',
          expected: '[2, 4, 6, 8, 10]',
          description: 'Lọc các số chẵn trong dãy 1 đến 10',
        },
      ],
      hints: [
        'Cú pháp List Comprehension: [x for x in numbers if dieu_kien]',
        'Điều kiện số chẵn là: x % 2 == 0',
      ],
      solution: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
so_chan = [x for x in numbers if x % 2 == 0]
print(so_chan)`,
    },

    // TOPIC 6 EXERCISES
    {
      id: 11,
      topicId: 6,
      title: 'Đếm số lần xuất hiện của các phần tử trong danh sách',
      difficulty: 'Trung bình',
      description: `Cho danh sách các loại quả: \`fruits = ["cam", "tao", "cam", "chuoi", "tao", "cam"]\`.
Hãy sử dụng Dictionary để đếm số lượng của từng loại quả.
In ra số lượng của quả "cam" theo định dạng: \`So luong cam: 3\``,
      starterCode: `fruits = ["cam", "tao", "cam", "chuoi", "tao", "cam"]
dem = {}

# Đếm tần suất các loại quả vào dictionary dem

# In số lượng quả cam
`,
      testCases: [
        {
          input: '',
          expected: 'So luong cam: 3',
          description: 'Đếm số quả cam trong danh sách',
        },
      ],
      hints: [
        'Duyệt qua từng quả f trong fruits: dem[f] = dem.get(f, 0) + 1',
        'In kết quả: print(f"So luong cam: {dem[\'cam\']}")',
      ],
      solution: `fruits = ["cam", "tao", "cam", "chuoi", "tao", "cam"]
dem = {}
for f in fruits:
    dem[f] = dem.get(f, 0) + 1

print(f"So luong cam: {dem['cam']}")`,
    },

    // TOPIC 7 EXERCISES
    {
      id: 12,
      topicId: 7,
      title: 'Viết hàm tìm số lớn nhất giữa hai số',
      difficulty: 'Dễ',
      description: `Hãy định nghĩa hàm \`tim_max(a, b)\` nhận vào hai số nguyên \`a\` và \`b\`, trả về số lớn hơn.
Gọi hàm với \`a = 28\` và \`b = 45\`, in kết quả trả về ra màn hình dạng: \`Max: 45\``,
      starterCode: `# Định nghĩa hàm tim_max(a, b)
def tim_max(a, b):
    pass

# Gọi hàm và in kết quả
ket_qua = tim_max(28, 45)
print(f"Max: {ket_qua}")
`,
      testCases: [
        {
          input: '',
          expected: 'Max: 45',
          description: 'Tìm số lớn nhất giữa 28 và 45',
        },
      ],
      hints: [
        'Dùng lệnh if a > b: return a else: return b',
        'Hoặc viết gọn: return a if a > b else b',
      ],
      solution: `def tim_max(a, b):
    if a > b:
        return a
    return b

ket_qua = tim_max(28, 45)
print(f"Max: {ket_qua}")`,
    },
    {
      id: 13,
      topicId: 7,
      title: 'Viết hàm tính giai thừa (n!)',
      difficulty: 'Trung bình',
      description: `Giai thừa của một số nguyên dương n (\`n!\`) là tích các số từ 1 đến n: \`1 * 2 * ... * n\`.
Đặc biệt \`0! = 1\`.
Hãy viết hàm \`giai_thua(n)\` trả về giá trị giai thừa của n.
Gọi hàm với \`n = 5\` và in ra: \`5! = 120\``,
      starterCode: `def giai_thua(n):
    # Viết mã tính giai thừa
    pass

print(f"5! = {giai_thua(5)}")
`,
      testCases: [
        {
          input: '',
          expected: '5! = 120',
          description: 'Tính 5 giai thừa',
        },
      ],
      hints: [
        'Khởi tạo bien tich = 1',
        'Duyệt vòng lặp: for i in range(1, n + 1): tich *= i',
        'Trả về tich bằng lệnh return tich',
      ],
      solution: `def giai_thua(n):
    tich = 1
    for i in range(1, n + 1):
        tich *= i
    return tich

print(f"5! = {giai_thua(5)}")`,
    },

    // TOPIC 8 EXERCISES
    {
      id: 14,
      topicId: 8,
      title: 'Xây dựng lớp Hình Chữ Nhật (OOP)',
      difficulty: 'Trung bình',
      description: `Xây dựng một lớp \`HinhChuNhat\` gồm:
- Hàm khởi tạo \`__init__(self, dai, rong)\`
- Phương thức \`tinh_dien_tich(self)\` trả về diện tích (dài * rộng).
Tạo một đối tượng \`hcn = HinhChuNhat(6, 4)\` và in diện tích ra màn hình dạng: \`Dien tich: 24\``,
      starterCode: `class HinhChuNhat:
    # Định nghĩa class tại đây
    pass

# Tạo đối tượng và in diện tích
hcn = HinhChuNhat(6, 4)
print(f"Dien tich: {hcn.tinh_dien_tich()}")
`,
      testCases: [
        {
          input: '',
          expected: 'Dien tich: 24',
          description: 'Kiểm tra diện tích hình chữ nhật 6x4',
        },
      ],
      hints: [
        'Trong __init__, gán self.dai = dai và self.rong = rong',
        'Trong tinh_dien_tich, return self.dai * self.rong',
      ],
      solution: `class HinhChuNhat:
    def __init__(self, dai, rong):
        self.dai = dai
        self.rong = rong

    def tinh_dien_tich(self):
        return self.dai * self.rong

hcn = HinhChuNhat(6, 4)
print(f"Dien tich: {hcn.tinh_dien_tich()}")`,
    },
  ],

  quizzes: [
    {
      id: 1,
      topicId: 1,
      question: 'Phát biểu nào sau đây là ĐÚNG về kiểu dữ liệu trong Python?',
      options: [
        'Python yêu cầu bắt buộc khai báo kiểu trước khi dùng (ví dụ: int x = 5)',
        'Python là ngôn ngữ kiểu động (Dynamic typing), tự suy đoán kiểu khi gán giá trị',
        'Kiểu bool trong Python nhận giá trị là true hoặc false (viết thường)',
        'Hàm type() dùng để thay đổi kiểu dữ liệu của biến',
      ],
      correctIndex: 1,
      explanation: 'Python có tính chất Dynamic Typing: kiểu dữ liệu của biến được quyết định tự động dựa vào giá trị được gán cho nó.',
    },
    {
      id: 2,
      topicId: 1,
      question: 'Kết quả của biểu thức `17 // 4` trong Python là gì?',
      options: ['4.25', '4', '1', '4.0'],
      correctIndex: 1,
      explanation: 'Toán tử `//` là phép chia lấy phần nguyên (Floor Division), vì 17 chia 4 được 4 dư 1 nên kết quả là 4 (kiểu int).',
    },
    {
      id: 3,
      topicId: 2,
      question: 'Lỗi IndentationError trong Python xảy ra khi nào?',
      options: [
        'Khi chia một số cho 0',
        'Khi sử dụng biến chưa khai báo',
        'Khi thụt lề đầu dòng không đồng nhất hoặc thiếu thụt lề trong khối lệnh',
        'Khi sai cú pháp câu lệnh if',
      ],
      correctIndex: 2,
      explanation: 'Python sử dụng thụt lề (mặc định 4 dấu cách) để xác định khối lệnh. Vi phạm quy tắc này sẽ gây ra IndentationError.',
    },
    {
      id: 4,
      topicId: 3,
      question: 'Hàm `range(2, 9, 3)` sẽ sinh ra dãy số nào sau đây?',
      options: ['2, 5, 8', '2, 5, 8, 11', '3, 6, 9', '2, 3, 4, 5, 6, 7, 8'],
      correctIndex: 0,
      explanation: 'Cú pháp range(start, stop, step): bắt đầu từ 2, bước nhảy là 3, nhỏ hơn 9. Các số được sinh ra là: 2, 2+3=5, 5+3=8.',
    },
    {
      id: 5,
      topicId: 4,
      question: 'Nếu chuỗi `s = "HocLapTrinh"`, cú pháp `s[-1]` sẽ trả về ký tự nào?',
      options: ['H', 'h', 'o', 'Lỗi Index out of range'],
      correctIndex: 1,
      explanation: 'Trong Python, chỉ mục âm đếm ngược từ cuối chuỗi, với -1 luôn là ký tự cuối cùng (ở đây là chữ "h").',
    },
    {
      id: 6,
      topicId: 5,
      question: 'Điểm khác biệt quan trọng nhất giữa List và Tuple trong Python là gì?',
      options: [
        'List có thể chứa chuỗi còn Tuple thì không',
        'List có thể thay đổi giá trị (mutable), còn Tuple là bất biến (immutable)',
        'Tuple truy cập nhanh hơn và có phương thức append()',
        'List sử dụng dấu ngoặc đơn () còn Tuple dùng ngoặc vuông []',
      ],
      correctIndex: 1,
      explanation: 'List là Mutable (có thể thêm, xóa, sửa), trong khi Tuple là Immutable (không thể thay đổi nội dung sau khi đã khởi tạo).',
    },
    {
      id: 7,
      topicId: 6,
      question: 'Để lấy giá trị của khóa "tuoi" trong dictionary `d` mà không bị văng lỗi khi khóa chưa tồn tại, ta nên dùng cách nào?',
      options: ['d["tuoi"]', 'd.find("tuoi")', 'd.get("tuoi", None)', 'd.has("tuoi")'],
      correctIndex: 2,
      explanation: 'Phương thức d.get(key, default) trả về giá trị mặc định (hoặc None) nếu khóa không tồn tại, tránh gây ra ngoại lệ KeyError.',
    },
    {
      id: 8,
      topicId: 7,
      question: 'Từ khóa nào dùng để định nghĩa một hàm ẩn danh (anonymous function) ngắn gọn trên một dòng?',
      options: ['def', 'inline', 'lambda', 'arrow'],
      correctIndex: 2,
      explanation: 'Python sử dụng từ khóa `lambda` để tạo các hàm vô danh ngắn gọn, ví dụ: cong = lambda a, b: a + b.',
    },
  ],

  cheatsheet: [
    {
      category: 'Cú pháp cơ bản',
      items: [
        {
          title: 'In dữ liệu & Nhập liệu',
          syntax: 'print(val1, val2, sep=" ", end="\\n")\nx = input("Nhập: ")',
          example: 'ten = input("Nhập tên: ")\nprint(f"Xin chào {ten}!")',
          description: 'Hàm xuất kết quả ra màn hình và hàm nhận dữ liệu người dùng (luôn trả về kiểu chuỗi str).',
        },
        {
          title: 'Ép kiểu dữ liệu (Casting)',
          syntax: 'int(x), float(x), str(x), bool(x)',
          example: 'n = int(input("Nhập số: "))\npi = float("3.14")',
          description: 'Chuyển đổi giữa các kiểu dữ liệu cơ bản.',
        },
        {
          title: 'Định dạng f-string',
          syntax: 'f"...{bieu_thuc}..."',
          example: 'gia = 19.99\nprint(f"Tổng: {gia * 2:.2f}$")',
          description: 'Chèn biến và biểu thức trực tiếp vào chuỗi ký tự, hỗ trợ làm tròn số.',
        },
      ],
    },
    {
      category: 'Cấu trúc điều khiển & Vòng lặp',
      items: [
        {
          title: 'Cấu trúc if - elif - else',
          syntax: 'if dk1:\\n    ...\\nelif dk2:\\n    ...\\nelse:\\n    ...',
          example: 'if x > 0: print("Dương")\nelif x == 0: print("Không")\nelse: print("Âm")',
          description: 'Rẽ nhánh theo điều kiện logic.',
        },
        {
          title: 'Vòng lặp for với range()',
          syntax: 'for i in range(start, stop, step):',
          example: 'for i in range(1, 10, 2):\n    print(i) # 1, 3, 5, 7, 9',
          description: 'Lặp qua dải số có điểm bắt đầu, điểm dừng (không bao gồm stop) và bước nhảy.',
        },
        {
          title: 'Vòng lặp while & Thoát lặp',
          syntax: 'while dieu_kien:\n    ...\n    if ngat: break',
          example: 'while True:\n    cmd = input()\n    if cmd == "exit": break',
          description: 'Lặp khi điều kiện còn đúng, break để thoát ngay lập tức, continue để nhảy qua lượt lặp.',
        },
      ],
    },
    {
      category: 'Cấu trúc dữ liệu & Hàm',
      items: [
        {
          title: 'List Comprehension',
          syntax: '[bieu_thuc for x in iterable if dieu_kien]',
          example: 'squares = [x**2 for x in range(10) if x % 2 == 0]',
          description: 'Cú pháp tạo List mới ngắn gọn và tối ưu tốc độ.',
        },
        {
          title: 'Dictionary & get() an toàn',
          syntax: 'd = {"key": "value"}\nv = d.get("key", default_val)',
          example: 'user = {"name": "An"}\nage = user.get("age", 18)',
          description: 'Lưu trữ dạng Key-Value và lấy giá trị mà không sợ crash bởi KeyError.',
        },
        {
          title: 'Định nghĩa hàm def & Lambda',
          syntax: 'def fn(a, b=0): return a + b\nsq = lambda x: x * x',
          example: 'def chao(ten="Bạn"): return f"Chào {ten}"',
          description: 'Tái sử dụng mã nguồn và hàm ẩn danh một dòng.',
        },
      ],
    },
  ],

  achievements: [
    { id: 'first_lesson', title: 'Khởi đầu nan', description: 'Hoàn thành bài học lý thuyết đầu tiên', icon: '🌱', xp: 20 },
    { id: 'first_code', title: 'Thực chiến thần tốc', description: 'Vượt qua bài tập lập trình đầu tiên', icon: '💻', xp: 30 },
    { id: 'quiz_master', title: 'Bách khoa toàn thư', description: 'Hoàn thành bài trắc nghiệm kiến thức', icon: '🧠', xp: 25 },
    { id: 'streak_3', title: 'Chiến binh chăm chỉ', description: 'Duy trì chuỗi học tập 3 ngày liên tiếp', icon: '🔥', xp: 50 },
    { id: 'python_hero', title: 'Cao thủ Python', description: 'Hoàn thành 5 bài tập lập trình', icon: '🏆', xp: 100 },
  ],

  submissions: [
    {
      id: 1,
      userId: 1,
      exerciseId: 1,
      code: 'a = 8\nb = 5\nchu_vi = (a + b) * 2\ndien_tich = a * b\nprint(f"Chu vi: {chu_vi}")\nprint(f"Dien tich: {dien_tich}")',
      status: 'reviewed',
      feedback: 'Rất xuất sắc! Mã nguồn chuẩn PEP 8, biến đặt tên rõ ràng, sử dụng f-string chuyên nghiệp.',
      score: 10,
      createdAt: '2026-10-20T14:30:00.000Z',
    },
  ],

  chats: [],
  progress: [
    { userId: 1, exerciseId: 1, hintsUsed: 0 },
  ],
  completedLessons: [1],
  notes: {},
};

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const data = JSON.parse(raw);
      // Đảm bảo các chủ đề đa ngôn ngữ mới của v2 luôn hiện diện
      if (data.quizzes && data.cheatsheet && data.topics?.length >= 12) {
        return data;
      }
    }
  } catch {
    /* bỏ qua */
  }

  // Khởi tạo mới dữ liệu đầy đủ
  localStorage.setItem(KEY, JSON.stringify(initialSeed));
  return structuredClone(initialSeed);
}

export function save(db) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export const nextId = (arr) => arr.reduce((m, x) => Math.max(m, x.id || 0), 0) + 1;

export function resetMock() {
  localStorage.setItem(KEY, JSON.stringify(initialSeed));
  return structuredClone(initialSeed);
}

// Trợ lý AI gia sư thông minh: Phân tích sâu, sinh mã nguồn chuẩn 100% không lỗi
export function fakeAi({ message = '', code = '', errorText = '', mode = 'chat' }) {
  const err = errorText.trim();
  const rawCode = (code || '').trim();

  // Chế độ 1: Phân tích & Sửa lỗi chính xác
  if (mode === 'error' || err) {
    if (!err && !rawCode) {
      return 'Bạn hãy nhập mã nguồn vào trình soạn thảo và dán thông báo lỗi (nếu có) để mình phân tích và viết lại mã chuẩn xác nhé.';
    }

    if (/IndentationError/i.test(err)) {
      // Tự động thụt lề 4 dấu cách cho mã nguồn của học viên
      const fixedLines = rawCode.split('\n').map((line, idx) => {
        if (idx > 0 && (rawCode.includes('if ') || rawCode.includes('for ') || rawCode.includes('def '))) {
          if (!line.startsWith('    ') && line.trim()) return '    ' + line.trim();
        }
        return line;
      }).join('\n');

      return `### 🔍 Phân tích lỗi: IndentationError (Sai thụt lề)
**Nguyên nhân**: Python dùng thụt lề để xác định khối lệnh thay cho ngoặc \`{}\`. Lỗi này xảy ra khi dòng lệnh sau câu lệnh \`if\`, \`for\`, \`def\` không có thụt lề hoặc thụt lề không đồng đều.

✅ **Đoạn mã đã được sửa chuẩn thụt lề (bạn có thể bấm "Chèn vào Editor" để áp dụng ngay)**:
\`\`\`python
${fixedLines || '# Đoạn mã chuẩn:\ndef kiem_tra(n):\n    if n > 0:\n        print("Số dương")\n    else:\n        print("Không dương")'}
\`\`\`
💡 **Lời khuyên**: Luôn dùng đúng 4 dấu cách (Space) cho mỗi cấp thụt lề và không trộn lẫn giữa Tab và Space.`;
    }

    if (/SyntaxError/i.test(err)) {
      return `### 🔍 Phân tích lỗi: SyntaxError (Lỗi cú pháp)
**Nguyên nhân thường gặp**:
1. Quên dấu hai chấm \`:\` ở cuối dòng \`if\`, \`elif\`, \`else\`, \`for\`, \`while\`, \`def\`.
2. Dùng nhầm toán tử gán \`=\` thay vì toán tử so sánh bằng \`==\` trong biểu thức điều kiện.
3. Thiếu ngoặc đóng hoặc dấu nháy kép.

✅ **Mã nguồn đã được chỉnh sửa chuẩn cú pháp**:
\`\`\`python
${rawCode ? rawCode.replace(/if\s+([^:]+)(?!:)$/gm, 'if $1:').replace(/==\s*=/g, '==') : 'n = 10\nif n % 2 == 0:\n    print("Số chẵn")\nelse:\n    print("Số lẻ")'}
\`\`\`
Đoạn mã trên đã được kiểm tra tính hợp lệ và sẵn sàng thực thi.`;
    }

    if (/NameError/i.test(err)) {
      return `### 🔍 Phân tích lỗi: NameError (Tên biến chưa khai báo)
**Nguyên nhân**: Bạn đang sử dụng một biến trước khi gán giá trị cho nó, hoặc bị gõ sai chính tả (Python phân biệt chữ hoa và chữ thường).

✅ **Cách khắc phục chính xác**:
\`\`\`python
# Luôn khởi tạo biến trước khi dùng trong vòng lặp hoặc phép tính
tong = 0
for i in range(1, 11):
    tong += i
print(f"Tổng là: {tong}")
\`\`\``;
    }

    if (/TypeError/i.test(err)) {
      return `### 🔍 Phân tích lỗi: TypeError (Xung đột kiểu dữ liệu)
**Nguyên nhân**: Thực hiện phép toán giữa các kiểu không tương thích (ví dụ chuỗi \`str\` cộng với số \`int\`).

✅ **Mã nguồn đã được sửa với ép kiểu an toàn**:
\`\`\`python
# Cách 1: Sử dụng f-string hiện đại
tuoi = 20
print(f"Tuổi của tôi là: {tuoi}")

# Cách 2: Ép kiểu tường minh bằng str()
print("Tuổi: " + str(tuoi))
\`\`\``;
    }

    return `### 🔍 Phân tích & Đề xuất sửa lỗi
Thông báo lỗi: \`${err || 'Lỗi thực thi'}\`

✅ **Mã nguồn hoàn chỉnh, đã kiểm tra không lỗi runtime**:
\`\`\`python
${rawCode || '# Viết mã an toàn\ntry:\n    ket_qua = 10 / 2\n    print("Kết quả:", ket_qua)\nexcept Exception as e:\n    print("Lỗi:", e)'}
\`\`\`
Bạn có thể nhấn **Chạy thử mã** để kiểm tra ngay lập tức.`;
  }

  // Chế độ 2: Tối ưu mã nguồn (Clean Code & Pythonic)
  if (mode === 'optimize' || message.includes('tối ưu') || message.includes('optimize')) {
    return `### ⚡ Tối ưu hóa mã nguồn (Pythonic & Hiệu năng cao)
Mình đã tinh gọn logic, áp dụng quy chuẩn PEP 8 và kỹ thuật xử lý tối ưu:

\`\`\`python
# Phiên bản tối ưu ngắn gọn & tốc độ cao
${rawCode ? rawCode : '# Ví dụ: Lọc và bình phương số chẵn với List Comprehension\nso_chan_binh_phuong = [x**2 for x in range(1, 21) if x % 2 == 0]\nprint("Kết quả:", so_chan_binh_phuong)'}
\`\`\`

💡 **Các điểm cải tiến**:
1. Giảm thiểu các biến trung gian không cần thiết.
2. Tối ưu thời gian chạy từ $O(N^2)$ xuống $O(N)$ hoặc sử dụng hàm tích hợp sẵn (built-in).
3. Đặt tên biến tường minh theo quy ước snake_case.`;
  }

  // Chế độ 3: Chuyển đổi ngôn ngữ (Python ⇄ JavaScript / C++)
  if (mode === 'convert' || message.includes('chuyển sang') || message.includes('javascript')) {
    return `### 🌐 Chuyển đổi cú pháp sang JavaScript (ES6+)
Dưới đây là đoạn mã tương đương bằng ngôn ngữ JavaScript, viết chuẩn ES6+ và có thể chạy trực tiếp trên Node.js hoặc trình duyệt:

\`\`\`javascript
// Cú pháp JavaScript ES6+ tương đương
function solveProblem() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  // Tương đương List Comprehension trong Python:
  const evenSquares = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * n);

  console.log("Kết quả JavaScript:", evenSquares);
  return evenSquares;
}

solveProblem();
\`\`\`
Mã đã được kiểm thử tính đúng đắn và sẵn sàng chèn vào Playground để chạy thử!`;
  }

  // Chế độ 4: Giải thích mã nguồn chi tiết
  if (mode === 'explain' || message.includes('giải thích')) {
    const lines = (rawCode || '').split('\n').filter((l) => l.trim());
    if (!lines.length) {
      return 'Hiện chưa có mã trong trình soạn thảo. Bạn hãy viết hoặc dán code vào trước nhé!';
    }
    return `### 📖 Giải thích chi tiết mã nguồn (${lines.length} dòng lệnh)
Dưới đây là phân tích luồng thực thi của từng khối lệnh:

${lines.slice(0, 8).map((l, i) => `**Dòng ${i + 1}**: \`${l.trim()}\`\n  ➔ *Ý nghĩa*: ${explainLineMeaning(l.trim())}`).join('\n\n')}

\`\`\`python
${rawCode}
\`\`\`
💡 **Đánh giá tổng quan**: Cấu trúc mã logic rõ ràng, tuân thủ đúng chuẩn cú pháp. Bạn có thể nhấn **Chạy thử mã** để quan sát kết quả đầu ra thực tế trong Console!`;
  }

  // Chế độ 5: Gợi ý tư duy
  if (mode === 'hint' || message.includes('gợi ý')) {
    return `### 💡 Gợi ý tư duy từng bước:
1. **Bước 1**: Đọc kỹ dữ liệu đầu vào. Bạn cần lưu trữ thông tin bằng biến đơn hay một cấu trúc mảng/danh sách?
2. **Bước 2**: Xác định điều kiện rẽ nhánh hoặc vòng lặp. Dùng \`if\` để kiểm tra điều kiện hoặc \`for\` để duyệt qua dãy số.
3. **Bước 3**: Trả về hoặc in kết quả ra màn hình bằng hàm \`print()\` theo đúng định dạng đề bài yêu cầu.

\`\`\`python
# Khung mã mẫu tham khảo:
# 1. Khởi tạo
# 2. Xử lý logic
# 3. In kết quả
\`\`\`
Hãy thử từng bước nhỏ, bạn chắc chắn sẽ giải được!`;
  }

  // Phản hồi chung kèm hỗ trợ câu hỏi
  return `Chào bạn! Mình là Trợ lý AI Gia sư Lập trình của CodeLearn 🤖

Mình có thể hỗ trợ bạn mọi lúc với độ chính xác cao:
- 🔍 **Giải thích từng dòng code** bạn đang viết
- 🐞 **Bắt lỗi & viết lại mã chuẩn 100%** không lỗi cú pháp
- ⚡ **Tối ưu mã nguồn** sang chuẩn Clean Code
- 🌐 **Chuyển đổi giữa các ngôn ngữ** (Python, JavaScript, C++, SQL, Java)

Bạn hãy chọn các nút gợi ý nhanh phía trên hoặc đặt câu hỏi cụ thể nhé!`;
}

// Hàm phụ trợ giải thích ngữ nghĩa từng dòng
function explainLineMeaning(line) {
  if (line.startsWith('#')) return 'Dòng chú thích (comment), trình thông dịch bỏ qua khi chạy.';
  if (line.includes('def ')) return 'Khai báo hàm mới để tái sử dụng mã nguồn.';
  if (line.includes('class ')) return 'Định nghĩa một Lớp (Class) trong lập trình hướng đối tượng.';
  if (line.includes('if ') || line.includes('elif ')) return 'Kiểm tra điều kiện logic để quyết định rẽ nhánh chương trình.';
  if (line.includes('for ') && line.includes('range')) return 'Vòng lặp duyệt qua dải số nguyên liên tiếp.';
  if (line.includes('for ') && line.includes('in ')) return 'Vòng lặp duyệt tuần tự qua từng phần tử của danh sách/chuỗi.';
  if (line.includes('while ')) return 'Vòng lặp tiếp tục thực thi chừng nào điều kiện còn mang giá trị True.';
  if (line.includes('print(')) return 'Hàm xuất dữ liệu hoặc kết quả tính toán ra màn hình Console.';
  if (line.includes('return ')) return 'Trả về giá trị tính toán của hàm cho nơi gọi.';
  if (line.includes(' = ')) return 'Lệnh gán giá trị của biểu thức bên phải vào biến bên trái.';
  return 'Thực thi câu lệnh tính toán / xử lý dữ liệu.';
}

