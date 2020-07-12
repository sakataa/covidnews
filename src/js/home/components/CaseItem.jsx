import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import { formatNumber } from '../../utils/fomatter';
import { getText } from '../../resources/resourceManager';
import { LanguageContext } from '../../utils/context';

const CaseItem = (props) => {
    const { item } = props;
    const { countryInfo } = item;
    const langKey = useContext(LanguageContext);

    const countryName = getText(langKey, item.country) || item.country;

    return (
        <Card key={item.country}>
            <CardHeader><img className="mr-2" alt={countryInfo && countryInfo.iso2} src={countryInfo && countryInfo.flag} with="30" height="20" />{countryName}</CardHeader>
            <CardBody>
                <CardText>{getText(langKey, 'totalCases')}: {formatNumber(item.cases)}</CardText>
                <CardText>{getText(langKey, 'todayCases')}: {formatNumber(item.todayCases)}</CardText>
                <CardText>{getText(langKey, 'deaths')}: {formatNumber(item.deaths)}</CardText>
                <CardText>{getText(langKey, 'todayDeaths')}: {formatNumber(item.todayDeaths)}</CardText>
                <CardText>{getText(langKey, 'recovered')}: {formatNumber(item.recovered)}</CardText>
                <CardText>{getText(langKey, 'active')}: {formatNumber(item.active)}</CardText>
                <CardText>{getText(langKey, 'critical')}: {formatNumber(item.critical)}</CardText>
            </CardBody>
        </Card>
    )
}

CaseItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default CaseItem;