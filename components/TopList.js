import { useEffect, useState } from "react";

const TopList = () => {
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("savedScores") || "[]");
    const sortedScores = savedScores.sort((a, b) => b.score - a.score);
    setTopScores(sortedScores);
  }, []);

  return (
    <div>
      <h2 className=" font-bold text-xl mb-3">Top List</h2>
      <div className=" rounded-md bg-green-200 p-3">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Username</th>
              <th>Group</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {topScores.map((score, index) => (
              <tr key={index} className=" border-b-2 border-green-300 p-1 mb-2">
                <td>{score.username}</td>
                <td>{score.selectedGroup}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopList;
