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
      <td>UNAUTH_001</td>
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
      <td>UNAUTH_002</td>
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
      <td rowspan="4">Tìm kiếm và xem thông tin khóa học</td>
      <td>ID</td>
      <td>UNAUTH_003</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Tìm kiếm khóa học dựa trên những tiêu chí như <em>tên khóa học, giảng viên, chủ đề ...</em></td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Không</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Nhập tiêu chí tìm kiếm khóa học</li>
          <li>Gửi yêu cầu tìm kiếm</li>
          </li>
          <li>Điều hướng đến trang hiển thị kết quả tìm kiếm</li>
          <li>Nếu kết quả tìm kiếm không rỗng, chọn lấy một để xem thông tin khóa học đó</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Tìm kiếm và xem thông tin người dùng</td>
      <td>ID</td>
      <td>UNAUTH_004</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Tìm kiếm người dùng dựa theo tên</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Không</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Nhập tên người dùng cần tìm</li>
          <li>Gửi yêu cầu tìm kiếm</li>
          </li>
          <li>Điều hướng đến trang hiển thị kết quả tìm kiếm</li>
          <li>Nếu kết quả tìm kiếm không rỗng, chọn lấy một để xem thông tin về người dùng đó</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="5">Xem tin tức</td>
      <td>ID</td>
      <td>UNAUTH_005</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Theo dõi tin tức liên quan đến Giáo dục.</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Không</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        Hiển thị các bài báo liên quan đến Giáo dục trong nước (tổng hợp từ VNExpress). Mỗi tin có tiêu đề, tóm tắt & ảnh minh hoạ.
      </td>
    </tr>
  </tbody>
</table>

**_Lưu ý:_** Tính năng tìm kiếm luôn khả dụng cho dù tác nhân đã xác thực hay chưa.

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
      <td>AUTH_001</td>
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
      <td>AUTH_002</td>
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
      <td>AUTH_TEACHER_001</td>
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
      <td rowspan="4">Đăng bài học</td>
      <td>ID</td>
      <td>AUTH_TEACHER_002</td>
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
      <td>AUTH_TEACHER_003</td>
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
      <td rowspan="4">Tạo bài kiểm tra</td>
      <td>ID</td>
      <td>AUTH_TEACHER_004</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Tạo bài kiểm tra trắc nghiệm cho một khóa học</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn tính năng tạo bài kiểm tra</li>
          <li>Nhập thông tin cho bài kiểm tra, bao gồm: <em>tiêu đề, thời gian làm bài, thời gian bắt đầu, các câu hỏi và đáp án, biểu điểm</em></li>
          <li>
            Gửi yêu cầu tạo bài kiểm tra
            <ol>
              <li>Thông tin về bài kiểm tra thiếu hoặc không hợp lệ: hiển thị thông báo lỗi</li>
              <li>Thông tin về bài kiểm tra hợp lệ: thông báo tạo thành công</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Thống kê bài tập, bài kiểm tra</td>
      <td>ID</td>
      <td>AUTH_TEACHER_005</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Thống kê số lượng học viên làm bài tập, bài kiểm tra và nội dung bài làm</td>
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
      <td rowspan="4">Đóng khóa học</td>
      <td>ID</td>
      <td>AUTH_TEACHER_006</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Sau khi đóng khóa học, người dùng chỉ có thể xem, không thể tương tác với khóa học nữa</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản giảng viên và truy cập vào khóa học do mình tạo</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn tính năng đóng khóa học</li>
          <li>
            Xác nhận đóng khóa học
            <ol>
              <li>Đồng ý: đóng khóa học</li>
              <li>Hủy</li>
            </ol>
          </li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Xử lý yêu cầu tham gia khóa học</td>
      <td>ID</td>
      <td>AUTH_TEACHER_007</td>
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
      <td rowspan="4">Xóa học viên</td>
      <td>ID</td>
      <td>AUTH_TEACHER_008</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Loại học viên khỏi khóa học</td>
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
          <li>Chọn tính năng xóa học viên
            <ol>
              <li>Đồng ý: Loại học viên khỏi khóa học</li>
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
      <td rowspan="4">Tham gia khóa học</td>
      <td>ID</td>
      <td>AUTH_STUDENT_001</td>
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
      <td rowspan="4">Đánh giá khóa học</td>
      <td>ID</td>
      <td>AUTH_STUDENT_002</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Đánh giá khóa học theo thang điểm 5, đi kèm lời nhận xét(nếu có)</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn tính năng đánh giá</li>
          <li>Chọn điểm đánh giá và nhập nhận xét</li>
          <li>Gửi đánh giá</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Bình luận về bài học</td>
      <td>ID</td>
      <td>AUTH_STUDENT_003</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Đưa ra câu hỏi, thảo luận bên dưới một bài học</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Truy cập vào trang bài học</li>
          <li>Nhập nội dung bình luận</li>
          <li>Gửi bình luận</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Nộp bài tập</td>
      <td>ID</td>
      <td>AUTH_STUDENT_004</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Trình bày bài làm và gửi</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Truy cập vào trang bài học</li>
          <li>Chọn nộp bài tập</li>
          <li>Trình bày bài làm</li>
          <li>Chọn nộp</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td rowspan="4">Làm bài kiểm tra</td>
      <td>ID</td>
      <td>AUTH_STUDENT_005</td>
    </tr>
    <tr>
      <td>Mô tả</td>
      <td>Trả lời các câu hỏi trắc nghiệm</td>
    </tr>
    <tr>
      <td>Điều kiện</td>
      <td>Đã xác thực với tài khoản học viên</td>
    </tr>
    <tr>
      <td>Luồng hoạt động</td>
      <td>
        <ol>
          <li>Chọn bài kiểm tra trong khóa học</li>
          <li>Chọn đáp án hoặc nhập đáp án cho mỗi câu hỏi trắc nghiệm</li>
          <li>Nộp bài</li>
          <li>Xem điểm</li>
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
