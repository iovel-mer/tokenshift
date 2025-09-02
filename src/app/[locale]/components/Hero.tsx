"use client"
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Play, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Shield, 
  Zap, 
  Globe,
  BarChart3,
  Wallet,
  Award,
  Smartphone
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';


interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  sparkline: number[];
}

interface NewsItem {
  title: string;
  time: string;
  impact: 'positive' | 'negative' | 'neutral';
}


const HeroSection: React.FC = () => {
  const t = useTranslations('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [cryptos] = useState<CryptoData[]>([
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 67234.56,
      change: 2156.78,
      changePercent: 3.32,
      sparkline: [65000, 64500, 66200, 67100, 66800, 67234]
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 3842.19,
      change: -92.34,
      changePercent: -2.35,
      sparkline: [3950, 3920, 3880, 3860, 3845, 3842]
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 178.45,
      change: 12.67,
      changePercent: 7.64,
      sparkline: [165, 170, 175, 176, 177, 178]
    }
  ]);

  const [news] = useState<NewsItem[]>([
    { title: t('news.news1'), time: '2m ago', impact: 'positive' },
    { title: t('news.news2'), time: '5m ago', impact: 'positive' },
    { title: t('news.news3'), time: '12m ago', impact: 'positive' }
  ]);

  useEffect(() => {
    setIsVisible(true);
    
    // Crypto rotation
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % cryptos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [cryptos.length]);

  const features = [
    { icon: Shield, title: t('features.security.title'), desc: t('features.security.desc') },
    { icon: Zap, title: t('features.speed.title'), desc: t('features.speed.desc') },
    { icon: Globe, title: t('features.global.title'), desc: t('features.global.desc') },
    { icon: Eye, title: t('features.realtime.title'), desc: t('features.realtime.desc') }
  ];

  const stats = [
    { label: t('stats.volume.label'), value: t('stats.volume.value'), change: t('stats.volume.change') },
    { label: t('stats.users.label'), value: t('stats.users.value'), change: t('stats.users.change') },
    { label: t('stats.countries.label'), value: t('stats.countries.value'), change: t('stats.countries.change') },
    { label: t('stats.uptime.label'), value: t('stats.uptime.value'), change: t('stats.uptime.change') }
  ];

  const currentCrypto = cryptos[currentIndex];

  return (
    <div className="relative  min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
    
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-emerald-600/10 via-teal-600/5 to-transparent" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

     
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10 lg:py-20">
          
         
          <div className="space-y-8">
          
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-full backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-300 text-sm font-medium">{t('badge.marketCap')}</span>
                </div>
                <div className="w-px h-4 bg-slate-600" />
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">{t('badge.change')}</span>
                </div>
              </div>
            </div>

            {/* Main Headline */}
            <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="block text-white mb-2">{t('title.part1')}</span>
                <span className="block">
                  <span className="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    {t('title.part2')}
                  </span>
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <div className={`transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-2xl">
                {t('subtitle')}
              </p>
            </div>

            {/* Features Grid */}
            <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-800/30 border border-slate-700/50 rounded-2xl backdrop-blur-sm hover:bg-slate-700/40 transition-all duration-300">
                      <div className="p-2 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg">
                        <IconComponent className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{feature.title}</div>
                        <div className="text-slate-400 text-xs">{feature.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

           

            {/* Stats */}
            <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-800">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                    <div className="text-xs text-emerald-400 font-medium">{stat.change}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Trading Dashboard */}
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl">
                
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{t('dashboard.title')}</h3>
                      <p className="text-slate-400 text-sm">{t('dashboard.subtitle')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-emerald-400 text-xs font-medium uppercase">{t('dashboard.live')}</span>
                  </div>
                </div>

                {/* Crypto Ticker */}
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/30 rounded-2xl p-4 border border-slate-600/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                          <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg bg-white">
                            <Image src="/assets/images/btc.png" alt="BTC" width={32} height={32} className="object-contain" />
                          </div>
                          <div className="relative w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg bg-white">
                            <Image src="/assets/images/eth.png" alt="ETH" width={32} height={32} className="object-contain" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-bold">{currentCrypto?.name}</h4>
                          <p className="text-slate-400 text-sm">{t('dashboard.spotTrading')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-xl">
                          ${currentCrypto?.price.toFixed(2)}
                        </div>
                        <div className={`flex items-center justify-end gap-1 ${
                          (currentCrypto?.changePercent || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {(currentCrypto?.changePercent || 0) >= 0 ? 
                            <TrendingUp className="w-4 h-4" /> : 
                            <TrendingDown className="w-4 h-4" />
                          }
                          <span className="font-semibold">
                            {Math.abs(currentCrypto?.changePercent || 0).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="mb-6">
                  <div className="bg-slate-900/50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-slate-300 font-medium">{t('dashboard.chart24h')}</span>
                      <span className="text-emerald-400 text-sm font-medium">+$2,456.78</span>
                    </div>
                    <div className="h-20 flex items-end justify-between gap-1">
                      {currentCrypto?.sparkline.map((value, index) => {
                        const height = ((value - Math.min(...(currentCrypto?.sparkline || []))) / 
                                       (Math.max(...(currentCrypto?.sparkline || [])) - Math.min(...(currentCrypto?.sparkline || [])))) * 100;
                        return (
                          <div
                            key={index}
                            className="bg-gradient-to-t from-emerald-500/60 to-blue-500/60 rounded-t flex-1 transition-all duration-500"
                            style={{ height: `${height}%` }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Portfolio Summary */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-slate-900/50 rounded-xl p-3 text-center">
                    <div className="text-emerald-400 font-bold text-lg">$12.4K</div>
                    <div className="text-slate-400 text-xs">{t('dashboard.balance')}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-3 text-center">
                    <div className="text-blue-400 font-bold text-lg">+15.2%</div>
                    <div className="text-slate-400 text-xs">{t('dashboard.pnl')}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-3 text-center">
                    <div className="text-purple-400 font-bold text-lg">8</div>
                    <div className="text-slate-400 text-xs">{t('dashboard.assets')}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/register">
                    <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25">
                      {t('dashboard.buyCrypto')}
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-slate-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105">
                      {t('dashboard.portfolio')}
                    </button>
                  </Link>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-3 shadow-2xl">
                <div className="flex items-center gap-2 text-white">
                  <Award className="w-4 h-4" />
                  <span className="font-semibold text-sm">{t('floating.topTrader')}</span>
                </div>
              </div>

              {/* News Ticker */}
              <div className="absolute -bottom-8 left-0 right-0 bg-slate-800/90 backdrop-blur-sm border border-slate-700/50 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                  <span className="text-slate-300 text-sm font-medium">{t('news.label')}:</span>
                  <span className="text-slate-400 text-sm">{news[0]?.title}</span>
                  <span className="text-slate-500 text-xs ml-auto">{news[0]?.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/50 to-transparent backdrop-blur-sm border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <span className="text-slate-400 text-sm">{t('bottom.trustedBy')}:</span>
              <div className="flex items-center gap-4">
                {['Coinbase', 'Binance', 'Kraken'].map((exchange) => (
                  <div key={exchange} className="bg-slate-800/50 px-3 py-1 rounded-lg">
                    <span className="text-slate-300 text-sm font-medium">{exchange}</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;