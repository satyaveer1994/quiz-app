const quizModel = require("../models/quizModel");
const cron = require("node-cron");
const moment = require("moment");

// Define the route for creating a new quiz
const createQuiz = async (req, res) => {
  try {
    // Validate the input fields
    const { question, options, rightAnswer, startDate, endDate } = req.body;
    if (!question || !options || !rightAnswer || !startDate || !endDate) {
      return res.status(400).send({ message: "All fields are required" });
    }
    if (!Array.isArray(options) || options.length < 2) {
      return res
        .status(400)
        .send({ message: "Options should be an array with at least 2 items" });
    }
    if (rightAnswer < 0 || rightAnswer >= options.length) {
      return res.status(400).send({
        message: "Right answer should be a valid index of the options array",
      });
    }
    const startMoment = moment(startDate);
    console.log(startMoment);
    const endMoment = moment(endDate);
    if (  !startMoment.isValid() ||!endMoment.isValid() ||endMoment.isBefore(startMoment)
    ) {
      return res.status(400).send({
        message:
          "Start date and end date should be valid and end date should be after start date",
      });
    }
    // Create a new quiz and save it to the database
    const quiz = await quizModel.create({
      question,
      options,
      rightAnswer,
      startDate: startMoment.toDate(),
      endDate: endMoment.toDate(),
    });
    // await quiz.save();
    return res.status(201).send({ message: "Quiz created successfully", quiz });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to create quiz" });
  }
};

//   // Define the route for retrieving the active quiz
const getQuiz = async (req, res) => {
  try {
    // Find the quiz that is currently within its start and end time
    const now = moment(); //.format('MM/DD/YYYY')
    const quiz = await quizModel.findOne(
      { startDate: { $lte: now.toDate() }, endDate: { $gte: now.toDate() } },
      { status: "active" }
    );
    if (!quiz) {
      return res.status(404).send({ message: "No active quiz found" });
    }
    return res.status(200).send({ message: "Active quiz found", quiz });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to retrieve active quiz" });
  }
};

//   // Define the route for retrieving the quiz result
const getQuizResultById = async (req, res) => {
  try {
    // Find the quiz by its ID and check if it is finished
    const quiz = await quizModel.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send({ message: "Quiz not found" });
    }
    if (quiz.status !== "finished") {
      return res
        .status(400)
        .send({ message: "Quiz result is not available yet" });
    }
    // Return the right answer for the quiz
    return res
      .status(200)
      .send({
        message: "Quiz result found",
        rightAnswer: quiz.options[quiz.rightAnswer],
      });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to retrieve quiz result" });
  }
};

//         // Define the route for retrieving all quizzes
const getAllQuiz = async (req, res) => {
  try {
    // Find all quizzes and return them
    const quizzes = await quizModel.find().select({__v: 0});
    return res.status(200).send({ message: "All quizzes retrieved", quizzes });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Failed to retrieve quizzes" });
  }
};

// // Define a cron job that updates the status of quizzes every minute

// Allowed fields
// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
// Allowed values
// field	value
// second	0-59
// minute	0-59
// hour	0-23
// day of month	1-31
// month	1-12 (or names)
// day of week	0-7 (or names, 0 or 7 are sunday)

 const quiz=cron.schedule("*/5 * * * *", async () => {
  try {
    // Find all quizzes and update their status based on the current time
    const now = moment();
    await quizModel.updateMany(
      { endDate: { $lt: now.toDate() }, status: { $ne: "finished" } },
      { status: "finished" }
    );
    
    await quizModel.updateMany(
      {
        startDate: { $lte: now.toDate() },
        endDate: { $gte: now.toDate() },
        status: { $ne: "active" },
      },
      { status: "active" }
    );
    await quizModel.updateMany(
      { startDate: { $gt: now.toDate() }, status: { $ne: "inactive" } },
      { status: "inactive" }
    );
    console.log(new Date().toLocaleString());
  } catch (error) {
    console.error(error);
  }
});
quiz.start()
module.exports = { createQuiz, getQuiz, getQuizResultById, getAllQuiz };
