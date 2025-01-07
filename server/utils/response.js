// utils/response.js

/**
 * Trả về phản hồi thành công
 * @param {object} res - Đối tượng response của Express
 * @param {string} message - Thông báo thành công
 * @param {any} data - Dữ liệu trả về (nếu có)
 * @param {number} statusCode - Mã HTTP status (mặc định 200)
 */
exports.successResponse = (res, message, data = null, statusCode = 200) => {
  res.status(statusCode).json({
    message,
    data,
    status: statusCode,
  });
};

/**
 * Trả về phản hồi lỗi
 * @param {object} res - Đối tượng response của Express
 * @param {string} message - Thông báo lỗi
 * @param {string} error - Chi tiết lỗi (nếu có)
 * @param {number} statusCode - Mã HTTP status (mặc định 500)
 */
exports.errorResponse = (res, message, error = null, statusCode = 500) => {
  res.status(statusCode).json({
    message,
    error,
    status: statusCode,
  });
};
