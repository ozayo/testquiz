// /api/questions.js

let questions = [
  // category Basic Knowledge
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { label: "A", text: "Paris" },
      { label: "B", text: "Berlin" },
      { label: "C", text: "London" },
    ],
    correctAnswer: "A",
    group: "Basic Knowledge",
  },
  {
    id: 2,
    question: "How many continents are there?",
    options: [
      { label: "A", text: "5" },
      { label: "B", text: "6" },
      { label: "C", text: "7" },
    ],
    correctAnswer: "C",
    group: "Basic Knowledge",
  },
  {
    id: 3,
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      { label: "A", text: "William Shakespeare" },
      { label: "B", text: "Charles Dickens" },
      { label: "C", text: "Jane Austen" },
    ],
    correctAnswer: "A",
    group: "Basic Knowledge",
  },
  {
    id: 4,
    question: "What is the chemical symbol for water?",
    options: [
      { label: "A", text: "H2O" },
      { label: "B", text: "CO2" },
      { label: "C", text: "O2" },
    ],
    correctAnswer: "A",
    group: "Basic Knowledge",
  },
  {
    id: 5,
    question: "Who discovered gravity?",
    options: [
      { label: "A", text: "Isaac Newton" },
      { label: "B", text: "Albert Einstein" },
      { label: "C", text: "Galileo Galilei" },
    ],
    correctAnswer: "A",
    group: "Basic Knowledge",
  },

  // category Computer Science
  {
    id: 6,
    question: "What does CPU stand for?",
    options: [
      { label: "A", text: "Central Processing Unit" },
      { label: "B", text: "Computer Personal Unit" },
      { label: "C", text: "Central Personal Unit" },
    ],
    correctAnswer: "A",
    group: "Computer Science",
  },
  {
    id: 7,
    question: "What language is used to style web pages?",
    options: [
      { label: "A", text: "HTML" },
      { label: "B", text: "CSS" },
      { label: "C", text: "JavaScript" },
    ],
    correctAnswer: "B",
    group: "Computer Science",
  },
  {
    id: 8,
    question:
      "What is the process of finding errors and fixing them within a program called?",
    options: [
      { label: "A", text: "Debugging" },
      { label: "B", text: "Testing" },
      { label: "C", text: "Compiling" },
    ],
    correctAnswer: "A",
    group: "Computer Science",
  },
  {
    id: 9,
    question: "Which company created the JavaScript programming language?",
    options: [
      { label: "A", text: "Netscape" },
      { label: "B", text: "Microsoft" },
      { label: "C", text: "Apple" },
    ],
    correctAnswer: "A",
    group: "Computer Science",
  },
  {
    id: 10,
    question: "What does HTML stand for?",
    options: [
      { label: "A", text: "Hyper Text Markup Language" },
      { label: "B", text: "Hyperlinks and Text Markup Language" },
      { label: "C", text: "Home Tool Markup Language" },
    ],
    correctAnswer: "A",
    group: "Computer Science",
  },

  // category Natural Sciences
  {
    id: 11,
    question: "What is the largest planet in our solar system?",
    options: [
      { label: "A", text: "Jupiter" },
      { label: "B", text: "Saturn" },
      { label: "C", text: "Earth" },
    ],
    correctAnswer: "A",
    group: "Natural Sciences",
  },
  {
    id: 12,
    question: "What is the hardest natural substance on Earth?",
    options: [
      { label: "A", text: "Diamond" },
      { label: "B", text: "Steel" },
      { label: "C", text: "Titanium" },
    ],
    correctAnswer: "A",
    group: "Natural Sciences",
  },
  {
    id: 13,
    question: "What gas do plants absorb during photosynthesis?",
    options: [
      { label: "A", text: "Carbon Dioxide" },
      { label: "B", text: "Oxygen" },
      { label: "C", text: "Nitrogen" },
    ],
    correctAnswer: "A",
    group: "Natural Sciences",
  },
  {
    id: 14,
    question: "What is the process of a liquid turning into vapor called?",
    options: [
      { label: "A", text: "Evaporation" },
      { label: "B", text: "Condensation" },
      { label: "C", text: "Sublimation" },
    ],
    correctAnswer: "A",
    group: "Natural Sciences",
  },
  {
    id: 15,
    question: "What is the study of earthquakes called?",
    options: [
      { label: "A", text: "Seismology" },
      { label: "B", text: "Volcanology" },
      { label: "C", text: "Meteorology" },
    ],
    correctAnswer: "A",
    group: "Natural Sciences",
  },
];

export default function handler(req, res) {
  const { group } = req.query;
  let filteredQuestions = questions;
  if (group) {
    filteredQuestions = questions.filter((q) => q.group === group);
  }

  if (req.method === "GET") {
    res.status(200).json(filteredQuestions);
  } else if (req.method === "POST") {
    const { question, options, correctAnswer, group } = req.body;
    const newQuestion = {
      id: questions.length + 1,
      question,
      options,
      correctAnswer,
      group,
    };
    questions.push(newQuestion);
    res.status(201).json({ message: "Question created" });
  } else if (req.method === "PUT") {
    const { id, question, options, correctAnswer, group } = req.body;
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) {
      questions[index] = { id, question, options, correctAnswer, group };
      res.status(200).json({ message: "Question updated." });
    } else {
      res.status(404).json({ message: "Question not found." });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    const index = questions.findIndex((q) => q.id === id);
    if (index !== -1) {
      questions.splice(index, 1);
      res.status(200).json({ message: "Question deleted." });
    } else {
      res.status(404).json({ message: "Question not found." });
    }
  }
}
