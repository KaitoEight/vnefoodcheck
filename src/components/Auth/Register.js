import React, { useState } from 'react';
import './Register.css'; 

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const requestData = {
      name: name,
      email: email,
      password: password,
      about: about
    };

    try {
      const response = await fetch('https://food-server-le3l.onrender.com/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess('User registered successfully!');
        // Reset form fields after successful registration
        setName('');
        setEmail('');
        setPassword('');
        setAbout('');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'An error occurred'); 
      }
    } catch (err) {
      setError('Failed to register. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>About:</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );

}

export default Register;
