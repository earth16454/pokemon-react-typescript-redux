import React, { useState } from "react";
import { Row, Col, Input, Typography, Select, Tag } from "antd";
import { type_color } from "../../interface/color";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import { useAppSelector, useAppDispatch } from "../../redux/hook";
import { Pokemon } from "../../interface/interface";
import { setPokemonFilter } from "../../redux/filterReducer";
import { Types } from "../../interface/interface";

const { Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pokemons } = useAppSelector((state) => state.pokemonData);
  const { pokemonsFilter } = useAppSelector((state) => state.pokemonFilter);
  const { types } = useAppSelector((state) => state.pokemonType);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value.toLowerCase();

    let filtered = pokemons.filter((pokemon: Pokemon) => {
      let nameMatch = pokemon.name.toLowerCase().includes(searchText);

      if (nameMatch && selectedTypes.length > 0) {
        let typeMatch = pokemon.types.some((types: Types) => {
          return selectedTypes.includes(types.type.name);
        });
        return typeMatch;
      }

      return nameMatch;
    });
    dispatch(setPokemonFilter(filtered));
  };

  const handleSelectType = (values: string[]) => {
    setSelectedTypes(values);
    let filtered = pokemons.filter((pokemon: Pokemon) => {
      if (values.length === 0) {
        return true;
      }
      let resultSelectType = pokemon.types.some((types: Types) => values.includes(types.type.name));
      return resultSelectType;
    });

    dispatch(setPokemonFilter(filtered));
  };

  return (
    <>
      <Row gutter={[24, 8]} align="middle" className="search-container">
        <Col span={24}>
          <Text>ข้อมูลทั้งหมด {pokemons.length}</Text><br />
          <Text>ข้อมูลปัจจุบัน {pokemonsFilter.length}</Text>
        </Col>
        {/* <Col xs={24} sm={12}> */}
        <Col xs={24} sm={24} md={10} lg={8}>
          <Row align="middle" gutter={[0, 16]}>
            <Col xs={4} sm={5} lg={4}>
              <Text>Search:</Text>
            </Col>
            <Col xs={20} sm={19} lg={20}>
              <Search placeholder="Search..." onChange={handleSearch}></Search>
            </Col>
          </Row>
        </Col>
        <Col xs={0} sm={0} md={4} lg={8}></Col>
        {/* <Col xs={24} sm={12}> */}
        <Col xs={24} sm={24} md={10} lg={8}>
          <Row align="middle">
            <Col xs={4} sm={5} lg={4}>
              <Text>Type:</Text>
            </Col>
            <Col xs={20} sm={19} lg={20}>
              <Select
                tagRender={tagRender}
                mode="multiple"
                className="select-type"
                style={{ width: "100%" }}
                placeholder="Select type"
                onChange={handleSelectType}
                optionLabelProp="label"
              >
                {types.map((type, index) => {
                  return (
                    <Option className="select-type-option" value={type.name} label={type.name} key={index}>
                      <Tag key={index} color={type_color[type.name]}>
                        {type.name}
                      </Tag>
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={type_color[value]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};

export default SearchBar;
