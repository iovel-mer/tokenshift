import React from 'react';
import { TrendingUp, Shield, Zap, DollarSign, Headphones, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Trading = () => {
  const t = useTranslations('trading');
  const features = [
    {
      icon: TrendingUp,
      title: t('features.smartTrading.title'),
      description: t('features.smartTrading.description'),
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-500"
    },
    {
      icon: Shield,
      title: t('features.enterpriseSecurity.title'),
      description: t('features.enterpriseSecurity.description'),
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-500"
    },
    {
      icon: Zap,
      title: t('features.instantExecution.title'),
      description: t('features.instantExecution.description'),
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-500"
    },
    {
      icon: DollarSign,
      title: t('features.zeroCommission.title'),
      description: t('features.zeroCommission.description'),
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-500"
    },
    {
      icon: Headphones,
      title: t('features.expertSupport.title'),
      description: t('features.expertSupport.description'),
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-500"
    },
    {
      icon: Globe,
      title: t('features.worldwideMarkets.title'),
      description: t('features.worldwideMarkets.description'),
      color: "from-violet-400 to-purple-500",
      bgColor: "bg-violet-500"
    }
  ];

  return (
    <section className="relative min-h-screen  py-16 lg:py-24">
    {/* background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 -z-10 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-indigo-700/20 blur-3xl" />
      <div className="absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-purple-100/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-300 font-medium text-sm lg:text-base">{t('badge')}</span>
          </div>
          
          <h1 className="text-xl sm:text-3xl lg:text-5xl font-black tracking-tight mb-6">
            <span className="block text-white">{t('title.part1')}</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('title.part2')}
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Card Background with Gradient Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 h-full transition-all duration-500 group-hover:transform group-hover:scale-[1.02] group-hover:bg-slate-800/95">
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-2xl ${feature.bgColor} bg-opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:bg-opacity-30`}>
                      <IconComponent className={`w-7 h-7 lg:w-8 lg:h-8 text-white group-hover:scale-110 transition-transform duration-500`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm lg:text-base">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-slate-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-slate-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            );
          })}
        </div>

    
      </div>
    </section>
  );
};

export default Trading;