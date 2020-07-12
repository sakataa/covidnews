import React, { useState, useEffect, useRef } from 'react';
import CaseByCountryList from './CaseByCountryList';
import Overview from './Overview';
import Filter from './Filter';
import axios from 'axios';

const API_DATA_OVERVIEW_URL = 'https://corona.lmao.ninja/v3/covid-19/all';
const API_DATA_BYCOUNTRY_URL =
  'https://corona.lmao.ninja/v3/covid-19/countries';
const defaultImportantItem = {
  country: 'Vietnam',
  countryInfo: {
    iso2: 'VN',
    flag: 'https://disease.sh/assets/img/flags/vn.png',
  },
  cases: 0,
  todayCases: 0,
  deaths: 0,
  todayDeaths: 0,
  recovered: 0,
  active: 0,
  critical: 0,
};
const DEFAULT_TIMER = 50;

const AppContainer = () => {
  const [overviewData, setOverviewData] = useState(null);
  const [dataByCountry, setDataByCountry] = useState([]);
  const [refreshTime, setRefreshTime] = useState(DEFAULT_TIMER);
  const [importantItem, setImportantItem] = useState(
    Object.assign(defaultImportantItem)
  );
  const [lastUpdatedTime, setLastUpdatedTime] = useState(new Date());
  const [continents, setContinents] = useState([]);
  const [filters, setFilters] = useState({ countryName: '', continent: '' });

  const countryRef = useRef(importantItem.country);

  const timeoutId = useRef(null);

  const getData = async () => {
    const contriesPromise = axios.get(API_DATA_BYCOUNTRY_URL + '?sort=cases');
    const overviewPromise = axios.get(API_DATA_OVERVIEW_URL);
    const apiByCountry =
      API_DATA_BYCOUNTRY_URL + '/' + encodeURIComponent(importantItem.country);
    const importantContryPromise = axios.get(apiByCountry);

    const [overviewResponse, importantContry] = await Promise.all([
      overviewPromise,
      importantContryPromise,
    ]);
    setOverviewData(overviewResponse.data);
    setLastUpdatedTime(new Date(overviewResponse.data.updated));

    setImportantItem(Object.assign({}, importantItem, importantContry.data));

    const contries = await contriesPromise;
    const myFavoriteCountry = contries.data.find(
      (x) =>
        x.countryInfo && x.countryInfo.iso2 === importantItem.countryInfo.iso2
    );
    const continentsSet = new Set([
      '',
      ...contries.data.map((x) => x.continent),
    ]);
    console.log(continentsSet);
    setContinents([...continentsSet]);
    if (myFavoriteCountry && myFavoriteCountry.country !== countryRef.current) {
      countryRef.current = myFavoriteCountry.country;
      setImportantItem(Object.assign({}, importantItem, myFavoriteCountry));
    }
    setDataByCountry(contries.data);
  };

  const refresh = () => {
    const currentTimeoutId = timeoutId.current;
    if (currentTimeoutId !== null) {
      window.clearTimeout(timeoutId);
    }

    getData();
    const timeInMillisecond = refreshTime * 1000;
    timeoutId.current = window.setTimeout(refresh, timeInMillisecond);
  };

  useEffect(() => {
    refresh();

    return () => window.clearTimeout(timeoutId.current);
  }, [refreshTime]);

  const handleChangeSearch = (activatingFilter) => {
    const { name, value } = activatingFilter;
    setFilters({ ...filters, [name]: value });
  };

  const handleChangeTimer = (selectedTime) => {
    setRefreshTime(selectedTime);
  };

  const { countryName, continent } = filters;
  const searchedKey = countryName.toLowerCase();
  const displayDataList =
    countryName || continent
      ? dataByCountry.filter((item) => {
          return (
            item.country.toLowerCase().indexOf(searchedKey) !== -1 &&
            (continent === '' || item.continent === continent)
          );
        })
      : dataByCountry;

  return (
    <div>
      <Overview
        overviewData={overviewData}
        importantItem={importantItem}
        onChangeTimer={handleChangeTimer}
        selectedTime={refreshTime}
        lastUpdatedTime={lastUpdatedTime}
      />
      <Filter
        filters={filters}
        onSearchChange={handleChangeSearch}
        continents={continents}
      />
      <CaseByCountryList dataByCountry={displayDataList} />
    </div>
  );
};

export default AppContainer;
