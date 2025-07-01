import React from "react";
import type { Prefecture } from "../hooks/usePrefectures";

interface PrefectureListProps {
  prefectures: Prefecture[];
  selectedPrefectures: number[];
  onChange: (prefCode: number) => void;
}

const PrefectureList: React.FC<PrefectureListProps> = ({
  prefectures,
  selectedPrefectures,
  onChange,
}) => (
  <section className="prefectures-section">
    <h2>都道府県一覧</h2>
    <div className="grid-container">
      {prefectures.map((pref) => (
        <label key={pref.prefCode}>
          <input
            type="checkbox"
            checked={selectedPrefectures.includes(pref.prefCode)}
            onChange={() => onChange(pref.prefCode)}
          />
          {pref.prefName}
        </label>
      ))}
    </div>
  </section>
);

export default PrefectureList;
