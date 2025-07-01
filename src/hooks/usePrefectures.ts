import { useState, useEffect } from "react";

export interface Prefecture {
  prefCode: number;
  prefName: string;
}

const API_KEY = import.meta.env.VITE_API_KEY;

export function usePrefectures() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [error, setError] = useState<string | null>(null);

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

  return { prefectures, error };
}
