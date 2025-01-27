import axios from 'axios';
import { CryptoCurrency } from '../types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCryptocurrencies = async (limit: number = 10): Promise<CryptoCurrency[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};

export const getCryptocurrencyById = async (id: string): Promise<CryptoCurrency> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/coins/markets?vs_currency=usd&ids=${id}&sparkline=false`
    );
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching cryptocurrency ${id}:`, error);
    throw error;
  }
};