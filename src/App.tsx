import { useState } from "react";
import styles from "./App.module.css";
import { usePrefectures } from "./hooks/usePrefectures";
import { usePrefecturePopulations } from "./hooks/usePrefecturePopulations";
import PrefectureList from "./components/PrefectureList";
import PopulationTypeSelector from "./components/PopulationTypeSelector";
import PopulationChart from "./components/PopulationChart";

export type PopulationType = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";

function App() {
  const { prefectures, error: prefectureError } = usePrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [selectedPopulationType, setSelectedPopulationType] = useState<PopulationType>("総人口");
  const populationTypes: PopulationType[] = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  const { prefecturePopulations, error: populationError } = usePrefecturePopulations(
    selectedPrefectures,
    prefectures
  );

  const handlePrefectureChange = (prefCode: number) =>
    setSelectedPrefectures((prev) =>
      prev.includes(prefCode) ? prev.filter((code) => code !== prefCode) : [...prev, prefCode]
    );

  return (
    <div className={styles.app}>
      <h1 className={styles["app__title"]}>
        🧡 ゆめみ フロントエンドコーディング試験
      </h1>

      {(prefectureError || populationError) && (
        <p className={styles["app__error"]}>{prefectureError || populationError}</p>
      )}

      {selectedPrefectures.length > 0 && prefecturePopulations.length > 0 && (
        <section className={styles["app__population-section"]}>
          <h3 className={styles["app__subsubtitle"]}>人口推移グラフ</h3>
          <PopulationTypeSelector
            populationTypes={populationTypes}
            selectedPopulationType={selectedPopulationType}
            onChange={setSelectedPopulationType}
          />
          <PopulationChart
            prefecturePopulations={prefecturePopulations}
            selectedPrefectures={selectedPrefectures}
            selectedPopulationType={selectedPopulationType}
          />
        </section>
      )}

      {prefectures.length > 0 && (
        <PrefectureList
          prefectures={prefectures}
          selectedPrefectures={selectedPrefectures}
          onChange={handlePrefectureChange}
        />
      )}
    </div>
  );
}

export default App;
