import React from "react";
import './HomePage.css';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import LoginUser from '../../components/LoginUser/LoginUser';

const HomePage = () => {
  return (
    <div className="home-page-container">
      <div className="content-area"></div>
      <header className="site-header clearfix">
        <Navbar/>
        <nav>
          <div className="logo">
            <h1>E-Vote</h1>
          </div>
        </nav>
        <section>
          <div className="leftside">
            <img src="img/home_page.png" alt="Home Page" />
          </div>
        </section>
      </header>
      <div className="rightside">
        <h1>VOTE!</h1>
        <p> LET YOUR VOICE BE HEARD! </p>
        <Link to="LoginUser" ><button>USER SIGN-UP/LOGIN</button></Link>
      </div>
    </div>
  );
};

export default HomePage;
