const nodemailer = require('nodemailer');

/**
 * Gửi khảo sát qua email
 * @param {Array} emailList - Danh sách email người nhận
 * @param {Object} survey - Đối tượng khảo sát
 * @param {boolean} isReminder - Có phải email nhắc nhở không
 */
exports.sendSurveyEmail = async (emailList, survey, isReminder = false) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subject = isReminder
    ? `Nhắc nhở: Tham gia khảo sát: ${survey.title}`
    : `Tham gia khảo sát: ${survey.title}`;
  const text = isReminder
    ? `Đây là email nhắc nhở để bạn tham gia khảo sát: "${survey.title}". Mô tả: ${survey.description}\n\nTruy cập liên kết sau để tham gia: ${process.env.CLIENT_URL}/student/survey-list/${survey.id}`
    : `Bạn được mời tham gia khảo sát: "${survey.title}". Mô tả: ${survey.description}\n\nTruy cập liên kết sau để tham gia: ${process.env.CLIENT_URL}/student/survey-list/${survey.id}`;

  const mailOptions = emailList.map((email) => ({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
  }));

  for (let options of mailOptions) {
    await transporter.sendMail(options);
  }
};
