import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Interview() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const start = async () => {
      const res = await api.post("/interview/start", {
        candidateId: localStorage.getItem("candidateId"),
        jdText: "JD"
      });
      setQuestions(res.data.questions);
      localStorage.setItem("interviewId", res.data._id);
    };
    start();
  }, []);

  const next = () => {
    setAnswers([...answers, answer]);
    setAnswer("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      submit();
    }
  };

  const submit = async () => {
    await api.post("/interview/submit", {
      interviewId: localStorage.getItem("interviewId"),
      answers
    });
    navigate("/dashboard");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h3 className="font-bold mb-2">
        Question {current + 1}
      </h3>

      <p className="mb-3">{questions[current]}</p>

      <textarea
        className="border p-2 w-full mb-3"
        rows="4"
        value={answer}
        onChange={e => setAnswer(e.target.value)}
      />

      <button
        onClick={next}
        className="bg-blue-600 text-white p-2 w-full rounded"
      >
        Next
      </button>
    </div>
  );
}
