import './App.css';
import { React ,useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/navbar';
import Discover from './discover';
import Home from './home';
import Control from './control';
import History from './history';
import Signup from './components/signup';
import Login from './components/login';
import Admin from './Admin';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <Router>
      <Navbar firstName={firstName} lastName={lastName} email={email} />
      <div>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<Home/>} />
          {/* based on database after login navigate to home */}
          <Route path="/discover" element={<Discover />} />
          <Route path="/control" element={<Control />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;