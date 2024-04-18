import React from "react";
import './style.css';
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
const HomePage = () => {
  return (
    <header className="site-header clearfix">
      <Navbar />
      <nav>
        <div className="logo">
          <h1>E-Vote</h1>
        </div>
      </nav>
      <section>
        <div className="leftside">
          <img src="img/home_page.png" alt="Home Page" />
        </div>
        <div className="rightside">
          <h1>VOTE!</h1>
          <p>LET YOUR VOICE BE HEARD!</p>
          <a href="/register"><button>USER SIGN-UP/LOGIN</button></a>
          <Link to="/Login"><button>ADMIN-LOGIN</button></Link>
        </div>
      </section>
    </header>
  );
};

export default HomePage;
