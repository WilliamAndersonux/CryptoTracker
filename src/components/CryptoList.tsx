import React from 'react';
import { CryptoCurrency } from '../types';

interface CryptoListProps {
  cryptos: CryptoCurrency[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptos, favorites, onToggleFavorite }) => {
  return (
    <div>
      <h2 style={{ color: 'white', fontSize: '2.2em', marginBottom: '30px', fontWeight: '300' }}>
        Top Cryptocurrencies
      </h2>
      <div className="crypto-list">
        {cryptos.map((crypto) => (
          <div key={crypto.id} className="crypto-item">
            <div className="crypto-header">
              <div className="crypto-name">
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </div>
              <button 
                className={`favorite-btn ${favorites.includes(crypto.id) ? 'favorited' : ''}`}
                onClick={() => onToggleFavorite(crypto.id)}
              >
                {favorites.includes(crypto.id) ? '★' : '☆'}
              </button>
            </div>
            <div className="crypto-price">
              ${crypto.current_price.toFixed(2)}
            </div>
            <div className={`crypto-change ${
              (crypto.price_change_percentage_24h || 0) >= 0 ? 'positive' : 'negative'
            }`}>
              {(crypto.price_change_percentage_24h || 0) >= 0 ? '↗' : '↘'} 
              {Math.abs(crypto.price_change_percentage_24h || 0).toFixed(2)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;