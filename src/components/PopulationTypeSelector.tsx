import React from "react";
import styles from "../App.module.css";

type PopulationType = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";

interface PopulationTypeSelectorProps {
  populationTypes: PopulationType[];
  selectedPopulationType: PopulationType;
  onChange: (type: PopulationType) => void;
}

const PopulationTypeSelector: React.FC<PopulationTypeSelectorProps> = ({
  populationTypes,
  selectedPopulationType,
  onChange,
}) => (
  <div className={styles["population-type-selector"]}>
    <select
      className={styles["population-type-selector__select--mobile"]}
      value={selectedPopulationType}
      onChange={(e) => onChange(e.target.value as PopulationType)}
    >
      {populationTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
    <div className={styles["population-type-selector__radio-group--desktop"]}>
      {populationTypes.map((type) => (
        <label key={type} className={styles["population-type-selector__label"]}>
          <input
            type="radio"
            className={styles["population-type-selector__radio"]}
            name="populationType"
            value={type}
            checked={selectedPopulationType === type}
            onChange={() => onChange(type)}
          />
          {type}
        </label>
      ))}
    </div>
  </div>
);

export default PopulationTypeSelector;
