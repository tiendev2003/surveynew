const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/roles");
const {
  createSurvey,
  getSurveys,
  updateSurvey,
  deleteSurvey,
  scheduleSurvey,
  approveSurvey,
  getPendingSurveys,
  sendSurveyToGroups,
  createSurveyLink,
  duplicateSurvey,
  getSurveyQuestions,
  getSurveyDetail,
  getSurveysForStudent,
  getSurveyOfStudent,
  saveSurveyResponse,
  getSurveyResponseStats,
  getAllSurveyAdmin,
   
} = require("../controllers/surveyController");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("lecturer", "admin"),
  createSurvey
); // Tạo khảo sát
router.get("/", authenticateToken, getSurveys); // Lấy danh sách khảo sát
router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("lecturer", "admin"),
  updateSurvey
); // Chỉnh sửa khảo sát
router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("lecturer", "admin"),
  deleteSurvey
); // Xóa khảo sát
router.put(
  "/:id/schedule",
  authenticateToken,
  authorizeRoles("lecturer", "admin"),
  scheduleSurvey
); // Thiết lập thời gian
router.put(
  "/:id/approve",
  authenticateToken,
  authorizeRoles("admin"),
  approveSurvey
);
router.get(
  "/pending",
  authenticateToken,
  authorizeRoles("admin"),
  getPendingSurveys
);
router.post(
  "/:id/send",
  authenticateToken,
  authorizeRoles("lecturer", "admin"),
  sendSurveyToGroups
);
router.get(":id/questions", authenticateToken, getSurveyQuestions);
router.post(
  "/:id/share-link",
  authenticateToken,
  authorizeRoles("lecturer", "admin"),
  createSurveyLink
);
router.post(
  "/:id/duplicate",
  authenticateToken,
  authorizeRoles("lecturer", "admin"),
  duplicateSurvey
);

router.get("/all/student", authenticateToken, getSurveysForStudent);
router.get("/can-take", authenticateToken, getSurveyOfStudent);
router.get("/:id", authenticateToken, getSurveyDetail);
router.post("/response", authenticateToken, saveSurveyResponse);
router.get("/:surveyId/statistics", authenticateToken, getSurveyResponseStats);
router.get("/all/admin", authenticateToken, getAllSurveyAdmin);
 
module.exports = router;
