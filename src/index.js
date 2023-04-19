const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/route");
const moment = require('moment');
//const mongoose = require('mongoose');
const cron = require('node-cron');
const PORT = process.env.PORT || 3000;

require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", route);
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })

  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

//   cron.schedule('*/10 * * * *', async () => {
//     try {
//     // Find all quizzes and update their status based on the current time
//     const now = moment();
//     await quizModel.updateMany({ endDate: { $lt: now.toDate() }, status: { $ne: 'finished' } }, { status: 'finished' });
//     await quizModel.updateMany({ startDate: { $lte: now.toDate() }, endDate: { $gte: now.toDate() }, status: { $ne: 'active' } }, { status: 'active' });
//     await quizModel.updateMany({ startDate: { $gt: now.toDate() }, status: { $ne: 'inactive' } }, { status: 'inactive' });
//     console.log(new Date().toLocaleString());
//     } catch (error) {
//     console.error(error);
//     }
//     });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
