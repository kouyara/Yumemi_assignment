import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./App.css";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationComposition {
  label: string;
  data: PopulationData[];
}

interface PrefecturePopulation {
  prefCode: number;
  prefName: string;
  data: PopulationComposition[];
}

type PopulationType = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const [prefecturePopulations, setPrefecturePopulations] = useState<PrefecturePopulation[]>([]);
  const [selectedPopulationType, setSelectedPopulationType] = useState<PopulationType>("総人口");
  const [error, setError] = useState<string | null>(null);

  const populationTypes: PopulationType[] = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await fetch(
          "https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures",
          { headers: { "X-API-KEY": API_KEY } }
        );
        if (!response.ok) throw new Error("データの取得に失敗しました");
        const data = await response.json();
        setPrefectures(data.result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      }
    };
    fetchPrefectures();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const fetchPopulationData = async (prefCode: number) => {
      try {
        const response = await fetch(
          `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          { headers: { "X-API-KEY": API_KEY } }
        );
        if (!response.ok) throw new Error("人口データの取得に失敗しました");
        const data = await response.json();
        const prefName = prefectures.find((p) => p.prefCode === prefCode)?.prefName || "";
        setPrefecturePopulations((prev) => {
          const newData = [...prev];
          if (!newData.some((p) => p.prefCode === prefCode)) {
            newData.push({ prefCode, prefName, data: data.result.data });
          }
          return newData;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      }
    };

    for (const prefCode of selectedPrefectures) {
      if (!prefecturePopulations.some((p) => p.prefCode === prefCode))
        fetchPopulationData(prefCode);
    }

    setPrefecturePopulations((prev) =>
      prev.filter((pref) => selectedPrefectures.includes(pref.prefCode))
    );
  }, [selectedPrefectures, prefectures]);

  const handlePrefectureChange = (prefCode: number) =>
    setSelectedPrefectures((prev) =>
      prev.includes(prefCode) ? prev.filter((code) => code !== prefCode) : [...prev, prefCode]
    );

  const getChartOptions = () => {
    const years = prefecturePopulations[0]?.data[0]?.data.map((item) => item.year) || [];
    return {
      title: { text: `${selectedPopulationType}の推移` },
      xAxis: { title: { text: "年" }, categories: years },
      yAxis: { title: { text: "人口" } },
      series: prefecturePopulations.map((pref) => {
        const pop = pref.data.find((d) => d.label === selectedPopulationType);
        return { name: pref.prefName, data: pop?.data.map((i) => i.value) || [] };
      }),
      tooltip: { valueSuffix: "人" },
      accessibility: {
        enabled: false
      }
    };
  };

  return (
    <div className="app">
      <h1>🧡 ゆめみ フロントエンドコーディング試験</h1>
  
      {error && <p className="error">{error}</p>}
  
      {selectedPrefectures.length > 0 && prefecturePopulations.length > 0 && (
        <section className="population-section">
          <h3>人口推移グラフ</h3>
  
          <div className="type-selector">
            <select
              className="mobile-select"
              value={selectedPopulationType}
              onChange={(e) => setSelectedPopulationType(e.target.value as PopulationType)}
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
                    onChange={() => setSelectedPopulationType(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
  
          <div className="chart-container">
            <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />
          </div>
        </section>
      )}
  
      {prefectures.length > 0 && (
        <section className="prefectures-section">
          <h2>都道府県一覧</h2>
          <div className="grid-container">
            {prefectures.map((pref) => (
              <label key={pref.prefCode}>
                <input
                  type="checkbox"
                  checked={selectedPrefectures.includes(pref.prefCode)}
                  onChange={() => handlePrefectureChange(pref.prefCode)}
                />
                {pref.prefName}
              </label>
            ))}
          </div>
        </section>
      )}
    </div>
  );  
}

export default App;
