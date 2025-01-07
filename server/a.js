const questions = [
    {
        "id": 2,
        "question_text": "What is your favorite programming language?",
        "question_type": "multiple_choice",
        "created_by": 1,
        "createdAt": "2024-11-25T04:48:42.000Z",
        "updatedAt": "2024-11-25T04:48:42.000Z",
        "SurveyQuestion": {
            "id": 4,
            "survey_id": 3,
            "question_id": 2
        },
        "Options": [
            {
                "id": 1,
                "question_id": 2,
                "option_text": "JavaScript",
                "createdAt": "2024-11-25T04:48:42.000Z",
                "updatedAt": "2024-11-25T04:48:42.000Z"
            },
            {
                "id": 2,
                "question_id": 2,
                "option_text": "Python",
                "createdAt": "2024-11-25T04:48:42.000Z",
                "updatedAt": "2024-11-25T04:48:42.000Z"
            },
            {
                "id": 3,
                "question_id": 2,
                "option_text": "Java",
                "createdAt": "2024-11-25T04:48:42.000Z",
                "updatedAt": "2024-11-25T04:48:42.000Z"
            },
            {
                "id": 4,
                "question_id": 2,
                "option_text": "C#",
                "createdAt": "2024-11-25T04:48:42.000Z",
                "updatedAt": "2024-11-25T04:48:42.000Z"
            }
        ]
    },
    {
        "id": 3,
        "question_text": "What is your favorite programming language?",
        "question_type": "multiple_choice",
        "created_by": 1,
        "createdAt": "2024-11-25T04:56:42.000Z",
        "updatedAt": "2024-11-25T04:56:42.000Z",
        "SurveyQuestion": {
            "id": 5,
            "survey_id": 3,
            "question_id": 3
        },
        "Options": [
            {
                "id": 5,
                "question_id": 3,
                "option_text": "JavaScript",
                "createdAt": "2024-11-25T04:56:42.000Z",
                "updatedAt": "2024-11-25T04:56:42.000Z"
            },
            {
                "id": 6,
                "question_id": 3,
                "option_text": "Python",
                "createdAt": "2024-11-25T04:56:42.000Z",
                "updatedAt": "2024-11-25T04:56:42.000Z"
            },
            {
                "id": 7,
                "question_id": 3,
                "option_text": "Java",
                "createdAt": "2024-11-25T04:56:42.000Z",
                "updatedAt": "2024-11-25T04:56:42.000Z"
            },
            {
                "id": 8,
                "question_id": 3,
                "option_text": "C#",
                "createdAt": "2024-11-25T04:56:42.000Z",
                "updatedAt": "2024-11-25T04:56:42.000Z"
            }
        ]
    },
    {
        "id": 5,
        "question_text": "What is your favorite programming language?",
        "question_type": "multiple_choice",
        "created_by": 1,
        "createdAt": "2024-11-25T04:56:45.000Z",
        "updatedAt": "2024-11-25T04:56:45.000Z",
        "SurveyQuestion": {
            "id": 6,
            "survey_id": 3,
            "question_id": 5
        },
        "Options": [
            {
                "id": 13,
                "question_id": 5,
                "option_text": "JavaScript",
                "createdAt": "2024-11-25T04:56:45.000Z",
                "updatedAt": "2024-11-25T04:56:45.000Z"
            },
            {
                "id": 14,
                "question_id": 5,
                "option_text": "Python",
                "createdAt": "2024-11-25T04:56:45.000Z",
                "updatedAt": "2024-11-25T04:56:45.000Z"
            },
            {
                "id": 15,
                "question_id": 5,
                "option_text": "Java",
                "createdAt": "2024-11-25T04:56:45.000Z",
                "updatedAt": "2024-11-25T04:56:45.000Z"
            },
            {
                "id": 16,
                "question_id": 5,
                "option_text": "C#",
                "createdAt": "2024-11-25T04:56:45.000Z",
                "updatedAt": "2024-11-25T04:56:45.000Z"
            }
        ]
    }
];

// Extracting the question ids
const questionIds = questions[0].Options.map(option => option.id);
console.log(questionIds);
