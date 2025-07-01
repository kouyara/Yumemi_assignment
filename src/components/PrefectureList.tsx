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
  <section className={styles["app__prefectures-section"]}>
    <h2 className={styles["app__subtitle"]}>都道府県一覧</h2>
    <div className={styles["prefecture-list"]}>
      {prefectures.map((pref) => (
        <label key={pref.prefCode} className={styles["prefecture-list__label"]}>
          <input
            type="checkbox"
            className={styles["prefecture-list__checkbox"]}
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
