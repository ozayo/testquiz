import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const username = localStorage.getItem("username");
  const selectedGroup = localStorage.getItem("selectedGroup");
  const [questions, setQuestions] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/questions?group=${selectedGroup}`);
      const data = await res.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleAnswer = (selectedAnswer) => {
    const currentCorrectAnswer = questions[currentQuestion].correctAnswer;
    const isCorrect = selectedAnswer === currentCorrectAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 10); //Increase score for correct answer
    }
    setAnswers([
      ...answers,
      { questionId: currentQuestion + 1, selectedAnswer, isCorrect },
    ]);
    if (currentQuestion === questions.length - 1) {
      localStorage.setItem("score", score + (isCorrect ? 10 : 0)); // Increase score for correct answer
      router.push("/result");
    } else {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }
  };

  useEffect(() => {
    if (!username || !selectedGroup) {
      router.push("/");
    } else {
      fetchData();
    }
  }, []);

  return (
    <div>
      <h1>Chas Quiz Test - Quiz</h1>
      <h2>Question Group: {selectedGroup}</h2>
      <div>
        <p>Username: {username}</p>
        <p>Score: {score}</p>
        <p>Question: {currentQuestion + 1}:</p>
      </div>
      <div>
        <p className="font-semibold text-2xl my-4">
          {questions[currentQuestion]?.question}
        </p>
        {questions[currentQuestion]?.options.map((option, index) => (
          <button
            className="bg-slate-200 hover:bg-slate-300 mr-1 p-2"
            key={index}
            onClick={() => handleAnswer(option.label)}
          >
            {option.label} - {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
