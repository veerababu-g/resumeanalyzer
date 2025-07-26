
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ResumeDetails({ resumeId, data, onClose }) {
  const [resume, setResume] = useState(data || null);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!data && resumeId) {
      setLoading(true);
      setError("");
      axios.get(`/api/resumes/${resumeId}`)
        .then(res => setResume(res.data))
        .catch(() => setError("Failed to load resume details."))
        .finally(() => setLoading(false));
    }
  }, [resumeId, data]);

  if (loading) return <p>Loading resume details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!resume) return <p>No resume data available.</p>;

  return (
    <div>
      {onClose && <button onClick={onClose} className="close-btn">&times; Close</button>}

      <h2>{resume.name || "Unnamed Candidate"}</h2>
      <p><strong>Email:</strong> {resume.email || "-"}</p>
      <p><strong>Phone:</strong> {resume.phone || "-"}</p>
      <p><strong>LinkedIn:</strong> <a href={resume.linkedin_url} target="_blank" rel="noreferrer">{resume.linkedin_url || "-"}</a></p>

      <h3>Summary</h3>
      <p>{resume.summary || "No summary available."}</p>

      <h3>Technical Skills</h3>
      {resume.technical_skills && resume.technical_skills.length > 0 ? (
        <ul>{resume.technical_skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul>
      ) : <p>No technical skills listed.</p>}

      <h3>Work Experience</h3>
      {resume.work_experience && resume.work_experience.length > 0 ? (
        resume.work_experience.map((exp, i) => (
          <div key={i}>
            <p><strong>{exp.role}</strong> at <strong>{exp.company}</strong> ({exp.duration})</p>
            <ul>{exp.description?.map((desc, idx) => <li key={idx}>{desc}</li>)}</ul>
          </div>
        ))
      ) : <p>No work experience listed.</p>}

      <h3>Education</h3>
      {resume.education && resume.education.length > 0 ? (
        resume.education.map((edu, i) => (
          <p key={i}>{edu.degree} from {edu.institution} ({edu.graduation_year})</p>
        ))
      ) : <p>No education information available.</p>}

      <h3>Resume Rating</h3>
      <p>{resume.resume_rating ?? "N/A"}/10</p>

      <h3>Areas for Improvement</h3>
      <p>{resume.improvement_areas || "None specified."}</p>

      <h3>Upskill Suggestions</h3>
      {resume.upskill_suggestions && resume.upskill_suggestions.length > 0 ? (
        <ul>{resume.upskill_suggestions.map((item, i) => <li key={i}>{item}</li>)}</ul>
      ) : <p>No suggestions.</p>}
    </div>
  );
}

export default ResumeDetails;