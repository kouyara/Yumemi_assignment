import React from "react";
import type { Prefecture } from "../hooks/usePrefectures";
import styles from "../App.module.css";

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
  <section className={styles["prefectures-section"]}>
    <h2>都道府県一覧</h2>
    <div className={styles["grid-container"]}>
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
