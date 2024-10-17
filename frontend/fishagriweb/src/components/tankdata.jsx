import React, { useState, useEffect } from 'react';
import AddingFish from './addfish';

const TankData = ({ tank, onBack }) => {
  const [isAddingFormVisible, setAddingFormVisible] = useState(false);
  const [selectedFish, setSelectedFish] = useState(null);
  const [fishImages, setFishImages] = useState([]);
  const [tankData, setTankData] = useState({
    Ph: tank.Ph || '-', // Initialize with tank values
    turbidity: tank.turbidity || '-',
    temp: tank.temp || '-',
  });

  useEffect(() => {
    const fetchTankData = async () => {
      try {
        const response = await fetch(`http://localhost:3004/tanks/${tank.tank_no}`);
        const data = await response.json();
        setTankData(data);

        if (data.fishdata && data.fishdata.length > 0) {
          setSelectedFish(data.fishdata[0]);
          const images = [
            data.fishdata[0].fish_image1,
            data.fishdata[0].fish_image2,
            data.fishdata[0].fish_image3,
            data.fishdata[0].fish_image4,
          ].filter(image => image);
          setFishImages(images);
        }
      } catch (error) {
        console.error('Error fetching tank data:', error);
      }
    };

    fetchTankData();
  }, [tank.tank_no]);

  const closeForm = () => {
    setAddingFormVisible(false);
  };

  const handleAddFishClick = () => {
    setAddingFormVisible(true);
  };

  const handleAddFish = async (fishName) => {
    if (fishName) {
      const newFish = { fish_name: fishName, tank_no: tank.tank_no };
      setSelectedFish(newFish);
      setFishImages([...fishImages, require('../images/fish-tank.png')]);

      try {
        const response = await fetch(`http://localhost:3004/addfish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newFish),
        });
        if (!response.ok) throw new Error('Failed to add fish');
        setAddingFormVisible(false);
      } catch (error) {
        console.error('Error adding fish:', error);
      }
    }
  };

  const handleReset = async () => {
    setSelectedFish(null);
    setFishImages([]);

    const resetValues = {
      Ph: '-', // Reset pH to '-'
      turbidity: '-', // Reset turbidity to '-'
      temp: '-', // Reset temperature to '-'
    };

    try {
      const response = await fetch(`http://localhost:3004/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tank_no: tank.tank_no }), // Pass the tank_no to the API
      });

      if (!response.ok) throw new Error('Failed to reset tank data');

      setTankData(resetValues); // Set tank data to reset values
    } catch (error) {
      console.error('Error resetting tank data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      // Post updated tank data to the API with the tank's id
      const response = await fetch(`http://localhost:3004/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: tank.id, ...tankData }), // Pass the id and tankData in the request body
      });

      if (!response.ok) throw new Error('Failed to update tank data');

      // Fetch the updated tank data from the tanks API
      const fetchResponse = await fetch(`http://localhost:3004/tanks/${tank.tank_no}`);
      if (!fetchResponse.ok) throw new Error('Failed to fetch updated tank data');

      const updatedData = await fetchResponse.json();
      setTankData(updatedData); // Update the tank data state with the new values
    } catch (error) {
      console.error('Error updating tank data:', error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <div style={{ textAlign: 'center', marginTop: '15px', marginBottom: '50px' }}>
            {selectedFish ? (
              <img src={fishImages[0]} alt={selectedFish.fish_name} style={{ width: '400px', borderRadius: '8px', height: '350px' }} />
            ) : (
              <img src={require('../images/fish-tank.png')} alt="Fish Tank" style={{ width: '400px', borderRadius: '8px', height: '350px' }} />
            )}
          </div>
          <div className='seper' style={{ width: '450px', height: '5px' }}></div>

          {fishImages.length > 0 ? (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px', justifyContent: 'center' }}>
              {fishImages.map((url, index) => (
                <div key={index} style={{ margin: '5px', cursor: 'pointer' }}>
                  <img src={url} alt={`Fish ${index + 1}`} style={{ width: '100px', borderRadius: '8px' }} />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '20px' }}>No fish added yet</p>
          )}

          <div className='seper' style={{ width: '450px', height: '5px' }}></div>
        </div>

        <div style={{ marginTop: '50px' }}>
          <div style={{ display: 'flex', fontWeight: 'bold', marginBottom: '15px' }}>
            <h4 style={{ color: '#46a2f5' }}>Tank No. : </h4>
            <h4 style={{ marginLeft: '10px' }}> {tank.tank_no}</h4>
          </div>
          <div style={{ display: 'flex', fontWeight: 'bold', marginBottom: '10px' }}>
            <p style={{ color: '#46a2f5' }}>Fish Name: </p>
            <p style={{ marginLeft: '10px' }}>{selectedFish ? selectedFish.fish_name : 'N/A'}</p>
          </div>
          <div className='seper' style={{ width: '450px', height: '3px', marginBottom: '20px' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <div style={{ display: 'flex', fontWeight: 'bold' }}>
              <p style={{ color: '#46a2f5' }}>pH: </p>
              <p style={{ marginLeft: '10px' }}>
                <b>{tankData.Ph}</b>
              </p>
            </div>
            <div style={{ display: 'flex', fontWeight: 'bold' }}>
              <p style={{ color: '#46a2f5' }}>Turbidity: </p>
              <p style={{ marginLeft: '10px' }}>
                <b>{tankData.turbidity}</b>
              </p>
            </div>
            <div style={{ display: 'flex', fontWeight: 'bold' }}>
              <p style={{ color: '#46a2f5' }}>Temperature: </p>
              <p style={{ marginLeft: '10px' }}>
                <b>{tankData.temp}</b>
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '30px' }}>
            <button
              onClick={onBack}
              style={{ textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', width: '130px', marginRight: '10px' }}
              className='addtank'
            >
              Back
            </button>
            <button
              onClick={handleAddFishClick}
              style={{ textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', width: '130px', marginRight: '10px' }}
              className='addtank'
            >
              Add Fish
            </button>
            <button
              onClick={handleReset}
              style={{ textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', width: '130px', marginRight: '10px' }}
              className='addtank'
            >
              Reset
            </button>
            <button
              onClick={handleUpdate}
              style={{ textDecoration: 'none', textAlign: 'center', fontWeight: 'bold', width: '130px', marginRight: '10px' }}
              className='addtank'
            >
              Update
            </button>
          </div>
        </div>
      </div>
      {isAddingFormVisible && (
        <div style={{
          position: 'fixed',
          top: '-5%',
          left: '-34%',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          overflow: 'hidden',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '430px',
            height: '300px'
          }}>
            <button onClick={closeForm} style={{ border: 0, backgroundColor: 'white', marginLeft: '360px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style={{ width: "24px", height: "24px", fill: "#46a2f5" }}>
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
              </svg>
            </button>
            <AddingFish onAddFish={handleAddFish} />
          </div>
        </div>
      )}
    </>
  );
};

export default TankData;
