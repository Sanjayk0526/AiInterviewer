import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [name, setName] = useState("");
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("resume", resume);
    formData.append("jdText", jd);

    const res = await api.post("/upload", formData);
    localStorage.setItem("candidateId", res.data._id);
    navigate("/interview");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Resume & JD</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Candidate Name"
        onChange={e => setName(e.target.value)}
      />

      <input
        type="file"
        className="mb-3"
        onChange={e => setResume(e.target.files[0])}
      />

      <textarea
        className="border p-2 w-full mb-3"
        rows="5"
        placeholder="Paste Job Description"
        onChange={e => setJd(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-green-600 text-white p-2 w-full rounded"
      >
        Start Interview
      </button>
    </div>
  );
}
