# Nếp Việt — Việt phục Remix

Ứng dụng web phiên bản 1 cho hành trình chọn → phối → xem → hiểu → lưu Việt phục. Giao diện tiếng Việt, giấy ngà/đỏ gạch/xanh rêu, hình vector đổi màu và phụ kiện trực tiếp.

## Mở sản phẩm

Sử dụng URL triển khai riêng tư được bàn giao trong cuộc trò chuyện. `index.html` ở thư mục gốc là entrypoint của ứng dụng; mã chạy nằm trong `index.html`, `css/`, `js/` và `assets/`. Không cần khóa API hoặc framework.

Khi chạy trên máy riêng, dùng static HTTP server phục vụ thư mục gốc dự án (JavaScript ES modules không chạy bằng cách mở `file://` ở một số trình duyệt). Xem `BAT-DAU.md` để có lệnh cụ thể. Trong môi trường Sites, sử dụng quy trình preview do Sites cung cấp.

Phông chữ: tiêu đề dùng Lora tải từ Google Fonts khi có mạng; ngoại tuyến sẽ tự dùng Times New Roman. Đây là phần tùy chọn, ứng dụng vẫn chạy đủ chức năng nếu không tải được.

## Chức năng

- Áo dài, áo tứ thân, áo ngũ thân có cấu trúc minh họa riêng.
- Năm dịp, ba phong cách, sáu màu áo, ba màu quần/váy.
- Nón lá/khăn vấn và quạt giấy/túi mây; một lựa chọn mỗi nhóm.
- Hai kiểu tóc nhân vật, hai nền; gợi ý theo dịp có giải thích.
- Nguồn văn hóa cho từng nhóm áo; thông tin tổng hợp chưa qua thẩm định chuyên gia.
- Ba trang chuyển qua lại: Khám phá, Phòng phối đồ, Bộ sưu tập.
- Lưu tối đa 50 bản trên trình duyệt, đổi tên, mở lại, xóa có xác nhận, so sánh hai bản.
- Xuất SVG, chia sẻ cấu hình bằng URL, sao lưu và nhập JSON.
- Kiến trúc dự án đọc trực tiếp, tải Markdown và in từ trình duyệt.

## Cấu trúc thư mục

```
nep-viet/
├── index.html
├── assets/images/        favicon
├── css/                  variables · base · layout · components · docs · responsive
├── js/
│   ├── app.mjs           khởi động, nối sự kiện
│   ├── data/             catalog.mjs  (danh mục, nguồn, mẫu gợi ý)
│   ├── core/             domain · storage · state · router
│   ├── components/       mannequin · icons · ui · dialogs
│   └── pages/            studio · explore · collection
├── docs/                 architecture.md · architecture.html · document.js · VERIFICATION.md
├── tests/                kiểm thử nghiệp vụ
├── scripts/              check.mjs
├── BAT-DAU.md
└── README.md
```

## Kiến trúc

Tài liệu chính: [docs/architecture.md](docs/architecture.md). Bản trình bày web: [docs/architecture.html](docs/architecture.html). Nội dung phân biệt rõ bản hiện tại và thiết kế đích (API, tài khoản, D1/R2, CMS, thử đồ bằng ảnh).

Các mô-đun chính: `data/catalog.mjs` — danh mục và nguồn; `core/domain.mjs` — quy tắc và kiểm tra dữ liệu; `core/storage.mjs` — repository; `core/state.mjs` — trạng thái dùng chung; `core/router.mjs` — chuyển trang; `components/mannequin.mjs` — SVG; `pages/*.mjs` — giao diện từng trang; `app.mjs` — điều phối sự kiện.

Quy tắc nhập module: `data` và `core/domain` không phụ thuộc DOM; `components` và `pages` dùng `core` và `data`; chỉ `app.mjs` nối mọi thứ lại.

## Kiểm tra

Yêu cầu Node.js hiện đại có `node:test`, `TextEncoder`, `atob/btoa` và `import.meta.dirname`.

```sh
node --test tests/*.test.mjs
node scripts/check.mjs
```

Không có dependency runtime. Kiểm thử bảo vệ các luồng lưu dữ liệu, sao lưu, liên kết chia sẻ, loại trừ phụ kiện và đầu vào sai; không thay thế kiểm tra giao diện bằng trình duyệt.

## Giới hạn V1

Chưa có tài khoản, backend, đồng bộ đa thiết bị, thời tiết trực tiếp hay thử đồ trên ảnh thật. Hình là mockup, không phải mẫu phục dựng hoặc rập may. Xóa dữ liệu trình duyệt sẽ xóa bộ sưu tập; nên tải JSON sao lưu. Link cấu hình không cấp quyền truy cập site riêng tư và không thu hồi được bản sao đã gửi.

## Nâng cấp

Giữ `schema_version` và ID danh mục ổn định; thêm migration trước khi thay cấu trúc. Không biến repo local thành cloud bằng cách bỏ qua quyền sở hữu: cần API có xác thực và kiểm tra server theo tài liệu kiến trúc. Mỗi loại trang phục mới phải có renderer, metadata, tư liệu, ghi chú phạm vi và thẩm định nội dung.

Thêm trang phục mới: thêm mục vào `js/data/catalog.mjs`, vẽ cấu trúc áo trong `js/components/mannequin.mjs`, rồi cập nhật tư liệu trong `docs/`.

Mọi hình minh họa SVG trong ứng dụng do dự án tạo; không sao chép ảnh từ nguồn đọc thêm.
