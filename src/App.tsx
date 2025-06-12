import { useState, useEffect } from 'react'
import './App.css'

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

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [selectedPrefecture, setSelectedPrefecture] = useState<number | null>(null)
  const [populationData, setPopulationData] = useState<PopulationComposition[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        const response = await fetch('https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/prefectures', {
          headers: {
            'X-API-KEY': API_KEY
          }
        });
        
        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }

        const data = await response.json();
        setPrefectures(data.result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
    };

    fetchPrefectures();
  }, []);

  useEffect(() => {
    const fetchPopulationData = async (prefCode: number) => {
      try {
        const response = await fetch(
          `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
          {
            headers: {
              'X-API-KEY': API_KEY
            }
          }
        );

        if (!response.ok) {
          throw new Error('人口データの取得に失敗しました');
        }

        const data = await response.json();
        setPopulationData(data.result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
    };

    if (selectedPrefecture) {
      fetchPopulationData(selectedPrefecture);
    }
  }, [selectedPrefecture]);

  const handlePrefectureClick = (prefCode: number) => {
    setSelectedPrefecture(prefCode);
  };

  return (
    <>
      <div>
        {error && <p className="error">{error}</p>}
        {prefectures.length > 0 && (
          <div>
            <h2>都道府県一覧</h2>
            <ul>
              {prefectures.map((prefecture) => (
                <li 
                  key={prefecture.prefCode}
                  onClick={() => handlePrefectureClick(prefecture.prefCode)}
                  style={{ cursor: 'pointer' }}
                >
                  {prefecture.prefName}
                </li>
              ))}
            </ul>
          </div>
        )}

        {selectedPrefecture && populationData.length > 0 && (
          <div>
            <h3>人口構成データ</h3>
            {populationData.map((composition, index) => (
              <div key={index}>
                <h4>{composition.label}</h4>
                <ul>
                  {composition.data.map((item) => (
                    <li key={item.year}>
                      {item.year}年: {item.value.toLocaleString()}人
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default App