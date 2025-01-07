const express = require("express");

const router = express.Router();

const questionController = require("../controllers/questionController");
const { authenticateToken } = require("../middleware/auth");

router.get("/", authenticateToken, questionController.getQuestions);
router.get("/status/true", authenticateToken, questionController.getQuestionsStatus);
router.get("/:id", authenticateToken, questionController.getQuestion);
router.put("/:id", authenticateToken, questionController.editQuestion);
router.delete("/:id", authenticateToken, questionController.deleteQuestion);
router.post("/", authenticateToken, questionController.createQuestion);

module.exports = router;
