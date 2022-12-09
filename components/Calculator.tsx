import React from "react";
import { useState } from "react";
import styles from "../styles/calculator.module.css";

interface Calculation {
  rpm: number;
  wheelDiameter: number;
  result: number;
}

export const Calculator = () => {
  const [historial, setHistorial] = useState<Calculation[]>([]);

  const rpmToRad = (rpm: number) => {
    const rad = (rpm * 2 * Math.PI) / 60;
    return rad;
  };

  const calculate = (rpm: number, wheelDiameter: number) => {
    const rad = rpmToRad(rpm);
    const angularVelocityInRad = rad;
    // wheelDiameter in mm
    const wheelRadio = wheelDiameter / 2;
    const tangencialVelocityinMS = (angularVelocityInRad * wheelRadio) / 1000;
    // m/s to km/h
    const tangencialVelocity = tangencialVelocityinMS * 3.6;
    // round to 0 decimals
    return Math.round(tangencialVelocity);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rpm = Number(e.currentTarget.rpm.value);
    const wheelDiameter = Number(e.currentTarget.wheelDiameter.value);
    const result = calculate(rpm, wheelDiameter);
    setHistorial([...historial, { rpm, wheelDiameter, result }]);
    alert(`${result} Km/h`);
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <div className={styles.calculatorBox}>
        <h2>Calculador de Velocidad Tangencial</h2>
        <p>Ingrese los datos para calcular la velocidad tangencial</p>
        <p>[RPM + Diametro en mm = velocidad en Km/h]</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.input}>
            <label htmlFor="rpm">RPM: </label>
            <input
              type="number"
              name="rpm"
              id="rpm"
              style={{ width: "150px" }}
              inputMode="numeric"
            />
          </div>
          <div className={styles.input}>
            <label htmlFor="wheelDiameter">Diametro de la rueda en mm: </label>
            <input
              type="number"
              name="wheelDiameter"
              id="wheelDiameter"
              style={{ width: "150px" }}
              inputMode="numeric"
            />
          </div>
          <button type="submit" style={{ width: "150px" }}>
            Calcular
          </button>
        </form>
      </div>
      {historial.length > 0 && <h3>Historial</h3>}
      <div>
        {historial.map((item, index) => (
          <div key={index}>
            <p>RPM: {item.rpm}</p>
            <p>Diametro de la rueda: {item.wheelDiameter} mm</p>
            <p>Velocidad tangencial: {item.result} Km/h</p>
            <p>--------------------------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
};
