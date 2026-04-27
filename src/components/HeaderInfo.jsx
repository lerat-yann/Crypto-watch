import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import PercentChange from "./percentChange";
import TableFilters from "./tableFilters";
const HeaderInfo = () => {
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/global`
        );
        setHeaderData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="header-container">
      <ul className="title">
        <li>
          <h1>
            <img src="./assets/logo.png" alt="logo" />
            Watch Tower
          </h1>
        </li>
        <li>
          {headerData &&
            typeof headerData === "object" &&
            headerData.active_cryptocurrencies &&
            `Crypto-monnaies : ${headerData.active_cryptocurrencies.toLocaleString()}`}
        </li>
        <li>Marchés : {headerData.markets && headerData.markets} </li>
      </ul>
      <ul className="infos-mkt">
        <li className="global-mkt">
          Global Marcket Cap :
          <PercentChange
            percent={headerData.market_cap_change_percentage_24h_usd}
          />
        </li>
        <li>
          BTC dominance :{" "}
          {headerData &&
            typeof headerData === "object" &&
            headerData.market_cap_percentage &&
            headerData.market_cap_percentage.btc.toFixed(1) + "%"}
        </li>
        <li>
          ETH dominance :{" "}
          {headerData &&
            typeof headerData === "object" &&
            headerData.market_cap_percentage &&
            headerData.market_cap_percentage.eth.toFixed(1) + "%"}
        </li>
      </ul>
      <TableFilters />
    </div>
  );
};

export default HeaderInfo;
