import { useState, useEffect } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
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

interface PrefecturePopulation {
  prefCode: number;
  prefName: string;
  data: PopulationComposition[];
}

type PopulationType = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([])
  const [prefecturePopulations, setPrefecturePopulations] = useState<PrefecturePopulation[]>([])
  const [selectedPopulationType, setSelectedPopulationType] = useState<PopulationType>('総人口')
  const [error, setError] = useState<string | null>(null)

  const populationTypes: PopulationType[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

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
        const prefName = prefectures.find(p => p.prefCode === prefCode)?.prefName || '';
        
        setPrefecturePopulations(prev => {
          const newData = [...prev];
          const index = newData.findIndex(p => p.prefCode === prefCode);
          if (index === -1) {
            newData.push({
              prefCode,
              prefName,
              data: data.result.data
            });
          }
          return newData;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'エラーが発生しました');
      }
    };

    selectedPrefectures.forEach(prefCode => {
      if (!prefecturePopulations.some(p => p.prefCode === prefCode)) {
        fetchPopulationData(prefCode);
      }
    });
  }, [selectedPrefectures, prefectures]);

  const handlePrefectureChange = (prefCode: number) => {
    setSelectedPrefectures(prev => {
      if (prev.includes(prefCode)) {
        return prev.filter(code => code !== prefCode);
      } else {
        return [...prev, prefCode];
      }
    });
  };

  const getChartOptions = () => {
    const years = prefecturePopulations[0]?.data[0]?.data.map(item => item.year) || [];

    return {
      title: {
        text: `${selectedPopulationType}の推移`
      },
      xAxis: {
        title: {
          text: '年'
        },
        categories: years
      },
      yAxis: {
        title: {
          text: '人口'
        }
      },
      series: prefecturePopulations.map(prefecture => {
        const populationData = prefecture.data.find(d => d.label === selectedPopulationType);
        return {
          name: prefecture.prefName,
          data: populationData?.data.map(item => item.value) || []
        };
      }),
      tooltip: {
        valueSuffix: '人'
      }
    };
  };

  return (
    <>
      <h1>🧡 ゆめみ フロントエンドコーディング試験</h1>
      <div>
        {error && <p className="error">{error}</p>}
        {prefectures.length > 0 && (
          <div>
            <h2>都道府県一覧</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
              {prefectures.map((prefecture) => (
                <label key={prefecture.prefCode} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <input
                    type="checkbox"
                    checked={selectedPrefectures.includes(prefecture.prefCode)}
                    onChange={() => handlePrefectureChange(prefecture.prefCode)}
                  />
                  {prefecture.prefName}
                </label>
              ))}
            </div>
          </div>
        )}

        {selectedPrefectures.length > 0 && prefecturePopulations.length > 0 && (
          <div>
            <h3>人口推移グラフ</h3>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                {populationTypes.map((type) => (
                  <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
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
            <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
              <HighchartsReact
                highcharts={Highcharts}
                options={getChartOptions()}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App