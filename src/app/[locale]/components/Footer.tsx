'use client';
import { Orbit } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
    const locale = useLocale();
    const t = useTranslations('footer');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
     const projectName = process.env.NEXT_PUBLIC_BASE_NAME;
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent)]"></div>
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
            
            <div className="relative max-w-7xl mx-auto px-6 py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link
                            href={`/${locale}`}
                            className="group/logo relative inline-flex items-center gap-2 sm:gap-4"
                            aria-label={t('brandName')}
                            onClick={closeMobileMenu}
                        >
                            {/* Logo Icon */}
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-br from-indigo-400 via-purple-500 to-fuchsia-600 opacity-75 blur-sm" />
                                <span className="relative grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-600 to-fuchsia-700 text-white shadow-2xl shadow-purple-500/40 ring-1 ring-white/20 transition-all duration-300 group-hover/logo:scale-110 group-hover/logo:rotate-12 group-hover/logo:shadow-purple-500/60">
                                    <Orbit className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover/logo:rotate-180" />
                                </span>
                            </div>
                            
                            {/* Brand Text */}
                            <div className="flex flex-col ">
                                <span className="text-xl sm:text-2xl font-black tracking-tight transition-all duration-300 group-hover/logo:tracking-wide ">
                                    <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent transition-all duration-300 group-hover/logo:from-indigo-200 group-hover/logo:to-purple-200">
                                        {projectName}
                                    </span>
                                    
                                </span>
                                <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-400 to-fuchsia-400 transition-all duration-500 group-hover/logo:w-full" />
                            </div>
                        </Link>
                        
                        <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                           {projectName} {t('description')}
                        </p>
                        
                    
                    </div>
                    
                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">{t('company.title')}</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    href={`/${locale}/company/about`} 
                                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {t('company.aboutUs')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                   href={`/${locale}/company/security`} 
                                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {t('company.security')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Terms Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">{t('terms.title')}</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link  href={`/${locale}/termsof/terms`} 
                                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {t('terms.termsOfService')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={`/${locale}/termsof/privacy`}
                                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {t('terms.privacyPolicy')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={`/${locale}/termsof/cookie`}
                                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {t('terms.cookiePolicy')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">{t('support.title')}</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    href={`/${locale}/support/help`}
                                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {t('support.helpCenter')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={`/${locale}/support/contact`} 
                                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {t('support.contactUs')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">{t('resources.title')}</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link 
                                    href={`/${locale}/resources/blog`}
                                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {t('resources.blog')}
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={`/${locale}/resources/docs`}
                                    className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center group"
                                >
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    {t('resources.documentation')}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Regulatory Information */}
                <div className="border-t border-slate-700/50 pt-12 mb-8">
                    <div className="bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-2xl p-6 border border-slate-600/20 backdrop-blur-sm">
                        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                            <p>
                                <span className="text-white font-medium">{projectName}</span> {t('regulatory.tradingName')}{' '}
                                <span className="text-blue-300">Raw Trading Ltd</span>, {t('regulatory.regulated')}{' '}
                                <span className="text-blue-300">{t('regulatory.authority')}</span> {t('regulatory.withLicense')}{' '}
                                <span className="text-blue-300 font-mono">SD016</span>.
                            </p>
                            
                            <p className="flex items-start">
                                <span className="inline-flex items-center justify-center w-5 h-5 bg-amber-500/20 rounded-full mr-3 mt-0.5 flex-shrink-0">
                                    <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                                    </svg>
                                </span>
                                <span>
                                    <strong className="text-amber-300">{t('regulatory.riskWarning.title')}</strong> {t('regulatory.riskWarning.text')}
                                </span>
                            </p>
                            
                            <p>
                                {t('regulatory.tradeExecution')}
                            </p>
                            
                            <p className="text-blue-300">
                                {t('regulatory.ageRequirement')}
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-700/50">
                    <div className="text-slate-400 text-sm mb-4 md:mb-0">
                      © {new Date().getFullYear()} {projectName}  {t('copyright')}
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center text-slate-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                            {t('systemStatus.operational')}
                        </div>
                        <div className="text-slate-500">|</div>
                        <Link href="/status" className="text-slate-400 hover:text-white transition-colors">
                            {t('systemStatus.status')}
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;