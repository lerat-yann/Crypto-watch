import React from "react";
import styles from "../styles/settings.module.scss";
import { useEffect, useState } from "react";

const PercentChange = ({ percent }) => {
  const [color, setColor] = useState();

  useEffect(() => {
    console.log("Valeur de percent :", percent); // Affichage de la valeur actuelle

    if (percent !== undefined && percent !== null) {
      if (percent >= 0) {
        console.log("✅ Vert appliqué :", styles.green1);
        setColor(styles.green1); // Applique bien la couleur SCSS
      } else {
        console.log("🛑 Rouge appliqué :", styles.red1);
        setColor(styles.red1);
      }
    } else {
      console.log("⚪ Blanc appliqué :", styles.white1);
      setColor(styles.white1);
    }
  }, [percent]); // Déclenche le useEffect à chaque changement de `percent`

  return (
    <p className="percent-change-container" style={{ color }}>
      {percent ? percent.toFixed(1) + "%" : "-"}
    </p>
  );
};

export default PercentChange;
