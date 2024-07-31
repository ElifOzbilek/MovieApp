import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import user from "../../assets/images/profile.png";
import logo from "../../assets/images/logo.png";


const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <ul className="nav-links">
            <li>
              <img src={logo} className="logo" />
            </li>
            <li>
              <Link to={"/izlenecekler"} className="link">
                İzlenecekler
              </Link>
            </li>
            <li>
              <Link to={"/film"} className="link">
                Film
              </Link>
            </li>
            <li>
              <Link to={"/dizi"} className="link">
                Dizi
              </Link>
            </li>
            <li>
              <Link to={"/kirala&&satinAl"} className="link">
                Kirala & Satın Al
              </Link>
            </li>
            <li>
              <Link to={"/cocuk"} className="link">
                Çocuk
              </Link>
            </li>
            <li>
              <Link to={"/canliTv"} className="link borderBox">
                Canlı Tv
              </Link>
            </li>
          </ul>
        </div>
        <div className="outer-content">
          <ul className="nav-links">
            <li className="link">
              <i class="fa-solid fa-magnifying-glass"></i>
            </li>
            <li className="link profile">AnaProfil</li>
            <li>
              <img src={user} className="profilImage" />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
