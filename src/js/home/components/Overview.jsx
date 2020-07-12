import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { formatNumber } from '../../utils/fomatter';
import TimeSelection from './TimeSelection';
import { getText } from '../../resources/resourceManager';
import { LanguageContext } from '../../utils/context';
import CaseItem from '../components/CaseItem';

const Overview = (props) => {
  const {
    overviewData,
    selectedTime,
    onChangeTimer,
    importantItem,
    lastUpdatedTime,
  } = props;
  const langKey = useContext(LanguageContext);

  const updatedTime = lastUpdatedTime || new Date();

  return (
    <div className="my-3">
      <Jumbotron fluid className="py-3">
        <h5 className="text-center">{getText(langKey, 'pageHeading')}</h5>
        <p className="text-center lead">
          <small>
            {getText(langKey, 'timeInfo')}: {updatedTime.toUTCString()}
          </small>
        </p>
        <TimeSelection
          selectedTime={selectedTime}
          onChangeTimer={onChangeTimer}
        />

        <Container fluid>
          <Row>
            <Col md={6} className="mb-4 mb-md-0">
              <Card>
                <CardHeader>{getText(langKey, 'global')}</CardHeader>
                <CardBody className="text-center">
                  <Alert color="primary">
                    {getText(langKey, 'coronavirusCases')}:{' '}
                    {overviewData && formatNumber(overviewData.cases)}
                  </Alert>
                  <Alert color="success">
                    {getText(langKey, 'recovered')}:{' '}
                    {overviewData && formatNumber(overviewData.recovered)}
                  </Alert>
                  <Alert color="danger" className="mb-0">
                    {getText(langKey, 'deaths')}:{' '}
                    {overviewData && formatNumber(overviewData.deaths)}
                  </Alert>
                </CardBody>
              </Card>
            </Col>

            <Col md={6} className="mb-4 mb-md-0">
              <CaseItem item={importantItem} />
            </Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
};

Overview.propTypes = {
  overviewData: PropTypes.object,
  selectedTime: PropTypes.number.isRequired,
  onChangeTimer: PropTypes.func,
  importantItem: PropTypes.object,
  lastUpdatedTime: PropTypes.object,
};

export default Overview;
