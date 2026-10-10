# Kiểm tra phiên bản 1.0 — 08/10/2026

## Đã thực hiện

- 15 kiểm thử Node.js đều đạt: danh mục, cấu hình, thay phụ kiện cùng nhóm, gợi ý theo dịp, liên kết khứ hồi, snapshot dữ liệu, lưu/mở/đổi tên/xóa, quota, dữ liệu hỏng, giới hạn 50 bản, JSON nhập/xuất, HTML escaping và ID SVG không trùng.
- Kiểm tra cú pháp toàn bộ JavaScript mô-đun, ID DOM tĩnh, liên kết tệp nội bộ, stylesheet responsive và sự thống nhất của tài liệu kiến trúc tải về.
- Render và xem ba SVG đại diện: áo dài đỏ gạch, áo tứ thân xanh rêu, áo ngũ thân xanh chàm. Các hình phân biệt được cấu trúc áo, yếm/váy, quần, nón/khăn và phụ kiện.
- URL chia sẻ chỉ mang cấu hình bản phối trong fragment; loại bỏ query string của trang hiện tại.

## Chưa thực hiện

Môi trường không có skill điều khiển trình duyệt cần thiết theo quy trình Sites. Không khởi động preview server hoặc dùng đường điều khiển trình duyệt thay thế. Vì vậy chưa kiểm thử toàn bộ tương tác DOM, tải tệp, hộp thoại và bố cục trên trình duyệt/thiết bị thực. Kiểm thử đơn vị không chứng minh các phần đó.

Sau khi mở site, nên kiểm tra một lượt: đổi ba loại áo; màu áo/quần; phụ kiện; lưu hai bản; đổi tên; so sánh; tải SVG; xuất rồi nhập JSON; mở URL chia sẻ; tải lại trang. Kiểm tra thêm trên màn hình 360/768/1440 px và bằng bàn phím.

Nội dung văn hóa đã tra cứu nguồn ghi trong tài liệu kiến trúc, chưa được chuyên gia cổ phục thẩm định. Hình SVG là mockup, không phải phục dựng.
