const schedule = require('node-schedule');
const { sendSurveyEmail } = require('./surveyUtils');

exports.scheduleSurveyEmail = async (survey, classIds, scheduleTime) => {
  try {
    // Lấy danh sách email từ các lớp
    const students = await User.findAll({
      where: { class_id: classIds },
      attributes: ['email'],
    });

    const emailList = students.map((student) => student.email);

    if (emailList.length === 0) {
      console.log(`No recipients found for survey ID: ${survey.id}`);
      return;
    }

    // Lên lịch gửi email
    const job = schedule.scheduleJob(new Date(scheduleTime), async () => {
      try {
        console.log(`Sending survey emails for survey ID: ${survey.id}`);
        await sendSurveyEmail(emailList, survey);
        console.log(`Survey emails sent successfully for survey ID: ${survey.id}`);
      } catch (error) {
        console.error(`Failed to send survey emails for survey ID: ${survey.id}: ${error.message}`);
      }
    });

    console.log(`Survey ID: ${survey.id} scheduled to send emails at ${scheduleTime}`);
    return job;
  } catch (error) {
    console.error(`Failed to schedule survey email for survey ID: ${survey.id}: ${error.message}`);
    throw error;
  }
};