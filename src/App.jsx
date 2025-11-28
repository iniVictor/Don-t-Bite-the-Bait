import React from 'react';
import Game from './components/Game';

function App() {
  return (
    <div className="app-container">
      <h1>Cyber Guardian</h1>
      <p style={{ textAlign: 'center', marginBottom: '20px', color: '#8b949e' }}>
        Is it Safe or a Threat? Decide quickly!
      </p>
      <Game />
    </div>
  );
}

export default App;
