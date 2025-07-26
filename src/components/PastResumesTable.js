import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PastResumesTable({ onViewDetails }) {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchResumes() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get('/api/resumes');
        setResumes(res.data);
      } catch {
        setError("Failed to load past resumes.");
      } finally {
        setLoading(false);
      }
    }
    fetchResumes();
  }, []);

  if (loading) return <p>Loading historical resumes...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!resumes.length) return <p>No resumes found.</p>;

  return (
    <table className="resume-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Uploaded</th>
          <th>Rating</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {resumes.map(r => (
          <tr key={r.id}>
            <td>{r.name || '-'}</td>
            <td>{r.email || '-'}</td>
            <td>{new Date(r.uploaded_at).toLocaleString()}</td>
            <td>{r.resume_rating ?? '-'}</td>
            <td>
              <button onClick={() => onViewDetails(r.id)}>Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PastResumesTable;