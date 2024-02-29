import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TopList from "../components/TopList";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  useEffect(() => {
    // Clear previous user data on page load
    localStorage.removeItem("username");
    localStorage.removeItem("selectedGroup");
  }, []);

  const handleStartQuiz = () => {
    if (username && selectedGroup) {
      localStorage.setItem("username", username);
      localStorage.setItem("selectedGroup", selectedGroup);
      router.push("/quiz");
    } else {
      alert("Please select your username and question group.");
    }
  };

  return (
    <div>
      <h1>Chas Quiz Test</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="leftside basis-4/6 my-7 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            className=" border-2 h-12 px-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <select
            className="border-2 w-40 h-12"
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
          >
            <option value="">Select Question Group</option>
            <option value="Basic Knowledge">Basic Knowledge</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Natural Sciences">Natural Sciences</option>
          </select>
          <button
            className=" bg-purple-200 hover:bg-purple-500 px-4 h-12"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        </div>
        <div className="rightside basis-2/6">
          <TopList />
        </div>
      </div>
    </div>
  );
}
