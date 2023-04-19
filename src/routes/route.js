const express = require("express");
const router = express.Router();
// const cron = require("node-cron");
// const moment = require('moment');

const quizController = require("../controllers/quizController");

router.post("/quizzes", quizController.createQuiz);

router.get("/quizzes/active", quizController.getQuiz);

router.get("/quizzes/:id/result", quizController.getQuizResultById);

router.get("/quizzes/all", quizController.getAllQuiz);

module.exports = router;
