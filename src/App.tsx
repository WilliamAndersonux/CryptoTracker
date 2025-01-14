import React, { useState, useEffect } from 'react';
import './App.css';
import CryptoList from './components/CryptoList';
import { CryptoCurrency } from './types';
import { getCryptocurrencies } from './services/api';

function App() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const data = await getCryptocurrencies(10);
        setCryptos(data);
      } catch (error) {
        console.error('Failed to fetch cryptocurrencies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>CryptoTracker</h1>
        <p>Track your favorite cryptocurrencies</p>
      </header>
      <main>
        {loading ? <p>Loading...</p> : <CryptoList cryptos={cryptos} />}
      </main>
    </div>
  );
}

export default App;