import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import "./detail.css";
import { Table, Tag, Button, Image, Breakpoint, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Pokemon, Dream_world, Types } from "../interface/interface";
import { type_color } from "../interface/color";
import { setPokemonUrl } from "../redux/pokemonSlice";

const PokemonTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons } = useAppSelector((state) => state.pokemonData);
  const { pokemonsFilter } = useAppSelector((state) => state.pokemonFilter);
  const { count } = useAppSelector(state => state.pokemonData);

  const selectPageNumber = (page: number, pageSize: number) => {
    let totalRecordOnPage: number = page * pageSize; // limit
    let limitPage: number = pageSize;
    let offsetPage: number = totalRecordOnPage - pageSize; // offset

    let checkIdUrl: boolean = false;
    pokemons.map((pokemon) => {
      if (!(pokemon.id > offsetPage && pokemon.id <= limitPage)) {
        checkIdUrl = true;
      }
    });
    checkIdUrl && dispatch(setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${offsetPage}&limit=${limitPage}`));
  };

  const selectPageSize = (current: number, size: number) => {
    let totalRecordOnPage: number = current * size; // last record in page
    let offsetPage: number = totalRecordOnPage - size; // offset
    dispatch(setPokemonUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${offsetPage}&limit=${size}`));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "sprites",
      key: "sprites",
      render: (sprites: Dream_world) => <Image src={sprites.front_default} alt="Pokemon" width={50}></Image>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "types",
      key: "types",
      render: (types: Types[]) =>
        types.map((type, index) => {
          return (
            <Tag key={index} color={type_color[type.type.name]}>
              {type.type.name}
            </Tag>
          );
        }),
    },
    {
      title: "Abilities",
      dataIndex: "abilities",
      key: "abilities",
      render: (abilities: { ability: { name: string } }[]) =>
        abilities.map((ability) => ability.ability.name).join(", "),
      responsive: ["sm" as Breakpoint],
    },
    {
      title: "View",
      key: "view",
      render: (text: string, record: Pokemon) => (
        // <Link to={`details/${record.id}`} state={{ pokemon: record }} key={record.id}>
        <Link to={`details/${record.id}`} key={record.id}>
          <Button icon={<SearchOutlined />}>View Details</Button>
        </Link>
      ),
    },
  ];

  return (
    <>
      <Table
        className="table-pokemon"
        locale={{ emptyText: <Empty /> }}
        dataSource={pokemonsFilter}
        columns={columns}
        rowKey={(record) => record.id.toString()}
        pagination={{
          className: "select-page",
          total: count,
          pageSizeOptions: ["10", "20", "30", "50", "80", "100"],
          defaultPageSize: 20,
          position: ["topRight"],
          onChange: selectPageNumber,
          onShowSizeChange: selectPageSize,
        }}
      />
    </>
  );
};

export default PokemonTable;
