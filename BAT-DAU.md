# BẮT ĐẦU VỚI MÃ NGUỒN NẾP VIỆT

Đây là toàn bộ mã nguồn ứng dụng web phiên bản 1.0: HTML, CSS, JavaScript ES modules, SVG, tài liệu kiến trúc và kiểm thử. Các file trong dist/ là mã được viết trực tiếp; không cần bước build hay khóa API để chạy.

## 1. Chạy trên máy

Giải nén ZIP rồi mở terminal trong thư mục nep-viet.

macOS / Linux (cần Python 3):

```sh
python3 -m http.server 8000 --directory dist
```

Windows (cần Python 3):

```sh
py -m http.server 8000 --directory dist
```

Mở http://localhost:8000 trong trình duyệt. Để dừng server, nhấn Ctrl+C ở terminal. Đừng chỉ nhấp đúp index.html: trình duyệt có thể chặn JavaScript modules qua file://.

## 2. Chỉnh sửa ở đâu?

| Tệp | Nội dung |
|---|---|
| dist/index.html | Cấu trúc giao diện, ba màn hình và dialog |
| dist/styles.css | Màu sắc, bố cục, responsive và định dạng tài liệu |
| dist/app.mjs | Sự kiện, thao tác giao diện, lưu, so sánh, tải hình và chia sẻ |
| dist/catalog.mjs | Trang phục, màu, phụ kiện, dịp, phong cách, nguồn và mẫu gợi ý |
| dist/domain.mjs | Kiểm tra cấu hình, luật phối, liên kết chia sẻ, sao lưu và bảo vệ đầu vào |
| dist/render.mjs | Hình vector SVG của người mẫu, áo, phụ kiện và phông nền |
| dist/storage.mjs | Lưu nháp và bộ sưu tập bằng localStorage |
| docs/ARCHITECTURE.md | Kiến trúc tổng thể và lộ trình mở rộng |
| tests/domain.test.mjs | 15 kiểm thử nghiệp vụ |
| scripts/check.mjs | Kiểm tra cú pháp, liên kết file, ID giao diện và tài liệu |

Sửa file rồi tải lại trang để xem thay đổi. Nếu chỉnh tài liệu kiến trúc, giữ docs/ARCHITECTURE.md và dist/architecture.md đồng nhất, đồng thời cập nhật bản trình bày dist/architecture.html.

## 3. Chạy kiểm thử (cần Node.js hiện đại)

```sh
node --test tests/domain.test.mjs
node scripts/check.mjs
```

Chạy các lệnh từ thư mục nep-viet, không phải dist.

## 4. Những gì đã có

Phối ba nhóm áo; chọn dịp, phong cách, màu áo và màu phần dưới; thêm phụ kiện; đổi nhân vật và nền; đọc tư liệu; lưu, đổi tên, xóa và so sánh; tải SVG; chia sẻ cấu hình; xuất/nhập JSON; tài liệu kiến trúc trên web.

## 5. Phạm vi bản đầu

Dữ liệu lưu trên trình duyệt tại địa chỉ đang mở. localhost:8000 và địa chỉ site đã triển khai là hai nơi lưu riêng. Có thể chuyển bộ sưu tập giữa chúng bằng JSON sao lưu.

Chưa có backend, tài khoản, đồng bộ cloud hay thử đồ bằng ảnh thật. Hình là mockup minh họa; các phần mở rộng được thiết kế trong tài liệu kiến trúc, chưa phải code đã triển khai.

Nội dung văn hóa có nguồn tham khảo nhưng chưa được chuyên gia cổ phục thẩm định. Xem docs/VERIFICATION.md để biết phạm vi kiểm tra và giới hạn kiểm thử giao diện.

Gói mã nguồn không chứa lịch sử Git, thông tin triển khai riêng tư hoặc khóa bí mật. Bạn có thể tạo repository và triển khai lên hosting tĩnh mình chọn.
