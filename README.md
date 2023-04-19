## Node.js Quiz Application

. This is a Node.js application that allows users to create and participate in timed quizzes. The application provides  a RESTful API for creating and retrieving quizzes. The application uses MongoDB for storing quiz data and the API is implemented using the Express.js framework.

   ## Installation

    Clone the repository: git remote add origin https://github.com/satyaveer1994/quiz-app.git
    Install dependencies: npm install
    

    

    Start the application: nodemon src/index.js

1. The server will be running at http://localhost:3000


## API Endpoints




     QuizSchema:



    question: the text of the question
    options: an array of the answer options for the question
    rightAnswer: the index of the correct answer in the options array
    startDate: the date and time when the quiz should start
    endDate: the date and time when the quiz should end
# Create a Quiz

Users can create a quiz by sending a POST request to the /quizzes endpoint with the following fields:

    question: the text of the question
    options: an array of the answer options for the question
    rightAnswer: the index of the correct answer in the options array
    startDate: the date and time when the quiz should start
    endDate: the date and time when the quiz should end


    POST /quizzes

    Example request body:

    {
     "question": "What is the capital of France?",
     "options": ["New York", "Paris", "London", "Tokyo"],
     "rightAnswer": 1,
     "startDate": "2023-04-20T08:00:00.000Z",
     "endDate": "2023-04-20T09:00:00.000Z"
    }

    Retrieve the Active Quiz

Users can retrieve the active quiz (the quiz that is currently within its start and end time) by sending a GET request to the /quizzes/active endpoint.
    
    GET /quizzes/active

    Example response body:

    {
    "message": "Active quiz found",
    "quiz": {
        "_id": "643fc761e4aa1545795b33d5",
        "status": "active"
    }
    }

    Retrieve Quiz Result

. After 5 minutes from the end time of a quiz, users can retrieve the result of the quiz by sending a GET request   to the /quizzes/:id/result endpoint, where :id is the ID of the quiz.

    GET /quizzes/:id/result 


    Example response body:


    {
     "id": "615c5b5e5bbf9a68cf864d98",
     "question": "What is the capital of France?",
     "options": ["New York", "Paris", "London", "Tokyo"],
     "rightAnswer": 1,
     "status": "finished",
     "startDate": "2023-04-20T08:00:00.000Z",
     "endDate": "2023-04-20T09:00:00.000Z"
    }


    Retrieve All Quizzes

. Users can retrieve all quizzes by sending a GET request to the /quizzes/all endpoint.


    GET /quizzes/all

    
     {
     "message": "All quizzes retrieved",
    "quizzes": [
     {
            "_id": "643fd1e441440876d1ff0c4e",
            "question": "What is the capital of France?",
            "options": [
                "New York",
                "Paris",
                "London",
                "Tokyo"
            ],
            "rightAnswer": 1,
            "startDate": "2023-05-01T00:00:00.000Z",
            "endDate": "2023-05-05T00:00:00.000Z",
            "status": "active",
            "__v": 0
        }
    ]
    }

