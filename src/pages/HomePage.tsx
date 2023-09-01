import React, { useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import { setPokemon, setPokemonCount } from "../redux/pokemonSlice";
import { setPokemonFilter } from "../redux/filterReducer";
import { setPokemonType } from "../redux/typeSlice";
import PokemonTable from "../components/PokemonTable";
import { Pokemon, Results, TypesAPI } from "../interface/interface";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons } = useAppSelector((state) => state.pokemonData);
  const { url } = useAppSelector((state) => state.pokemonData);

  const getPokemon = async (response: Results[]) => {
    const pokemonResponses = await Promise.all(response.map((result: Results) => axios.get(result.url)));

    const pokemonList: Pokemon[] = pokemonResponses.map((response: any) => {
      const data = response.data;
      return {
        id: data.id,
        name: data.name,
        types: data.types,
        abilities: data.abilities,
        sprites: data.sprites.other.home,
        stats: data.stats,
      };
    });

    const newPokemonList: Pokemon[] = pokemonList.filter((newPokemon) => {
      return !pokemons.some((existingPokemon) => existingPokemon.id === newPokemon.id);
    });

    const updatedPokemonSet = new Set([...pokemons, ...newPokemonList]);
    const updatedPokemonArray = Array.from(updatedPokemonSet);

    dispatch(setPokemon(updatedPokemonArray));
    dispatch(setPokemonFilter(pokemonList));
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await axios.get(url);
      dispatch(setPokemonCount(response.data.count));
      getPokemon(response.data.results);
    };

    fetchPokemon();
  }, [url]);

  const getTypes = async (response: Results[]) => {
    const typesResponses = await Promise.all(response.map((result: Results) => axios.get(result.url)));

    const pokemonTypeList: TypesAPI[] = typesResponses.map((response: any) => {
      const data = response.data;
      return {
        name: data.name,
        pokemon: data.pokemon,
      };
    });

    dispatch(setPokemonType(pokemonTypeList));
  };

  const fetchPokemonTpyes = async () => {
    try {
      const responseTypes = await axios.get("https://pokeapi.co/api/v2/type/");
      getTypes(responseTypes.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPokemonTpyes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container homepage">
        <SearchBar />
        <PokemonTable />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
