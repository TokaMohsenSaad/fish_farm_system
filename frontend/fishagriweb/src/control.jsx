import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Conttable from './components/tables/control';

export default function Control() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState('Select Treatment');
    const [tankName, setTankName] = useState('');
    const [treatmentState, setTreatmentState] = useState('active');
    const [selectedDate, setSelectedDate] = useState(null);
    const [records, setRecords] = useState([]);

    const toggleDropdown = () => {
        setDropdownVisible((prevState) => !prevState);
    };

    const handleItemClick = (treatment) => {
        setSelectedTreatment(treatment);
        setDropdownVisible(false);
    };

    const handleStateChange = (e) => {
        setTreatmentState(e.target.value);
    };

    const handleSubmit = async () => {
        if (!tankName || selectedTreatment === 'Select Treatment' || !selectedDate) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:3002/records`, {
                day: selectedDate.day,
                daynum: selectedDate.daynum,
                tank: tankName,
                treatment: selectedTreatment,
                state: treatmentState,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            });
            console.log('Record added:', response.data);
            fetchRecords(); // Refresh the records after adding
            clearForm();
        } catch (error) {
            console.error('Error adding record:', error);
        }
    };

    const fetchRecords = async () => {
        if (!selectedDate) return;

        try {
            const response = await axios.get(`http://localhost:3002/records?daynum=${selectedDate.daynum}`);
            console.log("Fetched Records:", response.data);
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    useEffect(() => {
        fetchRecords(); // Fetch records whenever the selected date changes
    }, [selectedDate]);

    const clearForm = () => {
        setTankName('');
        setSelectedTreatment('Select Treatment');
        setTreatmentState('active');
    };

    return (
        <div className="back">
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', marginTop: '60px' }}>
                <Conttable selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <div style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '700px',
                    height: '300px',
                    marginTop: '10px',
                    marginBottom: '10px',
                }}>
                    <h1 style={{ color: '#1f639e' }}>Manual Treatment :</h1>
                    <input
                        type="text"
                        placeholder="  Tank Name"
                        className='inputname'
                        value={tankName}
                        onChange={(e) => setTankName(e.target.value)}
                    />
                    <div style={{ display: 'flex' }}>
                        <h3 style={{ color: '#1f639e' }}>Treatment : </h3>
                        <div className="dropdown" style={{ position: 'relative', marginTop: '8px' }}>
                            <button className='droptreat' onClick={toggleDropdown}>
                                <p style={{ color: 'black', fontSize: '15px', position: 'absolute', top: '-5%' }}>{selectedTreatment}</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '15px', height: '15px', marginLeft: '90%', marginTop: '3%', fontSize: '15px', fontWeight: 'normal' }}>
                                    <path fill='black' d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                                </svg>
                            </button>
                            {isDropdownVisible && (
                                <div className="dropdown-menu" style={{ position: 'absolute', right: '20px', marginTop: '8px', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', borderRadius: '4px', zIndex: 100 }}>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        <li className="dropdown-item" onClick={() => handleItemClick('PUMP')}>PUMP</li>
                                        <li className="dropdown-item" onClick={() => handleItemClick('MOTOR')}>MOTOR</li>
                                        <li className="dropdown-item" onClick={() => handleItemClick('FEEDER')}>FEEDER</li>
                                        <li className="dropdown-item" onClick={() => handleItemClick('HEATER')}>HEATER</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <h3 style={{ color: '#1f639e' }}>State : </h3>
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <label>
                                <input type="radio" name="state" value="active" checked={treatmentState === 'active'} onChange={handleStateChange} />
                                Active
                            </label>
                            <br />
                            <label>
                                <input type="radio" name="state" value="inactive" checked={treatmentState === 'inactive'} onChange={handleStateChange} />
                                Inactive
                            </label>
                        </div>
                    </div>
                    <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#1f639e', color: 'white', border: 'none', borderRadius: '5px' }}>Submit Treatment</button>
                </div>
            </div>
        </div>
    );
}
