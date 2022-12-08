import React from "react";
import { useState } from "react";

export const Calculator = () => {
  const [historial, setHistorial] = useState<any[]>([]);

  const rpmToRad = (rpm: number) => {
    const rad = (rpm * 2 * Math.PI) / 60;
    return rad;
  };

  const calculate = (rpm: number, wheelDiameter: number) => {
    const rad = rpmToRad(rpm);
    const angularVelocityInRad = rad;
    const wheelRadio = wheelDiameter / 2;
    const tangencialVelocityinMS = (angularVelocityInRad * wheelRadio) / 1000;
    // m/s to km/h
    const tangencialVelocity = tangencialVelocityinMS * 3.6;
    // round to 0 decimals
    return Math.round(tangencialVelocity);
  };
  // show the result in page
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rpm = Number(e.currentTarget.rpm.value);
    const wheelDiameter = Number(e.currentTarget.wheelDiameter.value);
    const result = calculate(rpm, wheelDiameter);
    setHistorial([...historial, { rpm, wheelDiameter, result }]);
    alert(`${result} Km/h`);
  };

  return (
    <div>
      <h2>Calculador de Velocidad Tangencial</h2>
      <p>Ingrese los datos para calcular la velocidad tangencial</p>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="rpm">RPM</label>
        <input type="number" name="rpm" id="rpm" style={{ width: "150px" }} />
        <label htmlFor="wheelDiameter">Diametro de la rueda en mm</label>
        <input
          type="number"
          name="wheelDiameter"
          id="wheelDiameter"
          style={{ width: "150px" }}
        />
        <button type="submit" style={{ width: "150px" }}>
          Calcular
        </button>
      </form>
      {/* show list of older calculations with rpm an diameter an result */}
      <h3>Historial</h3>
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
