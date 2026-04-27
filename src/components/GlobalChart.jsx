import React, { useEffect, useState } from "react";
import { Treemap, Tooltip } from "recharts";
import styles from "../styles/settings.module.scss";

const GlobalChart = ({ coinsData }) => {
  const [dataArry, setDataArry] = useState([]);

  const getValidNumber = (value) => {
    if (value === null || value === undefined) return null;

    const number = Number(value);

    return Number.isFinite(number) ? number : null;
  };

  const formatPercent = (value, decimals = 1) => {
    const number = getValidNumber(value);

    if (number === null) return "N/A";

    return number.toFixed(decimals);
  };

  const colorsPickeer = (value) => {
    const number = getValidNumber(value);

    if (number === null) return styles.black2;

    if (number >= 20) return styles.color1;
    if (number >= 5) return styles.green2;
    if (number >= 0) return styles.green1;
    if (number >= -5) return styles.red1;
    if (number < -20) return styles.red2;

    return styles.black2;
  };

  const excludedCoins = ["usdt", "usdc", "busd", "dai", "ust", "min"];

  const excludeCoin = (coin) => {
    if (!coin) return false;
    return !excludedCoins.includes(coin.toLowerCase());
  };

  useEffect(() => {
    if (coinsData && Array.isArray(coinsData) && coinsData.length > 0) {
      const filteredCoins = coinsData.filter((coin) =>
        excludeCoin(coin.symbol),
      );

      const chartData = filteredCoins.slice(0, 45).map((coin) => {
        const percent24h = coin.market_cap_change_percentage_24h;

        return {
          name: `${coin.symbol.toLowerCase()} ${formatPercent(percent24h, 1)}%`,
          size: coin.market_cap,
          fill: colorsPickeer(percent24h),
        };
      });

      chartData.forEach((coin) => {
        console.log("Coin affiché dans le Treemap :", coin.name);
      });

      setDataArry(chartData);
      console.log(chartData);
    }
  }, [coinsData]);

  const TreemapToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="global-chart">
      <Treemap
        width={730}
        height={181}
        data={dataArry}
        dataKey="size"
        stroke="rgb(51,51,51)"
        fill="black"
        aspectRatio={1}
      >
        <Tooltip content={<TreemapToolTip />} />
      </Treemap>
    </div>
  );
};

export default GlobalChart;
