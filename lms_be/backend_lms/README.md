# Quy tắc làm hàm secure:
- Sẽ có /role/... 
  - Ở đây role sẽ đóng vai trò verified xem những page nào cần có role nào mới được xem
  - Ở phần filter roles, sẽ check theo kiểu hasAnyRoles(), để admin xem được hết thì sẽ có ("admin", "student") hoặc ("admin", "teacher")