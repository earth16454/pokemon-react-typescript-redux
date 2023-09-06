import React from "react";
import Navbar from "../components/Navbar";
import PokemonCard from "../components/PokemonCard";
import "./pages.css";
import Footer from "../components/Footer";
const DetailPage: React.FC = () => {
  return (
    <>
      <div className="pages-container">
        <Navbar />
        <div className="container content">
          <h1>Under construction...</h1>
        </div>
        <div className="pages-container-footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
