process.env['NODE_DISABLE_COLORS'] = '1';

// Tạo một biến http để sử dụng module http của Node js
var http = require("http");

// Tạo một biến fs để sử dụng module fs của Node js
var fs = require("fs");

// Tạo một biến url để sử dụng module url của Node js
var url = require("url");

// Tạo một biến Caculator để sử dụng module Caculator đã tạo ở trên
var Caculator = require("./Caculator");

// Tạo một đối tượng Caculator để sử dụng các phương thức cộng, trừ, nhân
var caculator = new Caculator();

// Tạo một server để xử lý các yêu cầu từ client
http.createServer(function(req, res) {
  // Phân tích url truyền lên
  var q = url.parse(req.url, true);

  // Nếu url là / hoặc /home thì hiển thị home.html
  if (q.pathname === "/" || q.pathname === "/home") {
    // Đọc file home.html và gửi nội dung cho client
    fs.readFile("index.html", function(err, data) {
      // Nếu có lỗi, hiển thị lỗi
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("404 Not Found");
      } else {
        // Nếu không có lỗi, gửi nội dung file home.html cho client
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }

  // Nếu url là /tinhtoan thì xử lý tính toán và trả về kết quả
  if (q.pathname === "/tinhtoan") {
    // Lấy giá trị của hai số và phép toán từ query string
    var num1 = q.query.num1;
    var num2 = q.query.num2;
    var operator = q.query.operator;

    // Kiểm tra xem các giá trị có hợp lệ không
    if (isNaN(num1) || isNaN(num2)) {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end("Vui lòng nhập số hợp lệ");
      return;
    }
    if (operator !== "+" && operator !== "-" && operator !== "*" && operator !=="/") {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.end("Vui lòng chọn phép toán hợp lệ");
      return;
    }
    if(operator == "/"&& num2==0){
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("khong the chia cho 0");
    }

    // Tính toán kết quả theo phép toán
    var result;
    switch (operator) {
      case "+":
        result = caculator.cong(+num1, +num2);
        break;
      case "-":
        result = caculator.tru(+num1, +num2);
        break;
      case "*":
        result = caculator.nhan(+num1, +num2);
        break;
        case "/":
            result = caculator.chia(+num1, +num2);
            break;
    }

    // Gửi kết quả cho client
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("result:" + result);
  }
}).listen(8080); 
