import React from "react";
import Navbar from "../components/Navbar";
import PokemonDetail from "../components/PokemonDetail";

const DetailPage: React.FC = () => {

  return (
    <>
      <Navbar />
      <PokemonDetail />
    </>
  );
};

export default DetailPage;
