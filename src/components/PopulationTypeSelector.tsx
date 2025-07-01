import React from "react";

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
  <div className="type-selector">
    <select
      className="mobile-select"
      value={selectedPopulationType}
      onChange={(e) => onChange(e.target.value as PopulationType)}
    >
      {populationTypes.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
    <div className="desktop-radio">
      {populationTypes.map((type) => (
        <label key={type}>
          <input
            type="radio"
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
