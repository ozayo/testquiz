import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Quiz() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const username = localStorage.getItem('username');
    const selectedGroup = localStorage.getItem('selectedGroup');
    const [questions, setQuestions] = useState([]);

    const fetchData = async () => {
        try {
            const res = await fetch(`/api/questions?group=${selectedGroup}`);
            const data = await res.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleAnswer = (selectedAnswer) => {
        const currentCorrectAnswer = questions[currentQuestion].correctAnswer;
        const isCorrect = selectedAnswer === currentCorrectAnswer;
        if (isCorrect) {
            setScore((prevScore) => prevScore + 10); // Doğru cevap için puanı artır
        }
        setAnswers([...answers, { questionId: currentQuestion + 1, selectedAnswer, isCorrect }]);
        if (currentQuestion === questions.length - 1) {
            localStorage.setItem('score', score + (isCorrect ? 10 : 0)); // Doğru cevap verildiyse puanı artır
            router.push('/result');
        } else {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        }
    };

    useEffect(() => {
        if (!username || !selectedGroup) {
            router.push('/');
        } else {
            fetchData();
        }
    }, []);

    return (
        <div>
            <h1>Quiz Uygulaması - Soru Grubu {selectedGroup}</h1>
            <p>Kullanıcı: {username}</p>
            <p>Puan: {score}</p>
            <p>Soru {currentQuestion + 1}:</p>
            <p>{questions[currentQuestion]?.question}</p>
            {questions[currentQuestion]?.options.map((option, index) => (
                <button key={index} onClick={() => handleAnswer(option)}>
                    {option}
                </button>
            ))}
        </div>
    );
}
