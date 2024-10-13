import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const inputRefs = useRef({});
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ show: false, type: '', text: '' });
    const [error, setError] = useState({ show: false, message: '' });

    const handleClick = (field) => {
        inputRefs.current[field].focus();
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com)$/; // Updated regex for specific domains
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (!validateEmail(email)) {
            setError({ show: true, message: 'Invalid email format. Please use @gmail.com or @hotmail.com.' });
            setTimeout(() => setError({ show: false }), 5000);
            return;
        }

        if (password.length < 8) {
            setError({ show: true, message: 'Password must be at least 8 characters long.' });
            setTimeout(() => setError({ show: false }), 5000);
            return;
        }

        try {
            const response = await axios.get('http://localhost:3002/users'); // Fetch users from the database
            const users = response.data;

            // Check if user exists
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                setMessage({ show: true, type: 'success', text: 'Login successful! Redirecting...' });
                
                // Store user data in localStorage
                localStorage.setItem('userName', user.firstName);
                localStorage.setItem('userEmail', user.email);

                setTimeout(() => {
                    navigate('/home');
                }, 2000); // Navigate to home after 2 seconds
            } else {
                setMessage({ show: true, type: 'error', text: 'User Not Found. Please head to the Sign Up page.' });
                setTimeout(() => {
                    setMessage({ show: false });
                }, 5000); // Adjust the timeout duration as needed (5000ms = 5 seconds)
            }

        } catch (error) {
            console.error("Error fetching users: ", error);
            setMessage({ show: true, type: 'error', text: 'An error occurred while checking user credentials.' });
        }
    };

    const closeMessage = () => {
        setMessage({ show: false });
    };


    return (
        <>
            <div className='back'>
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(50px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '650px', height: '800px' }}>
                        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
                            <h1 style={{ color: '#46a2f5' }}>Log in</h1>
                            <p style={{ color: '#46a2f5' }}>Don't have an account?
                                <Link to="/signup">
                                    <button style={{ textDecoration: 'underline', color: '#46a2f5', fontWeight: 'bold', fontSize: '20px', backgroundColor: 'white', border: 0, cursor: 'pointer' }}>
                                        Sign up
                                    </button>
                                </Link>
                            </p>
                            <div>
                                <div className="loginwith"></div>
                                <div className="loginwith"></div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className="seper"></div>
                                <p style={{ color: '#46a2f5', margin: '10px 20px 0 20px' }}>OR</p>
                                <div className="seper"></div>
                            </div>
                            {error.show && (
                                <div className="unvalidone" style={{ display: 'flex', textAlign: 'start' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style={{ width: '25px', height: '25px', position: 'absolute', top: '13%', right: '3%', cursor: 'pointer' }} onClick={closeMessage}>
                                        <path fill='white' d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                    </svg>
                                    <div style={{ display: 'flex' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '45px', height: '45px', position: 'absolute', top: '28%', left: '2.5%' }}>
                                                    <path fill='white' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                                                </svg>
                                        <div style={{ marginRight: '15px', color: 'white', position: 'absolute', top: '8%', left: '15%' }}>
                                            <p>
                                                Error
                                                <br/>
                                                {error.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {message.show && (
                                <div className={message.type === 'success' ? 'successone' : 'unvalidone'} style={{ display: 'flex', textAlign: 'start' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style={{ width: '25px', height: '25px', position: 'absolute', top: '13%', right: '3%', cursor: 'pointer' }} onClick={closeMessage}>
                                        <path fill='white' d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                                    </svg>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ width: '45px', height: '45px', position: 'absolute', top: '28%', left: '2.5%' }}>
                                            <path fill='white' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                                        </svg>
                                        <div style={{ marginRight: '15px', color: 'white', position: 'absolute', top: '8%', left: '15%' }}>
                                            <p>
                                                {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                                                <br />
                                                {message.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div style={{ textAlign: 'start' }}>
                                    <p style={{ color: '#46a2f5', cursor: 'pointer' }} id="email" onClick={() => handleClick('email')}>Your email</p>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className="inmailpass"
                                        ref={(el) => (inputRefs.current['email'] = el)}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <div style={{ display: 'flex' }}>
                                        <p style={{ color: '#46a2f5', cursor: 'pointer' }} id="password" onClick={() => handleClick('password')}>Your password</p>
                                        <button
                                            style={{ color: '#46a2f5', backgroundColor: 'white', border: 0, marginLeft: '240px', cursor: 'pointer' }}
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <>
                                                    <div style={{ display: 'flex' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="#46a2f5" style={{ width: '20px', height: '20px', marginRight: '5px', marginTop: '10px' }}>
                                                            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                                                        </svg>
                                                        <p>Hide</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div style={{ display: 'flex' }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="#46a2f5" style={{ width: '20px', height: '20px', marginRight: '5px', marginTop: '10px' }}>
                                                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                                        </svg>
                                                        <p>Show</p>
                                                    </div>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        className="inmailpass"
                                        ref={(el) => (inputRefs.current['password'] = el)}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                    <button className="button logbtn" type="submit">Log in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
