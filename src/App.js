import { useState } from 'react';
import './App.css';

function App() {
  const [certificate, setCertificate] = useState('');
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (certificate) {
      setStarted(true);
    } else {
      alert('Please select a certificate type.');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      {!started ? (
        <>
          <h1>🛫 Welcome to DPESIM</h1>
          <p>
            Get ready for your FAA oral exam with a realistic AI-powered mock session. Choose your certificate type and start the simulation.
          </p>

          <label htmlFor="certificate">Select certificate type:</label>
          <br />
          <select
            id="certificate"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
            style={{ padding: '0.5rem', marginTop: '0.5rem' }}
          >
            <option value="">-- Choose --</option>
            <option value="sport">Sport Pilot</option>
            <option value="private">Private Pilot</option>
            <option value="commercial">Commercial Pilot</option>
          </select>
          <br />
          <button
            onClick={handleStart}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Start Simulation
          </button>
        </>
      ) : (
        <>
          <h2>Simulated Oral Exam: {certificate.toUpperCase()} Certificate</h2>
          <p>(The chat interface will appear here in the next step)</p>
        </>
      )}
    </div>
  );
}

export default App;
