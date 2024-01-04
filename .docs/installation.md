# Hướng dẫn cài đặt và chạy ứng dụng

## Yêu cầu:

- `Java Development Kit` (17.x)

## Deploy ứng dụng trên Server 

1. Truy cập Server tại : https://int3306.freeddns.org/
    - tài khoản: fall2324w20g9
    - mật khẩu: 123456789
2. Mở cửa sổ Terminal 1 chạy lệnh:
```
java -jar backend_lms-lms_g9.release.jar
```
3. Mở cửa sổ Terminal 2 chạy lệnh:
```
/etc/jupyter/bin/expose 8080
```
4. Hoàn tất, truy cập vào http://fall2324w20g9.int3306.freeddns.org/ để sử dụng ứng dụng!


