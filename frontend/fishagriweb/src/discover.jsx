import { useEffect, useState } from 'react';
import AddingForm from './components/addtankform';
import TankData from './components/tankdata';

export default function Discover() {
    const [isAddingFormVisible, setAddingFormVisible] = useState(false);
    const [tanks, setTanks] = useState([]);
    const [selectedTank, setSelectedTank] = useState(null);
    const colors = ['#9bc3f0', '#9bd4f5', '#a7e5ee', '#fae2b9', '#fcedbf', '#fdf1d1', '#a7e5ee', '#bcdeeb', '#9bc3f0'];

    useEffect(() => {
        // Fetch existing tanks from the API
        const fetchTanks = async () => {
            try {
                const response = await fetch('http://localhost:3004/tanks');
                const data = await response.json();
                setTanks(data);
            } catch (error) {
                console.error('Error fetching tanks:', error);
            }
        };

        fetchTanks();
    }, []);

    const handleAddTankClick = () => {
        setAddingFormVisible(true);
    };

    const closeForm = () => {
        setAddingFormVisible(false);
    };

    const addTank = (newTank) => {
        setTanks([...tanks, newTank]);
        setAddingFormVisible(false);
    };

    const handleTankClick = (tank) => {
        setSelectedTank(tank);
    };

    const handleBackClick = () => {
        setSelectedTank(null);
    };

    return (
        <>
            <div className='back' style={{ position: 'relative', overflowY: 'scroll' }}>
                <div style={{ textAlign: 'center', marginTop: '100px', marginLeft: '20%', backgroundColor: 'white', position: 'absolute', width: '60%', backdropFilter: 'blur(50px)', alignItems: 'center', justifyContent: 'center', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}>
                    {selectedTank ? (
                        <TankData tank={selectedTank} onBack={handleBackClick} onUpdateFish={addTank} />
                    ) : (
                        <>
                            <h1 style={{ color: '#46a2f5', fontWeight: 'normal', marginTop: '15px' }}>Our Products</h1>
                            <p style={{ width: '40%', margin: '0 auto' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ullamcorper convallis fermentum.
                            </p>
                            <button
                                onClick={handleAddTankClick}
                                style={{
                                    textDecoration: 'none',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '20px auto',
                                    fontWeight: 'bold'
                                }}
                                className='addtank'
                            >
                                Add Tank
                            </button>
                        </>
                    )}
                        {/* Display the tanks in a grid (3 per row) */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '20px',
                            marginTop: '20px',
                            padding: '20px',
                            maxWidth: '900px',
                            margin: '0 auto',
                        }}>
                            {tanks.map((tank, index) => (
                                <div
                                key={index}
                                style={{
                                    backgroundColor: colors[index % colors.length],
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    padding: '20px',
                                    textAlign: 'center',
                                    width: 'calc(33.33% - 20px)',
                                    boxSizing: 'border-box',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleTankClick(tank)}
                                >
                                    <img src={require('./images/fish-tank.png')} alt="" style={{ width: '150px' }} />
                                <h3>Tank {tank.tank_no}</h3>
                            </div>
                        ))}
                    </div>
                </div>
                {isAddingFormVisible && (
                    <div style={{
                        position: 'fixed',
                        top: '0%',
                        width: '100%',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000
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
                            <AddingForm addTank={addTank} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
