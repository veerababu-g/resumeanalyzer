import React, { useState } from 'react';
import './App.css';
import ResumeUploader from './components/ResumeUploader';
import PastResumesTable from './components/PastResumesTable';
import ResumeDetails from './components/ResumeDetails';

function App() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [currentResume, setCurrentResume] = useState(null);

  return (
    <div className="app-container">
      <div className="tabs">
        <button
          className={`tab${activeTab === 'analyze' ? ' active' : ''}`}
          onClick={() => setActiveTab('analyze')}
        >Resume Analysis</button>
        <button
          className={`tab${activeTab === 'history' ? ' active' : ''}`}
          onClick={() => setActiveTab('history')}
        >Historical Viewer</button>
      </div>
      {activeTab === 'analyze' && (
        <div className="upload-section">
          <ResumeUploader onAnalysis={setCurrentResume} />
          {currentResume && <ResumeDetails data={currentResume} />}
        </div>
      )}
      {activeTab === 'history' && (
        <PastResumesTable onViewDetails={id => setCurrentResume({ id })} />
      )}
      {/* Modal for history details */}
      {currentResume && currentResume.id && (
        <div className="modal-backdrop" onClick={()=>setCurrentResume(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={()=>setCurrentResume(null)}>&times; Close</button>
            <ResumeDetails resumeId={currentResume.id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;