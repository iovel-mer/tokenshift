'use client';

import {Link} from '@/i18n/navigation';
import {useLocale, useTranslations} from 'next-intl';
import {Orbit, Menu, X} from 'lucide-react';
import {useState} from 'react';

import {Button} from '@/components/ui/button';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="group/header   sticky top-0 z-50 border-b border-violet-500/20 bg-gradient-to-r from-slate-900/95 via-violet-950/90 to-slate-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/80">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-indigo-500/3 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/10 to-transparent opacity-50" />
        <div className="relative max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          
          {/* Left: Logo */}
          <Link
            href={`/`}
            className="group/logo relative inline-flex items-center gap-2 sm:gap-4"
            aria-label="TokenShift home"
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
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight transition-all duration-300 group-hover/logo:tracking-wide">
                <span className="bg-gradient-to-r from-white via-slate-100 to-white bg-clip-text text-transparent transition-all duration-300 group-hover/logo:from-indigo-200 group-hover/logo:to-purple-200">
                  Token
                </span>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent transition-all duration-300 group-hover/logo:from-indigo-300 group-hover/logo:via-purple-300 group-hover/logo:to-fuchsia-300">
                  Shift
                </span>
              </span>
              <div className="h-0.5 w-0 bg-gradient-to-r from-indigo-400 to-fuchsia-400 transition-all duration-500 group-hover/logo:w-full" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex  items-center gap-2">
            
            {/* Login Button */}
            <Button 
              asChild 
              variant="ghost" 
              className="group/login relative h-10 overflow-hidden rounded-xl bg-transparent px-6 font-medium text-white/90 transition-all duration-300 hover:bg-transparent hover:text-white"
            >
              <Link href={`
                /login`} className="relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-0 transition-opacity duration-300 group-hover/login:opacity-100" />
                <div className="absolute inset-0 bg-violet-500/5 opacity-0 transition-all duration-300 group-hover/login:opacity-100 group-hover/login:scale-105" />
                <span className="relative">{t('login')}</span>
              </Link>
            </Button>
            
            {/* Register Button */}
            <Button 
              asChild 
              className="group/register relative h-10 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-600 px-6 font-semibold text-white shadow-xl shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40"
            >
              <Link href={`
                /register`} className="relative z-10 flex items-center gap-2">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover/register:opacity-100" />
                <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-75 blur-sm" />
                <span className="relative">{t('register')}</span>
                <div className="relative h-1.5 w-1.5 rounded-full bg-white/60 transition-all duration-300 group-hover/register:bg-white group-hover/register:scale-125" />
              </Link>
            </Button>
            
            {/* Language Switcher Container */}
            <div className="ml-2 rounded-xl bg-white/5 p-1 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Language Switcher */}
            <div className="rounded-lg bg-white/5 p-0.5 backdrop-blur-sm">
              <LanguageSwitcher />
            </div>
            
            {/* Hamburger Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="group/menu relative h-10 w-10 rounded-xl bg-white/5 p-0 text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-0 transition-opacity duration-300 group-hover/menu:opacity-100 rounded-xl" />
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 transition-transform duration-300 rotate-0 group-hover/menu:rotate-90" />
              ) : (
                <Menu className="h-5 w-5 transition-transform duration-300 group-hover/menu:scale-110" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover/header:opacity-100" />
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Panel */}
          <div className="absolute top-16 right-0 left-0 bg-gradient-to-b from-slate-900/98 via-violet-950/95 to-slate-900/98 border-b border-violet-500/20 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-indigo-500/3 to-transparent" />
            <nav className="relative p-4 space-y-4">
              
              {/* Mobile Login Button */}
              <Button 
                asChild 
                variant="ghost" 
                className="group/login-mobile w-full h-12 justify-start rounded-xl bg-white/5 px-6 font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
                onClick={closeMobileMenu}
              >
                <Link href={`/${locale}/login`} className="relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 opacity-0 transition-opacity duration-300 group-hover/login-mobile:opacity-100 rounded-xl" />
                  <span className="relative">{t('login')}</span>
                </Link>
              </Button>
              
              {/* Mobile Register Button */}
              <Button 
                asChild 
                className="group/register-mobile w-full h-12 justify-start rounded-xl bg-gradient-to-r from-indigo-500 via-purple-600 to-fuchsia-600 px-6 font-semibold text-white shadow-xl shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40"
                onClick={closeMobileMenu}
              >
                <Link href={`/${locale}/register`} className="relative z-10 flex items-center gap-3">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 opacity-0 transition-opacity duration-300 group-hover/register-mobile:opacity-100 rounded-xl" />
                  <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-75 blur-sm" />
                  <span className="relative">{t('register')}</span>
                  <div className="relative h-1.5 w-1.5 rounded-full bg-white/60 transition-all duration-300 group-hover/register-mobile:bg-white group-hover/register-mobile:scale-125" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}