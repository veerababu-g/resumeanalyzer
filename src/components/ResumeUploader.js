import React, { useState } from 'react';
import axios from 'axios';


export default function ResumeUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('resume', file);
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/resumes/upload', formData);
      onUploadSuccess(response.data);
    } catch (error) {
      alert('Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>{loading ? 'Uploading...' : 'Upload Resume'}</button>
    </div>
  );
}
