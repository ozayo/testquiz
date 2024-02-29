import { useRouter } from "next/router";

export default function Result() {
  const router = useRouter();
  const username = localStorage.getItem("username");
  const score = localStorage.getItem("score");
  const selectedGroup = localStorage.getItem("selectedGroup");

  const handleSaveScore = () => {
    const savedScores = JSON.parse(localStorage.getItem("savedScores") || "[]");
    savedScores.push({ username, selectedGroup, score });
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
    localStorage.removeItem("username");
    router.push("/");
  };

  if (!username) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <div>
        <h1>{username} Your Quiz Result</h1>
      </div>
      <div className=" bg-slate-100 rounded-lg p-6">
        <p>Username: {username}</p>
        <p className=" font-medium">Score: {score}</p>
        <button
          className="bg-purple-200 hover:bg-purple-500 px-4 h-12 mt-5"
          onClick={handleSaveScore}
        >
          Save my score
        </button>
      </div>
    </div>
  );
}
