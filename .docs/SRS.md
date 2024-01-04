# **Tài liệu đặc tả yêu cầu hệ thống quản lý học tập**

# Giới thiệu

## Khái niệm hệ thống quản lý học tập

Hệ thống quản lý học tập (Learning Management System, LMS) là một **ứng dụng** cung cấp những tính năng hỗ trợ việc học tập/giảng dạy như: _quản lý người học_, _quản lý tài liệu học tập_, _theo dõi hoạt động học tập_, _trao đổi_, _báo cáo_, ... - tất cả những tính năng này đều trực tuyến.

Sử dụng một hệ thống như vậy mang lại những thuận tiện như: _không cần ghi chép như học tập/giảng dạy truyền thống_, _linh động hơn về giờ giấc_, _không cần phải tập trung thành viên trong lớp học tại một địa điểm, giờ giấc cụ thể_,...


## Đề xuất

Nhóm đề xuất một hệ thống LMS mở hơn, sẽ không chỉ gói gọn trong phạm vi một trường học mà là bất cứ ai, bất cứ đâu.

Các tài khoản trong hệ thống được chia làm hai loại: _giảng viên_ và _học viên_. _Học viên_ không thể thực hiện những chức năng dành riêng cho _giảng viên_(chẳng hạn như tạo khóa học, giao bài tập, ...) và ngược lại.

Các khóa học có thể _công khai_ hoặc _kín_.

# Các tác nhân và tính năng

## **Chưa xác thực**

Tác nhân được xếp vào loại này nếu chưa đăng nhập.

<table>
  <thead>
    <tr>
      <th>Tính năng</th>
      <th colspan="2">Chi tiết</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">Đăng ký</td>
      <td>ID</td>
      <td>UNAUTH_Signup</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Tạo tài khoản mới để có thể sử dụng hệ thống</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Người dùng chưa xác thực</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Cung cấp thông tin như: tên người dùng, mật khẩu và một số thông tin khác</li>
          <li>Chọn kiểu tài khoản muốn tạo: <em>giảng viên</em> hoặc <em>học viên</em></li>
          <li>Gửi yêu cầu đăng ký</li>
          <li>
            Có hai khả năng khi gửi yêu cầu đăng ký:
            <ol>
              <li>Thông tin chưa hợp lệ: hiển thị thông báo lỗi</li>
              <li>Đăng ký thành công: điều hướng đến trang đăng nhập</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Đăng nhập</td>
      <td>ID</td>
      <td>UNAUTH_Login</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Cung cấp thông tin đăng nhập để sử dụng hệ thống</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Người dùng chưa xác thực</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Nhập thông tin đăng nhập (email và mật khẩu hoặc tên người dùng và mật khẩu))</li>
          <li>Gửi yêu cầu đăng nhập</li>
          <li>
            Có hai khả năng sau khi xử lý yêu cầu đăng nhập
            <ol>
              <li>Thông tin đăng nhập sai: hiển thị thông báo lỗi</li>
              <li>Thông tin đăng nhập khớp: tải lại trang</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Quên mật khâu</td>
      <td>ID</td>
      <td>UNAUTH_ResetPassword</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Quên mật khẩu khi đăng nhập</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Người dùng chưa xác thực</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Nhập thông tin đăng nhập (username)</li>
          <li>Nếu thông tin chính xác, thư chứa code để đổi mật khẩu sẽ được gửi về mail</li>
          <li>Nhập lại code và nhập mật khẩu mới
          </li>
        </ol>
      </td>
    </tr>

  </tbody>
</table>


## **Đã xác thực**

Tác nhân được xếp vào loại này nếu đã đăng nhập thành công.

Các tính năng trong bảng ngay dưới đây áp dụng cho bất cứ người dùng nào đã đăng nhập.

<table>
  <thead>
    <tr>
      <th>Tính năng</th>
      <th colspan="2">Chi tiết</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">Đăng xuất</td>
      <td>ID</td>
      <td>AUTH_Logout</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Thoát khỏi phiên đăng nhập</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Gửi yêu cầu đăng xuất</li>
          <li>Tải lại trang</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Sửa thông tin tài khoản</td>
      <td>ID</td>
      <td>AUTH_ProfileInfoEdit</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Sửa tên người dùng, mật khẩu và các thông tin khác</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Nhập thông tin mới</li>
          <li>Gửi yêu cầu cập nhật</li>
          <li>
            Có hai khả năng sau khi nhận yêu cầu cập nhật:
            <ol>
              <li>Thông tin mới không hợp lệ: hiển thị thông báo lỗi</li>
              <li>Thông tin mới hợp lệ: thông báo cập nhật thành công</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Xem báo giáo dục tổng hợp</td>
      <td>ID</td>
      <td>AUTH_Articles</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Xem các thông tin tổng hợp từ nguồn báo VnExpress về giáo dục</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn mục Articles</li>
          <li>Click vào đường link dẫn tới bài báo gốc</li>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Quên mật khẩu</td>
      <td>ID</td>
      <td>AUTH_ChangePassword</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Đổi mật khẩu mới</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Nhập thông tin username</li>
          <li>Nếu thông tin chính xác, thư chứa code để đổi mật khẩu sẽ được gửi về mail</li>
          <li>Nhập lại code và nhập mật khẩu mới</li>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Xem sự kiện sắp tới</td>
      <td>ID</td>
      <td>AUTH_Calendar</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Xem các thông báo hiển thị trong lịch, hạn nộp bài tập, bài kiểm tra</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn khóa học cụ thể</li>
          <li>Vào mục Calender để xem các thông báo hiển thị trong lịch, hạn nộp bài tập, bài kiểm tra</li>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Thảo luận</td>
      <td>ID</td>
      <td>AUTH_Conversation</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Tạo các hội thoại trong khóa học</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn khóa học cụ thể</li>
          <li>Truy cập Discussion</li>
      </td>
    </tr>
  </tbody>
</table>

### **Giảng viên**

<table>
  <thead>
    <tr>
      <th>Tính năng</th>
      <th colspan="2">Chi tiết</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">Tạo khóa học</td>
      <td>ID</td>
      <td>TEACHER_CreateCourse</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Tạo một khóa học. Người dùng sẽ có toàn quyền với khóa học mà mình tạo</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Nhập thông tin khóa học (<em>tên, chủ đề, mô tả,...</em>)</li>
          <li>Gửi yêu cầu tạo khóa học</li>
          <li>Sau khi xử lý yêu cầu, có hai tình huống:
            <ol>
              <li>Thông tin khóa học không hợp lệ: hiển thị thông báo lỗi</li>
              <li>Tạo khóa học thành công: điều hướng đến trang quản lý khóa học đó</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Sửa khóa học</td>
      <td>ID</td>
      <td>TEACHER_ModifiedCourse</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Sửa thông tin giới thiệu khóa học</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Vào khóa học cụ thể</li>
          <li>Chọn nút "Edit" bên dưới mục "Thông tin giới thiệu khóa học"</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Đăng bài học</td>
      <td>ID</td>
      <td>TEACHER_CreateLesson</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Giảng viên đăng nội dung bài học cho khóa học mà mình tạo</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn tính năng đăng bài học</li>
          <li>Nhập nội dung bài học</li>
          <li>Đăng bài học</li>
          <li>
            Sau khi xử lý yêu cầu đăng bài học, có hai tình huống
            <ol>
              <li>Không nhập đủ thông tin: hiển thị yêu cầu nhập đủ</li>
              <li>Đủ thông tin: điều hướng đến trang hiển thị nội dung bài học</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Đăng bài tập</td>
      <td>ID</td>
      <td>TEACHER_CreateExercise</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Tạo bài tập tương ứng với một bài học</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn một bài học</li>
          <li>Chọn tính năng đăng bài tập</li>
          <li>Nhập yêu cầu bài tập</li>
          <li>
            Sau khi xử lý yêu cầu tạo bài tập, có hai tình huống
            <ol>
              <li>Không nhập đủ thông tin: hiển thị yêu cầu nhập đủ</li>
              <li>Đủ thông tin: thông báo tạo thành công</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Sửa/xóa bài tập</td>
      <td>ID</td>
      <td>TEACHER_ModifiedExercise</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Sửa/ xóa thông tin bài tập</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn bài tập giáo viên muốn sửa/xóa trong exercise List</li>
          <li>chọn "edit" để sửa, "delete" để xóa bài tập</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Sửa xóa bài học</td>
      <td>ID</td>
      <td>TEACHER_ModifiedLesson</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Sửa/ xóa thông tin bài giảng</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn bài học giáo viên muốn sửa/xóa trong exercise List</li>
          <li>chọn "edit" để sửa, "delete" để xóa</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Thống kê bài tập, bài kiểm tra</td>
      <td>ID</td>
      <td>TEACHER_CourseScore</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Xem điểm tổng kết và điểm chi tiết của học viên</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ul>
          <li>
            Bài tập
            <ol>
              <li>Chọn một buổi học</li>
              <li>Chọn tính năng xem bài tập</li>
              <li>Chọn một học viên để xem nội dung bài làm</li>
            </ol>
          </li>
          <li>
            Bài kiểm tra
            <ol>
              <li>Chọn một bài kiểm tra</li>
              <li>Chọn một học viên để xem nội dung bài làm và kết quả kiểm tra</li>
            </ol>
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Tạo thông báo trong khóa học</td>
      <td>ID</td>
      <td>TEACHER_CourseNotification</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Tạo thông báo cho các học viên trong khóa</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn khóa học cụ thể</li>
          <li>Chọn nút "Notification" bên tay trái 
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Tìm kiếm học viên cụ thể</td>
      <td>ID</td>
      <td>TEACHER_StudentSearch</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Có thể tìm kiếm theo tên cụ thể của học sinh để thêm vào lớp học</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học *kín* do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn khóa học cụ thể</li>
          <li>Chọn nút "Request List" bên trái màn hình  </li>
          <li>Gõ tên học sinh trong SearchBar, ấn vào "Search" để tìm kiếm học sinh cụ thể trong database </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Xử lý yêu cầu tham gia khóa học</td>
      <td>ID</td>
      <td>TEACHER_CourseEnrollAccept</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Chấp nhận hoặc từ chối yêu cầu tham gia khóa học kín của học viên</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học *kín* do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn danh sách yêu cầu đang chờ</li>
          <li>Chọn yêu cầu
            <ol>
              <li>Đồng ý: Thêm vào danh sách học viên và xóa khỏi danh sách yêu cầu</li>
              <li>Từ chối: Xóa khỏi danh sách yêu cầu</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Thêm / Xóa học viên</td>
      <td>ID</td>
      <td>TEACHER_StudentManagement</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Thêm hoặc xoá học viên trong khoá học</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoảng giảng viên và truy cập vào khóa học do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn học viên</li>
          <li>Chọn tính năng xóa / thêm học viên
            <ol>
              <li>Đồng ý: Thêm / Loại học viên khỏi khóa học</li>
              <li>Hủy</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
  </tbody>
</table>

### **Học viên**

Tác nhân được xếp vào loại này nếu đã đăng nhập thành công và đang truy cập/sử dụng khóa học mình tham gia.

<table>
  <thead>
    <tr>
      <th>Tính năng</th>
      <th colspan="2">Chi tiết</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">Gửi yêu cầu tham gia khóa học</td>
      <td>ID</td>
      <td>STUDENT_EnrollRequest</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Tham gia khóa học để có quyền bình luận và làm các bài tập, bài kiểm tra</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn một khóa học, gửi yêu cầu tham gia</li>
          <li>Yêu cầu được lưu vào danh sách chờ</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Xem thông tin giáo viên khóa học</td>
      <td>ID</td>
      <td>STUDENT_TeacherInfo</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Xem thông tin của giảng viên từng môn học cụ thể</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn một khóa học muốn join vào.</li>
          <li>Thông tin giảng viên được hiện thị trong màn hình preview</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Nộp bài tập</td>
      <td>ID</td>
      <td>STUDENT_SubmitWork</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Nộp bài tập để giáo viên chấm điểm</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn khóa học cụ thể</li>
          <li>chọn bài tập cụ thể trong danh sách Excercise List</li>
          <li>Chọn "Submit your work" để nộp</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Xem bài tập</td>
      <td>ID</td>
      <td>STUDENT_ViewExercise</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Xem lại và sửa bài nộp</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn khóa học cụ thể</li>
          <li>Chọn bài tập cụ thể trong danh sách Excercise List</li>
          <li>Chọn "Open file" để xem lại , chọn "edit" để sửa bài nộp</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Xem điểm cá nhân</td>
      <td>ID</td>
      <td>STUDENT_Gradebook</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Xem lại bài làm và điểm của mình</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn khóa học cụ thể</li>
          <li>Chọn "Grade" để xem lại bài và điểm bài đó </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Rời khóa học</td>
      <td>ID</td>
      <td>AUTH_STUDENT_006</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Sau khi rời khóa học, học viên sẽ không thể bình luận, làm bài tập, bài kiểm tra của khóa học đó nhưng vẫn xem được những nội dung của khóa học tính đến thời điểm rời đi</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn tính năng rời khóa học</li>
          <li>
            Xác nhận
            <ol>
              <li>Đồng ý: Rời khỏi khóa học</li>
              <li>Hủy</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
  </tbody>
</table>
