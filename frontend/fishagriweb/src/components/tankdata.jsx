import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddingFish from './addfish';

const TankData = ({ tank, onBack, onUpdateFish }) => {
  const [isAddingFormVisible, setAddingFormVisible] = useState(false);
  const [tanks, setTanks] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null); // Initially no fish selected
  const [showAddFishForm, setShowAddFishForm] = useState(false); // Toggle for fish form
  const [newFish, setNewFish] = useState({ name: '', ph: '-', tur: '-', temp: '-' });

  const closeForm = () => {
      setAddingFormVisible(false);
  };

  const handleAddFishClick = () => {
    setAddingFormVisible(true);
  };

  const handleFishClick = (fish) => {
    setSelectedFish(fish);
  };

  const handleAddFish = () => {
    setShowAddFishForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFish((prevFish) => ({
      ...prevFish,
      [name]: value,
    }));
  };

  const handleUpdateFish = () => {
    if (newFish.name) {
      onUpdateFish(newFish); // Call the function to update tank data with new fish
      setShowAddFishForm(false); // Close the form after submission
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '50px' }}>
          {selectedFish ? (
            <img src={selectedFish.url || require('../images/fish-tank.png')} alt={selectedFish.name} style={{ width: '480px', borderRadius: '8px' }} />
          ) : (
            <img src={require('../images/fish-tank.png')} alt="Fish Tank" style={{ width: '480px', borderRadius: '8px' }} />
          )}
        </div>
        <div className='seper' style={{ width: '500px', height: '5px' }}></div>

        {tank.fishimage.length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', justifyContent: 'center' }}>
            {tank.fishimage.map((fish, index) => (
              <div key={index} style={{ margin: '5px', cursor: 'pointer' }} onClick={() => handleFishClick(fish)}>
                <img src={fish.url || require('../images/fish-tank.png')} alt={fish.name} style={{ width: '100px', borderRadius: '8px' }} />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>No fish available</p>
        )}
        <div className='seper' style={{ width: '500px', height: '5px' }}></div>
      </div>

      <div style={{ marginLeft: '50px', marginTop: '50px' }}>
        <div style={{ display: 'flex', fontWeight: 'bold', marginBottom: '50px' }}>
          <p style={{ color: '#46a2f5' }}>Fish Name: </p>
          <p style={{ marginLeft: '10px' }}>{selectedFish ? selectedFish.name : 'N/A'}</p>
        </div>
        <div className='seper' style={{ width: '500px', height: '3px' }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
          <div style={{ display: 'flex', fontWeight: 'bold' }}>
            <p style={{ color: '#46a2f5' }}>pH: </p>
            <p style={{ marginLeft: '10px' }}>{selectedFish ? selectedFish.ph : '-'}</p>
          </div>
          <div style={{ display: 'flex', fontWeight: 'bold' }}>
            <p style={{ color: '#46a2f5' }}>Turbidity: </p>
            <p style={{ marginLeft: '10px' }}>{selectedFish ? selectedFish.tur : '-'}</p>
          </div>
          <div style={{ display: 'flex', fontWeight: 'bold' }}>
            <p style={{ color: '#46a2f5' }}>Temperature: </p>
            <p style={{ marginLeft: '10px' }}>{selectedFish ? selectedFish.temp : '-'}</p>
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: '80px' }}>
          <button
            onClick={handleAddFishClick}
            style={{ textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', marginRight: '20px' }}
            className='addtank'
          >
            Add Fish
          </button>
          <button
            onClick={onBack}
            style={{ textDecoration: 'none', textAlign: 'center', fontWeight: 'bold' }}
            className='addtank'
          >
            Back
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default TankData;
