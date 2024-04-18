import React, { useState } from 'react';
import './style.css';

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // Handle login logic here
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <div id="login-container">
      <form id="login-form" onSubmit={handleLogin}>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Adresse e-mail ou numéro de tél."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" id="login-button">Se connecter</button>
      </form>
      <button id="signup-button" onClick={toggleSignUp}>Créer nouveau compte</button>
      
      {showSignUp && <SignUpForm toggleSignUp={toggleSignUp} />}
    </div>
  );

}


function SignUpForm({ toggleSignUp }) {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      emailOrPhone: '',
      password: '',
      day: '',
      month: '',
      year: '',
      gender: '',
      cin: '',  // CIN field
      region: '',  // Region field
      localDistrict: ''  // Local District field
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Submit sign-up form data
      };
    
      return (
        <div className="modal" id="signup-modal">
          <div className="modal-content" id="signup-form">
            <span className="close-button" onClick={toggleSignUp}>X</span>
            <form onSubmit={handleSubmit}>
              <input
                id="first-name"
                name="firstName"
                type="text"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <input
                id="last-name"
                name="lastName"
                type="text"
                placeholder="Nom de famille"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <input
                id="email-or-phone"
                name="emailOrPhone"
                type="text"
                placeholder="Numéro mobile ou e-mail"
                value={formData.emailOrPhone}
                onChange={handleInputChange}
                required
              />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Nouveau mot de passe"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
                  <input
        id="cin"
        name="cin"
        type="text"
        placeholder="CIN"
        value={formData.cin}
        onChange={handleInputChange}
        required
    />
    <input
        id="region"
        name="region"
        type="text"
        placeholder="Region"
        value={formData.region}
        onChange={handleInputChange}
        required
    />
    <input
        id="local-district"
        name="localDistrict"
        type="text"
        placeholder="Local District"
        value={formData.localDistrict}
        onChange={handleInputChange}
        required
    />
                    <div className="date-of-birth">
                        <select name="day" value={formData.day} onChange={handleInputChange} required>
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                        <select name="month" value={formData.month} onChange={handleInputChange} required>
                            {months.map((month, index) => (
                                <option key={month} value={index + 1}>{month}</option>
                            ))}
                        </select>
                        <select name="year" value={formData.year} onChange={handleInputChange} required>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
              {/* Gender Selection */}
              <div className="gender-selection">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                />
                <label htmlFor="female">Femme</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                />
                <label htmlFor="male">Homme</label>
                <input
                  type="radio"
                  id="custom"
                  name="gender"
                  value="custom"
                  checked={formData.gender === 'custom'}
                  onChange={handleInputChange}
                />
                <label htmlFor="custom">Personnalisé</label>
              </div>
              <button type="submit" id="signup-submit">S'inscrire</button>
            </form>
          </div>
        </div>
      );
    
}

export default LoginForm;
