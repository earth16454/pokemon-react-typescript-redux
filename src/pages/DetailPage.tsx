import React from "react";
import Navbar from "../components/Navbar";
import PokemonDetail from "../components/PokemonDetail";
import "./pages.css";
import Footer from "../components/Footer";

const DetailPage: React.FC = () => {
  return (
    <>
      <div className="pages-container">
        <Navbar />
        <div className="content">
          <PokemonDetail />
        </div>
        <div className="pages-container-footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default DetailPage;
