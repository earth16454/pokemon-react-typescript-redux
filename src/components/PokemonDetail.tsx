import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./detail.css";
import axios from "axios";
import { Spin, Image, Card, Typography, Row, Col, Progress } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Pokemon, Ability, Types, Stats, LogoTypes } from "../interface/interface";
import { setSelectedPokemon } from "../redux/pokemonSlice";
import { stats_color, type_color } from "../interface/color";

import bug from "./assets/icons/bug.svg";
import dark from "./assets/icons/dark.svg";
import dragon from "./assets/icons/dragon.svg";
import electric from "./assets/icons/electric.svg";
import fairy from "./assets/icons/fairy.svg";
import fighting from "./assets/icons/fighting.svg";
import fire from "./assets/icons/fire.svg";
import flying from "./assets/icons/flying.svg";
import ghost from "./assets/icons/ghost.svg";
import grass from "./assets/icons/grass.svg";
import ground from "./assets/icons/ground.svg";
import ice from "./assets/icons/ice.svg";
import normal from "./assets/icons/normal.svg";
import poison from "./assets/icons/poison.svg";
import psychic from "./assets/icons/psychic.svg";
import rock from "./assets/icons/rock.svg";
import steel from "./assets/icons/steel.svg";
import water from "./assets/icons/water.svg";

const logo_types: LogoTypes = {
  bug: bug,
  dark: dark,
  dragon: dragon,
  electric: electric,
  fairy: fairy,
  fighting: fighting,
  fire: fire,
  flying: flying,
  ghost: ghost,
  grass: grass,
  ground: ground,
  ice: ice,
  normal: normal,
  poison: poison,
  psychic: psychic,
  rock: rock,
  steel: steel,
  water: water,
};

const { Text, Title } = Typography;

const PokemonDetail: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const { selectedPokemon } = useAppSelector((state) => state.pokemonData);
  const navigate = useNavigate();

  const getPokemonDetail = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = response.data;
      const abilities: Ability[] = data.abilities.map((ability: Ability) => ({
        ability: { name: ability.ability.name },
      }));
      const types: Types[] = data.types.map((type: Types) => ({
        type: { name: type.type.name },
      }));

      const pokemonDetails: Pokemon = {
        id: data.id,
        name: data.name,
        types: types,
        abilities: abilities,
        sprites: data.sprites.other.home,
        stats: data.stats,
      };
      dispatch(setSelectedPokemon(pokemonDetails));
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getPokemonDetail();
    setLoading(false);
  }, [id]);

  const handlePrevious = () => {
    if (id) {
      let sumID = parseInt(id) - 1;
      navigate(`../details/${sumID}`);
    }
  };

  const handleNext = () => {
    if (id) {
      let sumID = parseInt(id) + 1;
      navigate(`../details/${sumID}`);
    }
  };

  if (!selectedPokemon) {
    return (
      <div className="loading">
        <Spin className="spin-loading" size="large"></Spin>
      </div>
    );
  }

  return loading ? (
    <div className="loading">
      <Spin className="spin-loading" size="large"></Spin>
    </div>
  ) : (
    <>
      <div className="container">
        <div className="back-link">
          <Link to={"/"}>
            <button className="btn-back">
              <LeftOutlined />
              <span className="btn-text">Back</span>
            </button>
          </Link>
        </div>

        <Row
          gutter={[
            { sm: 12, lg: 24 },
            { xs: 24, sm: 24, md: 24, lg: 0 },
          ]}
          align="middle"
          className="pokemon-detail"
        >
          <Col xs={24} lg={0} xl={0} className="col-img-xs img-mode-m">
            <div className="img-container">
              <Image src={selectedPokemon.sprites.front_default} className="img-pokemon"></Image>
              <div className="img-shadow"></div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12}>
            <Card className="card-pokemon">
              <Title className="pokemon-title">
                #{selectedPokemon.id} {selectedPokemon.name}
              </Title>
              <Title level={3} className="pokemon-base-stats-label">
                Base Stats
              </Title>
              <Row
                gutter={[
                  { xs: 0, md: 8, lg: 16 },
                  { xs: 0, md: 6, lg: 8, xl: 10 },
                ]}
              >
                {selectedPokemon.stats.map((stats: Stats, index: number) => {
                  return (
                    <>
                      <Col xs={6}>
                        <Text key={index}>{stats.stat.name.toUpperCase()}</Text>
                      </Col>
                      <Col span={1}>:</Col>
                      <Col xs={17}>
                        <Row gutter={[24, 0]}>
                          <Col xs={18}>
                            <Progress
                              percent={stats.base_stat / 1.5}
                              size={["100%", 16]}
                              showInfo={false}
                              strokeColor={stats_color[stats.stat.name]}
                            />
                          </Col>
                          <Col span={6}>
                            <Text className="stat-base">{stats.base_stat}</Text>
                          </Col>
                        </Row>
                      </Col>
                    </>
                  );
                })}
              </Row>
              <div className="container-type">
                {selectedPokemon.types.map((types: Types, index: number) => {
                  return (
                    <>
                      <Card
                        className="card-type"
                        style={{
                          backgroundColor: type_color[types.type.name],
                          borderColor: type_color[types.type.name],
                        }}
                        bodyStyle={{ padding: "12px 18px" }}
                        key={index}
                      >
                        <span>
                          <img
                            src={logo_types[`${types.type.name}`]}
                            className="type-logo"
                            alt={`Type logo: ${logo_types[`${types.type.name}`]}`}
                          />
                        </span>
                        <span style={{ marginLeft: 3 }}>{selectedPokemon.types[0].type.name}</span>
                      </Card>
                    </>
                  );
                })}
              </div>
              <div className="container-station">
                <button className="btn-previous" onClick={handlePrevious}>
                  Previous
                </button>
                <button className="btn-next" onClick={handleNext}>
                  Next
                </button>
              </div>
            </Card>
          </Col>

          <Col xs={0} lg={12} className="img-mode-c">
            <Image src={selectedPokemon.sprites.front_default} className="img-pokemon"></Image>
            <div className="img-shadow"></div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PokemonDetail;
