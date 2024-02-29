import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Admin() {
    const router = useRouter();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']);
    const [correctOption, setCorrectOption] = useState('');
    const [group, setGroup] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('/api/questions');
            if (response.ok) {
                const data = await response.json();
                setQuestions(data);
            } else {
                console.error('Sorular alınamadı.');
            }
        } catch (error) {
            console.error('Sorular alınamadı:', error);
        }
    };

    const handleCreateQuestion = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, options, correctAnswer: correctOption, group })
        };
        try {
            const response = await fetch('/api/questions', requestOptions);
            if (response.ok) {
                // Yeni soru oluşturulduktan sonra admin panelinde kalmaya devam et
                setQuestion('');
                setOptions(['', '', '']);
                setCorrectOption('');
                setGroup('');
                fetchQuestions(); // Yeniden soruları yükle
            } else {
                alert('Soru oluşturulurken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Soru oluşturma hatası:', error);
        }
    };

    return (
        <div>
            <h1>Admin Paneli</h1>
            <input
                type="text"
                placeholder="Soru"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            {options.map((option, index) => (
                <input
                    key={index}
                    type="text"
                    placeholder={`Seçenek ${index + 1}`}
                    value={option}
                    onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[index] = e.target.value;
                        setOptions(newOptions);
                    }}
                />
            ))}
            <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
                <option value="">Doğru Seçeneği Seçin</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Soru Grubu"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
            />
            <button onClick={handleCreateQuestion}>Soru Oluştur</button>
            <ul>
                {questions.map(q => (
                    <li key={q.id}>{q.question}</li>
                ))}
            </ul>
            <button onClick={() => router.push('/')}>Ana Sayfaya Dön</button>
        </div>
    );
}
