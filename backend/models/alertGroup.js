/* models/alertGroup.js */
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// Thiết kế mô hình
const AlertGroupSchema = new mongoose.Schema(
  {
    groupname: {
      type: String, // Kiểu string
      required: true, // Trường bắt buộc phải có
    },
    groupdesc: {
      type: String,
    },
    popupAlert: {
      type: String,
      enum: ["0", "1"], // Yêu cầu giá trị phải là "0" hoặc "1"
      required: true,
    },
    emailAlert: {
      type: String,
      enum: ["0", "1"],
      required: true,
    },
    smsAlert: {
      type: String,
      enum: ["0", "1"],
      required: true,
    },
    accounts: {
      type: [{
        type: ObjectId, // Kiểu ObjectId
        ref: 'Account', // Trường tham chiếu đến mô hình tài khoản
      }],
      default: [],  // Giá trị mặc định nếu không được cung cấp
    },
  },
  {
    timestamps: true, // Tự động thêm các trường thời gian liên quan đến tạo và cập nhật
  }
);

// Đăng ký mô hình với cơ sở dữ liệu
const AlertGroup = mongoose.model('AlertGroup', AlertGroupSchema)

// Xuất mô hình để sử dụng sau này
module.exports = mongoose.model('AlertGroup')
