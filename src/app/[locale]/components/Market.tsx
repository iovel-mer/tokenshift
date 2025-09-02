"use client"
import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, Zap, RefreshCw, Clock, Signal } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Types
interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_24h: number;
  market_cap: number;
  volume_24h: number;
  image: string;
}

const Market = () => {
  const t = useTranslations('market');
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // API fetch function
  const fetchMarketData = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1&sparkline=false&price_change_percentage=24h'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }
      
      const data = await response.json();
      setCoins(data);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Fallback mock data
      setCoins([
        {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          current_price: 67234,
          price_change_percentage_24h: 2.45,
          price_change_24h: 1605,
          market_cap: 1320000000000,
          volume_24h: 28500000000,
          image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
        },
        {
          id: 'ethereum',
          symbol: 'eth',
          name: 'Ethereum',
          current_price: 3842,
          price_change_percentage_24h: -1.23,
          price_change_24h: -47,
          market_cap: 462000000000,
          volume_24h: 15200000000,
          image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
        }
      ]);
      setLoading(false);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial load and auto-refresh
  useEffect(() => {
    fetchMarketData();
    
    // Refresh every 15 seconds
    const interval = setInterval(fetchMarketData, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    if (price < 1) {
      return `$${price.toFixed(6)}`;
    } else if (price < 10) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
            <p className="text-slate-300 mt-4">{t('loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full mb-6">
            <Signal className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-sm font-medium">{t('badge')}</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            {t('title')}
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            {t('subtitle')}
          </p>

          {/* Last Update Info */}
          <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{t('lastUpdate')}: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <button 
              onClick={fetchMarketData}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{t('refresh')}</span>
            </button>
          </div>
        </div>

        {/* Market Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coins.map((coin, index) => {
            const isPositive = coin.price_change_percentage_24h > 0;
            const changeColor = isPositive ? 'text-emerald-400' : 'text-red-400';
            const bgGradient = isPositive 
              ? 'from-emerald-500/10 to-green-500/5' 
              : 'from-red-500/10 to-pink-500/5';
            const borderColor = isPositive ? 'border-emerald-500/20' : 'border-red-500/20';
            
            return (
              <div
                key={coin.id}
                className={`relative group bg-gradient-to-br ${bgGradient} backdrop-blur-xl border ${borderColor} rounded-3xl p-6 hover:scale-105 transition-all duration-300 shadow-2xl`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Coin Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={coin.image} 
                        alt={coin.name}
                        className="w-12 h-12 rounded-full shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `https://via.placeholder.com/48/6366f1/white?text=${coin.symbol.toUpperCase()}`;
                        }}
                      />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">{coin.name}</h3>
                      <p className="text-slate-400 text-sm uppercase">{coin.symbol}</p>
                    </div>
                  </div>
                  
                  {/* Trend Icon */}
                  <div className={`p-2 rounded-xl ${isPositive ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                    {isPositive ? (
                      <TrendingUp className={`w-5 h-5 ${changeColor}`} />
                    ) : (
                      <TrendingDown className={`w-5 h-5 ${changeColor}`} />
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-3xl font-black text-white mb-2">
                    {formatPrice(coin.current_price)}
                  </div>
                  <div className="text-sm text-slate-400 mb-1">{t('currentPrice')}</div>
                </div>

                {/* Price Movement */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-slate-400 text-sm">{t('change24h')}</span>
                  <div className="text-right">
                    <div className={`${changeColor} font-bold text-lg`}>
                      {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                    </div>
                    <div className={`${changeColor} text-sm`}>
                      {isPositive ? '+' : ''}${Math.abs(coin.price_change_24h).toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Market Cap */}
                <div className="pt-4 border-t border-slate-700/50">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm">{t('marketCap')}</span>
                    <span className="text-slate-300 font-medium">
                      {formatMarketCap(coin.market_cap)}
                    </span>
                  </div>
                </div>

                {/* Pulse Animation */}
                <div className="absolute top-4 right-4">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{t('stats.updates.value')}</div>
            <div className="text-slate-400">{t('stats.updates.label')}</div>
          </div>
          
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{t('stats.accuracy.value')}</div>
            <div className="text-slate-400">{t('stats.accuracy.label')}</div>
          </div>
          
          <div className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <div className="flex items-center justify-center mb-4">
              <Signal className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{t('stats.sources.value')}</div>
            <div className="text-slate-400">{t('stats.sources.label')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Market;