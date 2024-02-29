// /api/questions.js

let questions = [
  { id: 1, question: 'Question one?', options: ['A', 'B', 'C'], correctAnswer: 'A', group: 'group1' },
  { id: 2, question: 'Question two?', options: ['A', 'B', 'C'], correctAnswer: 'A', group: 'group1' },
  { id: 3, question: 'Second group question one?', options: ['A', 'B', 'C'], correctAnswer: 'C', group: 'group2' },
  { id: 4, question: 'Second group question two?', options: ['A', 'B', 'C'], correctAnswer: 'A', group: 'group2' },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
      res.status(200).json(questions);
  } else if (req.method === 'POST') {
      const { question, options, correctAnswer, group } = req.body;
      const newQuestion = {
          id: questions.length + 1,
          question,
          options,
          correctAnswer,
          group
      };
      questions.push(newQuestion);
      res.status(201).json({ message: 'Soru oluşturuldu.' });
  } else if (req.method === 'PUT') {
      const { id, question, options, correctAnswer, group } = req.body;
      const index = questions.findIndex(q => q.id === id);
      if (index !== -1) {
          questions[index] = { id, question, options, correctAnswer, group };
          res.status(200).json({ message: 'Soru güncellendi.' });
      } else {
          res.status(404).json({ message: 'Soru bulunamadı.' });
      }
  } else if (req.method === 'DELETE') {
      const { id } = req.body;
      const index = questions.findIndex(q => q.id === id);
      if (index !== -1) {
          questions.splice(index, 1);
          res.status(200).json({ message: 'Soru silindi.' });
      } else {
          res.status(404).json({ message: 'Soru bulunamadı.' });
      }
  }
}
