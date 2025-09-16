import { useState, useEffect } from 'react';
import './App.css';

const DEFAULT_WATER_TARGET = 3000;
const CUP_ML = 500;
const BOTTLE_ML = 800;
const CUSTOM_OPTIONS = [
  { icon: '☕', label: '100ml', value: 100 },
  { icon: '🥤', label: '200ml', value: 200 },
  { icon: '🍶', label: '300ml', value: 300 },
  { icon: '🧃', label: '400ml', value: 400 },
  { icon: '🥛', label: '700ml', value: 700 },
  { icon: '🫙', label: '800ml', value: 800 },
];

function App() {
  const [intake, setIntake] = useState(0);
  const [showCongrats, setShowCongrats] = useState(false);
  const [waterTarget, setWaterTarget] = useState(DEFAULT_WATER_TARGET);
  const [editingTarget, setEditingTarget] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  // Carrega meta salva do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('waterTarget');
    if (saved) setWaterTarget(Number(saved));
  }, []);

  // Salva meta no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('waterTarget', waterTarget);
  }, [waterTarget]);

  const handleAdd = (amount) => {
    const newIntake = intake + amount;
    setIntake(newIntake);
    if (newIntake >= waterTarget) setShowCongrats(true);
    setShowCustom(false);
  };

  const percent = Math.min(100, Math.round((intake / waterTarget) * 100));

  return (
    <div className="app-dark-bg">
      <header className="header">
        <h1>Water Intake Tracker</h1>
      </header>
      <main>
        <h2>Today</h2>
        <div className="water-target-info">
          <span className="info-icon">i</span>
          Water Target: {editingTarget ? (
            <>
              <input
                type="number"
                min={100}
                max={10000}
                value={waterTarget}
                onChange={e => setWaterTarget(Number(e.target.value))}
                className="target-input"
                style={{ width: 70 }}
              /> ml
              <button className="save-btn" onClick={() => setEditingTarget(false)}>OK</button>
            </>
          ) : (
            <>
              {waterTarget} ml
              <button className="edit-btn" onClick={() => setEditingTarget(true)}>edit</button>
            </>
          )}
        </div>
        <div className="progress-circle">
          <svg width="220" height="220">
            <circle cx="110" cy="110" r="90" stroke="#222b3a" strokeWidth="20" fill="none" />
            <circle
              cx="110" cy="110" r="90"
              stroke="#2196f3"
              strokeWidth="20"
              fill="none"
              strokeDasharray={2 * Math.PI * 90}
              strokeDashoffset={2 * Math.PI * 90 * (1 - percent / 100)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s' }}
            />
          </svg>
          <div className="progress-center">
            <div className="progress-amount">{intake} ml</div>
            <div className="progress-percent">{percent} %</div>
          </div>
        </div>
        <div className="add-portion-label">+ Add a Portion of Water</div>
        <div className="portion-buttons">
          <button className="portion-btn" onClick={() => handleAdd(CUP_ML)}>
            <span role="img" aria-label="cup">🥤</span> CUP {CUP_ML}ml
          </button>
          <button className="portion-btn" onClick={() => handleAdd(BOTTLE_ML)}>
            <span role="img" aria-label="bottle">🫙</span> BOTTLE {BOTTLE_ML}ml
          </button>
          <button className="portion-btn special" onClick={() => setShowCustom(v => !v)}>
            <span role="img" aria-label="other">💧</span> SOMETHING ELSE
          </button>
        </div>
        {showCustom && (
          <div className="custom-popup" onClick={() => setShowCustom(false)}>
            <div className="custom-popup-inner" onClick={e => e.stopPropagation()}>
              <div className="custom-popup-title">Choose Amount</div>
              {CUSTOM_OPTIONS.map(opt => (
                <button key={opt.value} className="custom-option" onClick={() => { handleAdd(opt.value); setShowCustom(false); }}>
                  <span>{opt.icon}</span> {opt.label}
                </button>
              ))}
              <button className="close-popup" onClick={() => setShowCustom(false)}>Close</button>
            </div>
          </div>
        )}
        {showCongrats && (
          <div className="congrats-bar">
            Congrats, you reached your water intake goal! <button className="yay-btn">YAY!</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
