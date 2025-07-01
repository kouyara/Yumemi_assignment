import { useState, useEffect } from "react";
import type { Prefecture } from "./usePrefectures";

export interface PopulationData {
  year: number;
  value: number;
}

export interface PopulationComposition {
  label: string;
  data: PopulationData[];
}

export interface PrefecturePopulation {
  prefCode: number;
  prefName: string;
  data: PopulationComposition[];
}

const API_KEY = import.meta.env.VITE_API_KEY;

export function usePrefecturePopulations(selectedPrefectures: number[], prefectures: Prefecture[]) {
  const [prefecturePopulations, setPrefecturePopulations] = useState<PrefecturePopulation[]>([]);
  const [error, setError] = useState<string | null>(null);

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
        setPrefecturePopulations((prev) => [
          ...prev,
          { prefCode, prefName, data: data.result.data },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "エラーが発生しました");
      }
    };

    for (const prefCode of selectedPrefectures) {
      if (!prefecturePopulations.some((p) => p.prefCode === prefCode)) {
        fetchPopulationData(prefCode);
      }
    }
  }, [selectedPrefectures, prefectures]);

  return { prefecturePopulations, error };
}
