import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddingFish({ onAddFish }) {
  const [fishName, setFishName] = useState('');

  const handleInputChange = (e) => {
    setFishName(e.target.value);
  };

  const handleDoneClick = () => {
    onAddFish(fishName);
  };

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'start', 
        backgroundColor: 'white'
    }}>
      <h1 style={{ color: '#46a2f5', fontWeight: 'normal' }}>Adding a Fish to Tank</h1>
      <input 
        type="text" 
        placeholder="  Fish Name" 
        className='inputname' 
        style={{ marginTop: '10px' }} 
        value={fishName} 
        onChange={handleInputChange} 
      />
      
      <Link 
        to="/discover" 
        className="addtank" 
        style={{ 
          textDecoration: 'none', 
          textAlign: 'center', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginTop: '8px', 
          width: '180px' 
        }}
        onClick={handleDoneClick}
      >
        <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '12px' }}>Done</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" style={{ width: '20px', height: '20px' }}>
          <path fill='white' d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </Link>
    </div>
  );
}
