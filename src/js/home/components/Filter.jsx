import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { getText } from '../../resources/resourceManager';
import { LanguageContext } from '../../utils/context';

const Filter = (props) => {
  const { onSearchChange, continents, selectedContinent } = props;
  const [searchedText, setSearchedText] = useState('');
  const langKey = useContext(LanguageContext);

  const onChange = (event) => {
    const { name, value } = event.target;

    if (name === 'search') {
      setSearchedText(value);
    }

    onSearchChange && onSearchChange(value, selectedContinent);
  };

  return (
    <Form tag="div">
      <FormGroup row>
        <Label for="continentSelect" sm={5} md={3} lg={2}>
          {getText(langKey, 'continent')}
        </Label>
        <Col sm={10}>
          <Input
            type="select"
            name="continent"
            id="continentSelect"
            value={selectedContinent}
            onChange={(e) => onSearchChange(searchedText, e.target.value)}>
            {continents.map((x) => {
              return (
                <option key={x} value={x}>
                  {x === '' ? getText(langKey, 'all') : getText(langKey, x)}
                </option>
              );
            })}
          </Input>
        </Col>
      </FormGroup>

      <FormGroup row>
        <Label for="search" sm={5} md={3} lg={2}>
          {getText(langKey, 'SearchByCountry')}
        </Label>
        <Col sm={7} md={9} lg={10}>
          <Input
            type="text"
            name="search"
            id="search"
            value={searchedText}
            onChange={onChange}
          />
        </Col>
      </FormGroup>
    </Form>
  );
};

Filter.propTypes = {
  onSearchChange: PropTypes.func,
};

export default Filter;
