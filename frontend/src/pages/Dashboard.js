import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get("/interview/result").then(res => setResult(res.data));
  }, []);

  if (!result) return <p className="p-6">Loading...</p>;

  const total =
    result.scores.technical +
    result.scores.clarity +
    result.scores.relevance;

  const recommendation =
    total >= 22 ? "Selected" : total >= 16 ? "Maybe" : "Reject";

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">HR Dashboard</h2>

      <p><b>Candidate:</b> {result.candidateName}</p>
      <p><b>Skill Match:</b> {result.skillMatch}%</p>

      <div className="mt-3">
        <p>Technical: {result.scores.technical}</p>
        <p>Communication: {result.scores.clarity}</p>
        <p>Relevance: {result.scores.relevance}</p>
      </div>

      <h3 className="mt-4 font-bold">
        Recommendation: {recommendation}
      </h3>
    </div>
  );
}
