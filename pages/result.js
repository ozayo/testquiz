import { useRouter } from 'next/router';

export default function Result() {
    const router = useRouter();
    const username = localStorage.getItem('username');
    const score = localStorage.getItem('score');
    const selectedGroup = localStorage.getItem('selectedGroup');

    const handleSaveScore = () => {
        const savedScores = JSON.parse(localStorage.getItem('savedScores') || '[]');
        savedScores.push({ username, selectedGroup, score });
        localStorage.setItem('savedScores', JSON.stringify(savedScores));
        localStorage.removeItem('username');
        router.push('/');
    };

    if (!username) {
        router.push('/');
        return null;
    }

    return (
        <div>
            <h1>Quiz Sonucu</h1>
            <p>Kullanıcı: {username}</p>
            <p>Puan: {score}</p>
            <button onClick={handleSaveScore}>Save my score</button>
        </div>
    );
}
