import React from "react";
import { useState } from "react";
import TableLine from "./TableLine";
import ToTop from "./toTop";

const Table = ({ coinsData }) => {
  const [orderBy, setOrderBy] = useState("");
  const [rangeNumber, setRangeNumber] = useState(100);

  const tableHeader = [
    "Prix",
    "MarketCap",
    "Volume",
    "1h",
    "1j",
    "1s",
    "1m",
    "6m",
    "1a",
    "ATH",
  ];

  const sortingCriteria = {
    Prix: "current_price",
    Volume: "total_volume",
    MarketCap: "market_cap",
    "1h": "price_change_percentage_1h_in_currency",
    "1j": "market_cap_change_percentage_24h",
    "1s": "price_change_percentage_7d_in_currency",
    "1m": "price_change_percentage_30d_in_currency",
    "6m": "price_change_percentage_200d_in_currency",
    "1a": "price_change_percentage_1y_in_currency",
    ATH: "ath_change_percentage",
  };

  return (
    <div className="table-container">
      <ul className="table-header">
        <div className="range-container">
          <span>
            Top{" "}
            <input
              type="text"
              value={rangeNumber}
              // Dans le onChange de l'input text
              onChange={(e) => setRangeNumber(Number(e.target.value))}
            />
          </span>
          <input
            type="range"
            min="1"
            max="250"
            value={rangeNumber}
            // Dans le onChange de l'input text
            onChange={(e) => setRangeNumber(Number(e.target.value))}
          />
          <ToTop />
        </div>
        {tableHeader.map((el, index) => (
          <li key={index}>
            <input
              type="radio"
              name="header-el"
              id={el}
              defaultChecked={
                el === orderBy || el === orderBy + "reverse" ? true : false
              }
              onClick={() => {
                if (el === orderBy) {
                  setOrderBy(el + "reverse");
                } else {
                  setOrderBy(el);
                }
              }}
            />
            <label htmlFor={el}>{el}</label>
          </li>
        ))}
      </ul>
      {coinsData &&
        coinsData
          .filter((coin) => coin !== undefined)
          .slice(0, rangeNumber)
          .sort((a, b) => {
            // Vérifie si l'ordre demandé est un tri inverse
            const isReverse = orderBy.endsWith("reverse");
            const key = sortingCriteria[orderBy.replace("reverse", "")];

            if (!key) return 0; // Aucun tri par défaut

            // Détermine le sens du tri : normal (1) ou inverse (-1)
            const direction = isReverse ? -1 : 1;

            return direction * (b[key] - a[key]);
          })
          .map((coin, index) => (
            <TableLine key={index} coin={coin} index={index} />
          ))}
    </div>
  );
};

export default Table;
