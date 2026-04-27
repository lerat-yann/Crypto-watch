import React from "react";
import HeaderInfo from "./components/HeaderInfo";
import GlobalChart from "./components/globalChart";
import axios from "axios";
import { useEffect, useState } from "react";
import Table from "./components/Table";
import TableLine from "./components/TableLine";
import ToTop from "./components/toTop";

const App = () => {
  const [coinsData, setCoinsData] = useState([]);

  useEffect(() => {
    const fetchCoinsData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`
        );
        setCoinsData(response.data);
        window.addEventListener("scroll", () => {
          if (window.scrollY > 145) {
            document.querySelector(".table-header").classList.add("active");
          } else {
            document.querySelector(".table-header").classList.remove("active");
          }
        });
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchCoinsData();
  }, []);

  return (
    <div className="app-container">
      <header>
        <HeaderInfo />
        <GlobalChart coinsData={coinsData} />
      </header>
      <Table coinsData={coinsData} />
      <TableLine />
      <ToTop />
    </div>
  );
};

export default App;
