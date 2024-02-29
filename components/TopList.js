import { useEffect, useState } from 'react';

const TopList = () => {
    const [topScores, setTopScores] = useState([]);

    useEffect(() => {
        const savedScores = JSON.parse(localStorage.getItem('savedScores') || '[]');
        const sortedScores = savedScores.sort((a, b) => b.score - a.score);
        setTopScores(sortedScores);
    }, []);

    return (
        <div>
            <h2>Top List</h2>
            <ul>
                {topScores.map((score, index) => (
                    <li key={index}>{score.username}, {score.selectedGroup}, {score.score}</li>
                ))}
            </ul>
        </div>
    );
};

export default TopList;