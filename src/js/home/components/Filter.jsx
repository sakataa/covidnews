import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { getText } from '../../resources/resourceManager';
import { LanguageContext } from '../../utils/context';

const Filter = (props) => {
  const { onSearchChange, continents, filters } = props;
  const langKey = useContext(LanguageContext);

  const onChange = (event) => {
    onSearchChange && onSearchChange(event.target);
  };

  const { countryName, continent } = filters;

  return (
    <Form tag="div">
      <FormGroup row>
        <Label for="continent" sm={5} md={3} lg={2}>
          {getText(langKey, 'continent')}
        </Label>
        <Col sm={10}>
          <Input
            type="select"
            name="continent"
            id="continent"
            value={continent}
            onChange={onChange}>
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
        <Label for="countryName" sm={5} md={3} lg={2}>
          {getText(langKey, 'SearchByCountry')}
        </Label>
        <Col sm={7} md={9} lg={10}>
          <Input
            type="text"
            name="countryName"
            id="countryName"
            value={countryName}
            onChange={onChange}
          />
        </Col>
      </FormGroup>
    </Form>
  );
};

Filter.propTypes = {
  onSearchChange: PropTypes.func,
  continents: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.shape({
    countryName: PropTypes.string,
    continent: PropTypes.string,
  }),
};

export default Filter;
