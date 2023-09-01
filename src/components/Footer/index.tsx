import React from "react";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <>
      <footer className="">
        <div className="footer-container container">
          <div className="license">
            <span>© 2023 Develop By 9sep-</span>
          </div>
          <ul className="contact">
            <li>
              <a href="https://www.facebook.com/EarthThanaphong" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/9.earth" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/earth16454" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
