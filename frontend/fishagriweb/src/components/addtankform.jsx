import { useState } from 'react';

export default function AddingForm({ addTank }) {
    const [tankName, setTankName] = useState('');

    const handleAddTank = async () => {
        if (tankName) {
            try {
                const response = await fetch('http://localhost:3002/tanks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: tankName })
                });
                const newTank = await response.json();
                addTank(newTank);  // Pass the newly created tank to the parent component
                setTankName('');
            } catch (error) {
                console.error('Error adding tank:', error);
            }
        } else {
            alert('Please enter tank name');
        }
    };

    return (
        <div style={{ width: '430px', height: '300px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
            <h1 style={{ color: '#46a2f5', fontWeight: 'normal' }}>Adding a Tank Form</h1>
            <input
                type="text"
                placeholder="  Tank Name"
                className='inputname'
                value={tankName}
                onChange={(e) => setTankName(e.target.value)}
            />
            <button
                onClick={handleAddTank}
                className="addtank"
                style={{ textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}
            >
                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Done</p>
            </button>
        </div>
    );
}