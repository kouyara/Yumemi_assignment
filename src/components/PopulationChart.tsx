import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import type { PrefecturePopulation } from "../hooks/usePrefecturePopulations";

export type PopulationType = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";

interface PopulationChartProps {
  prefecturePopulations: PrefecturePopulation[];
  selectedPrefectures: number[];
  selectedPopulationType: PopulationType;
}

const PopulationChart: React.FC<PopulationChartProps> = ({
  prefecturePopulations,
  selectedPrefectures,
  selectedPopulationType,
}) => {
  const filteredPopulations = prefecturePopulations.filter((pref) =>
    selectedPrefectures.includes(pref.prefCode)
  );
  const years = filteredPopulations[0]?.data[0]?.data.map((item) => item.year) || [];
  const options = {
    title: { text: `${selectedPopulationType}の推移` },
    xAxis: { title: { text: "年" }, categories: years },
    yAxis: { title: { text: "人口" } },
    series: filteredPopulations.map((pref) => {
      const pop = pref.data.find((d) => d.label === selectedPopulationType);
      return { name: pref.prefName, data: pop?.data.map((i) => i.value) || [] };
    }),
    tooltip: { valueSuffix: "人" },
    accessibility: { enabled: false },
  };
  return (
    <div className="chart-container">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PopulationChart;
