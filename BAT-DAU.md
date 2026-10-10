# BẮT ĐẦU VỚI MÃ NGUỒN NẾP VIỆT

Đây là toàn bộ mã nguồn ứng dụng web phiên bản 1.0: HTML, CSS, JavaScript ES modules, SVG, tài liệu kiến trúc và kiểm thử. Mã được viết trực tiếp, chia theo thư mục `css/` và `js/`; không cần bước build hay khóa API để chạy.

## 1. Chạy trên máy

Giải nén ZIP rồi mở terminal trong thư mục `nep-viet` (thư mục chứa `index.html`).

macOS / Linux (cần Python 3):

```sh
python3 -m http.server 8000
```

Windows (cần Python 3):

```sh
py -m http.server 8000
```

Mở http://localhost:8000 trong trình duyệt. Để dừng server, nhấn Ctrl+C ở terminal. Đừng chỉ nhấp đúp `index.html`: trình duyệt có thể chặn JavaScript modules qua `file://`, khiến trang trắng.

Cách khác: dùng tiện ích Live Server trong VS Code, hoặc chạy `npx serve` nếu đã cài Node.js.

## 2. Chỉnh sửa ở đâu?

| Tệp | Nội dung |
|---|---|
| `index.html` | Cấu trúc giao diện, ba màn hình và hộp thoại |
| `css/variables.css` | Màu sắc, phông chữ, các biến thiết kế |
| `css/base.css` | Reset, chữ, nút, liên kết, trạng thái truy cập |
| `css/layout.css` | Bố cục: đầu trang, lưới, cột, chân trang |
| `css/components.css` | Nút, thẻ, chip, hộp thoại, thông báo |
| `css/responsive.css` | Responsive, giảm chuyển động, in ấn (nạp sau cùng) |
| `css/docs.css` | Định dạng trang tài liệu kiến trúc |
| `js/app.mjs` | Khởi động và nối sự kiện (nhấp chuột, biểu mẫu, nhập tệp) |
| `js/data/catalog.mjs` | Trang phục, màu, phụ kiện, dịp, phong cách, nguồn và mẫu gợi ý |
| `js/core/domain.mjs` | Kiểm tra cấu hình, luật phối, liên kết chia sẻ, sao lưu, bảo vệ đầu vào |
| `js/core/storage.mjs` | Lưu nháp và bộ sưu tập bằng localStorage |
| `js/core/state.mjs` | Trạng thái dùng chung của phiên (bản đang phối, bộ sưu tập, trang đang xem) |
| `js/core/router.mjs` | Chuyển giữa Khám phá, Phòng phối đồ, Bộ sưu tập |
| `js/pages/studio.mjs` | Trang Phòng phối đồ |
| `js/pages/explore.mjs` | Trang Khám phá |
| `js/pages/collection.mjs` | Trang Bộ sưu tập |
| `js/components/mannequin.mjs` | Hình vector SVG của người mẫu, áo, phụ kiện và phông nền |
| `js/components/icons.mjs` | Bộ biểu tượng SVG |
| `js/components/ui.mjs` | Thông báo, nút tùy chọn, tải tệp |
| `js/components/dialogs.mjs` | Hộp thoại: chuyện tà áo, lưu/đổi tên, so sánh, chia sẻ, giới thiệu |
| `docs/architecture.md` | Kiến trúc tổng thể và lộ trình mở rộng |
| `docs/architecture.html` | Bản trình bày web của tài liệu kiến trúc |
| `tests/domain.test.mjs` | 15 kiểm thử nghiệp vụ |
| `scripts/check.mjs` | Kiểm tra cú pháp và đường dẫn import của mọi module, liên kết file, ID giao diện, tài liệu kiến trúc |

Sửa file rồi tải lại trang để xem thay đổi. Nếu chỉnh tài liệu kiến trúc, sửa `docs/architecture.md` rồi cập nhật bản trình bày `docs/architecture.html` cho đồng nhất.

Quy tắc chia việc: dữ liệu trang phục sửa ở `js/data/`, luật phối và kiểm tra dữ liệu ở `js/core/`, giao diện từng trang ở `js/pages/`, thành phần dùng lại ở `js/components/`. Các module chỉ nhập từ tầng thấp hơn hoặc ngang hàng, không nhập ngược từ `app.mjs`.

## 3. Chạy kiểm thử (cần Node.js hiện đại)

```sh
node --test tests/domain.test.mjs
node scripts/check.mjs
```

Chạy các lệnh từ thư mục `nep-viet`.

`tests/domain.test.mjs` và `scripts/check.mjs` đã được cập nhật theo cấu trúc mới (không còn tham chiếu `dist/`). Khi thêm hoặc đổi tên module trong `js/`, hãy cập nhật bảng module trong `docs/architecture.md`, nếu không `check.mjs` sẽ báo thiếu.

Bảng đối chiếu đường dẫn cũ sang mới, để tham khảo nếu bạn còn bản cũ có thư mục `dist/`:

| Đường dẫn cũ | Đường dẫn mới |
|---|---|
| `dist/catalog.mjs` | `js/data/catalog.mjs` |
| `dist/domain.mjs` | `js/core/domain.mjs` |
| `dist/storage.mjs` | `js/core/storage.mjs` |
| `dist/render.mjs` | `js/components/mannequin.mjs` (hàm `icon` nay ở `js/components/icons.mjs`) |
| `dist/app.mjs` | `js/app.mjs` |
| `dist/styles.css` | `css/*.css` (6 file) |
| `dist/index.html` | `index.html` |
| `dist/architecture.html`, `dist/architecture.md`, `dist/document.js` | `docs/architecture.html`, `docs/architecture.md`, `docs/document.js` |
| `dist/favicon.svg` | `assets/images/favicon.svg` |

Lưu ý: trên Windows, `docs/ARCHITECTURE.md` và `docs/architecture.md` là cùng một tên file. Chỉ giữ một bản.

## 4. Những gì đã có

Phối ba nhóm áo; chọn dịp, phong cách, màu áo và màu phần dưới; thêm phụ kiện; đổi nhân vật và nền; đọc tư liệu; lưu, đổi tên, xóa và so sánh; tải SVG; chia sẻ cấu hình; xuất/nhập JSON; tài liệu kiến trúc trên web.

## 5. Phạm vi bản đầu

Dữ liệu lưu trên trình duyệt tại địa chỉ đang mở. `localhost:8000` và địa chỉ site đã triển khai là hai nơi lưu riêng. Có thể chuyển bộ sưu tập giữa chúng bằng JSON sao lưu.

Chưa có backend, tài khoản, đồng bộ cloud hay thử đồ bằng ảnh thật. Hình là mockup minh họa; các phần mở rộng được thiết kế trong tài liệu kiến trúc, chưa phải code đã triển khai.

Nội dung văn hóa có nguồn tham khảo nhưng chưa được chuyên gia cổ phục thẩm định. Xem `docs/VERIFICATION.md` để biết phạm vi kiểm tra và giới hạn kiểm thử giao diện.

Gói mã nguồn không chứa lịch sử Git, thông tin triển khai riêng tư hoặc khóa bí mật. Bạn có thể tạo repository và triển khai lên hosting tĩnh mình chọn (đưa cả thư mục `nep-viet` lên, không cần build).

## 6. Chữ tiếng Việt bị tách dấu ("Nê´p", "chă´t")?

Lỗi này xảy ra với chữ có hai dấu chồng trên một nguyên âm (ế, ấ, ề, ố, ệ...) khi phông chữ không thiết kế sẵn các ký tự đó; trình duyệt phải ghép dấu rời nên dấu rơi lệch ra ngoài. Phông Georgia thường gây lỗi này trên Windows.

Ứng dụng đã dùng cách sau (xem `--serif` trong `css/variables.css`): ưu tiên Lora (Google Fonts, hỗ trợ đầy đủ tiếng Việt), dự phòng Times New Roman. Nếu vẫn thấy lỗi:

1. Mở DevTools (F12) → tab Network → kiểm tra Lora có tải được không (cần có mạng).
2. Nếu muốn chạy hoàn toàn ngoại tuyến, tải Lora (định dạng woff2, có bộ ký tự Vietnamese) từ Google Fonts, đặt vào `assets/fonts/` và khai báo `@font-face` trong `css/variables.css`.
3. Khi đổi sang phông khác, chọn phông có nhãn Vietnamese và thử gõ "Nếp xưa, chất liệu, ầ ẫ ổ ệ" để kiểm tra.
4. Tệp SVG tải về dùng Times New Roman cho dòng chú thích, vì máy người nhận có thể không có Lora.
