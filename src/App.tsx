import React, { useState, useEffect } from 'react';
import './App.css';
import CryptoList from './components/CryptoList';
import SearchBar from './components/SearchBar';
import { CryptoCurrency } from './types';
import { getCryptocurrencies } from './services/api';

function App() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<CryptoCurrency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setError(null);
        const data = await getCryptocurrencies(50);
        setCryptos(data);
        setFilteredCryptos(data);
      } catch (error) {
        console.error('Failed to fetch cryptocurrencies:', error);
        setError('Failed to load cryptocurrency data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, []);

  useEffect(() => {
    const filtered = cryptos.filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [cryptos, searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CryptoTracker</h1>
        <p>Track your favorite cryptocurrencies</p>
      </header>
      <main>
        {loading ? (
          <div style={{ color: 'white', fontSize: '1.2em' }}>
            <div className="loading-spinner"></div>
            <p>Loading cryptocurrency data...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button className="retry-btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        ) : (
          <>
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            {filteredCryptos.length === 0 && searchTerm ? (
              <p style={{ color: 'white', fontSize: '1.1em', marginTop: '20px' }}>
                No cryptocurrencies found matching "{searchTerm}"
              </p>
            ) : (
              <CryptoList cryptos={filteredCryptos} favorites={favorites} onToggleFavorite={toggleFavorite} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;