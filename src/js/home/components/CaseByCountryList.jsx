import React from "react";
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import CaseItem from './CaseItem';

const CaseByCountryList = (props) => {
    const { dataByCountry } = props;

    return (
        <Row>
            {
                dataByCountry.map(item => (
                    <Col key={item.country} md={6} lg={4} xl={3} className="mb-4">
                        <CaseItem key={item.country} item={item} />
                    </Col>
                ))
            }
        </Row>
    );
}

CaseByCountryList.propTypes = {
    dataByCountry: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default CaseByCountryList;