'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle,
  Calendar,
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  MapPin,
  Languages,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/app/api/auth/postRegister';
import Link from 'next/link';


// ---- Types ----
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  country: string;
  language: string;
  dateOfBirth: string; 
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  password?: string;
  phone?: string;
  country?: string;
  language?: string;
  dateOfBirth?: string;
  general?: string;
}


const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isValidPhone = (phone: string) => {

  const cleaned = phone.trim().replace(/[^\d+]/g, '');
  return /^\+?[1-9]\d{6,15}$/.test(cleaned);
};

const isValidUsername = (username: string) => /^[a-zA-Z0-9_]{3,20}$/.test(username);


const isValidName = (name: string) => /^[\p{L}\s'-]{2,30}$/u.test(name);

const calculateAge = (iso: string) => {
  if (!iso) return 0;
  const [y, m, d] = iso.split('-').map(Number);
  const today = new Date();
  let age = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || ((today.getMonth() + 1 === m) && today.getDate() < d)) age--;
  return age;
};

const Registration: React.FC = () => {
  const t = useTranslations('registration');
  const locale = useLocale();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    country: '',
    language: 'English',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [bootLoading, setBootLoading] = useState<boolean>(true);   
  const [submitLoading, setSubmitLoading] = useState<boolean>(false); 
  const [countries, setCountries] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  
  useEffect(() => {
    (async () => {
      try {
        setBootLoading(true);

        
        let userCountry = 'United States';
        try {
          const loc = await fetch('https://ipapi.co/json/').then(r => r.json());
          if (loc?.country_name) userCountry = String(loc.country_name);
        } catch {
         
        }

    
        let countryList: string[] = [];
        let languageList: string[] = [];
        try {
          const resp = await fetch('https://restcountries.com/v3.1/all?fields=name,languages');
          const all = await resp.json();

          const names: string[] = all
            .map((c: any) => c?.name?.common)
            .filter((n: unknown): n is string => typeof n === 'string')
            .sort((a: string, b: string) => a.localeCompare(b));

         
          countryList = [userCountry, ...names.filter(n => n !== userCountry)];

          const langSet = new Set<string>();
          all.forEach((c: any) => {
            if (c?.languages) {
              Object.values(c.languages).forEach((l: any) => {
                if (typeof l === 'string') langSet.add(l);
              });
            }
          });

          
          const rest = [...langSet].filter(l => l !== 'English' && l !== 'German').sort((a, b) => a.localeCompare(b));
          languageList = ['English', 'German', ...rest];
        } catch {
          // Fallback minimal lists
          countryList = [userCountry, 'Germany', 'Netherlands', 'Spain', 'France'];
          languageList = ['English', 'German', 'Dutch', 'Spanish', 'French'];
        }

        setCountries(countryList);
        setLanguages(languageList);
        setFormData(prev => ({ ...prev, country: userCountry, language: 'English' }));
      } finally {
        setBootLoading(false);
      }
    })();
  }, []);

  // ---- Validation ----
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = t('errors.firstNameRequired');
    else if (!isValidName(formData.firstName)) newErrors.firstName = t('errors.invalidFirstName');

    if (!formData.lastName.trim()) newErrors.lastName = t('errors.lastNameRequired');
    else if (!isValidName(formData.lastName)) newErrors.lastName = t('errors.invalidLastName');

    if (!formData.email.trim()) newErrors.email = t('errors.emailRequired');
    else if (!isValidEmail(formData.email)) newErrors.email = t('errors.invalidEmail');

    if (!formData.username.trim()) newErrors.username = t('errors.usernameRequired');
    else if (!isValidUsername(formData.username)) newErrors.username = t('errors.invalidUsername');

    if (!formData.password.trim()) newErrors.password = t('errors.passwordRequired');
    else if (formData.password.length < 8) newErrors.password = t('errors.passwordLength');

    if (!formData.phone.trim()) newErrors.phone = t('errors.phoneRequired');
    else if (!isValidPhone(formData.phone)) newErrors.phone = t('errors.invalidPhone');

    if (!formData.country.trim()) newErrors.country = t('errors.countryRequired');
    if (!formData.language.trim()) newErrors.language = t('errors.languageRequired');

    if (!formData.dateOfBirth) newErrors.dateOfBirth = t('errors.dateOfBirthRequired');
    else if (calculateAge(formData.dateOfBirth) < 18) newErrors.dateOfBirth = t('errors.ageRestriction');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!validateForm()) return;

  setSubmitLoading(true);
  setErrors({});

  try {
    const payload = {
      ...formData,
      phone: formData.phone.trim().replace(/[^\d+]/g, ""),
    };

    const { ok, status, data } = await registerUser(payload);

    if (!ok) {
      const newErrors: FormErrors = {};
      if (data?.errors) {
        if (Array.isArray(data.errors)) {
          data.errors.forEach((e: any) => {
            if (e.field && e.message) (newErrors as any)[e.field] = e.message;
          });
        } else if (typeof data.errors === "object") {
          Object.assign(newErrors, data.errors);
        }
      }
      if (!Object.keys(newErrors).length) {
        newErrors.general = data?.message || `Registration failed (${status})`;
      }
      setErrors(newErrors);
      return;
    }

    router.push(`/${locale}/login?registered=true`);
  } catch {
    setErrors({ general: "Network error. Please try again." });
  } finally {
    setSubmitLoading(false);
  }
};


  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const handleGoBack = () => router.back();
  const handleGoToLogin = () => router.push(`/${locale}/login`);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row">
       
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
          
            <Link href={`/${locale}`}>
              <button
              
                className="flex items-center cursor-pointer gap-2 text-slate-400 hover:text-white mb-8 transition-colors duration-200"
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('backToHome')}</span>
              </button>
            </Link>

          
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{t('title')}</h1>
              <p className="text-slate-400 text-lg">{t('subtitle')}</p>
            </div>

           
            <form className="space-y-6" onSubmit={onSubmit} noValidate>
            
              {errors.general && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-sm">{errors.general}</p>
                </div>
              )}

            
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                    {t('fields.firstName')}
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={t('placeholders.firstName')}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                        errors.firstName ? 'border-red-500' : 'border-slate-600'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                    />
                  </div>
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                    {t('fields.lastName')}
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                      id="lastName"
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={t('placeholders.lastName')}
                      className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                        errors.lastName ? 'border-red-500' : 'border-slate-600'
                      } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                    />
                  </div>
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  {t('fields.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.email')}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                      errors.email ? 'border-red-500' : 'border-slate-600'
                    } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

             
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                  {t('fields.username')}
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.username')}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                      errors.username ? 'border-red-500' : 'border-slate-600'
                    } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                  />
                </div>
                {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
              </div>

              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  {t('fields.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.password')}
                    className={`w-full pl-10 pr-12 py-3 bg-slate-800/50 border ${
                      errors.password ? 'border-red-500' : 'border-slate-600'
                    } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

            
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                  {t('fields.phone')}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('placeholders.phone')}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                      errors.phone ? 'border-red-500' : 'border-slate-600'
                    } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                  />
                </div>
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>

             
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-2">
                    {t('fields.country')}
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled={bootLoading}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 appearance-none disabled:opacity-50"
                    >
                      {bootLoading ? (
                        <option value="">{t('loading')}</option>
                      ) : (
                        countries.map(country => (
                          <option key={country} value={country} className="bg-slate-800">
                            {country}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  {errors.country && <p className="text-red-400 text-sm mt-1">{errors.country}</p>}
                </div>

                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-slate-300 mb-2">
                    {t('fields.language')}
                  </label>
                  <div className="relative">
                    <Languages className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      disabled={bootLoading}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 appearance-none disabled:opacity-50"
                    >
                      {bootLoading ? (
                        <option value="">{t('loading')}</option>
                      ) : (
                        languages.map(language => (
                          <option key={language} value={language} className="bg-slate-800">
                            {language}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                  {errors.language && <p className="text-red-400 text-sm mt-1">{errors.language}</p>}
                </div>
              </div>

             
              <div>
                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-300 mb-2">
                  {t('fields.dateOfBirth')}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <input
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-slate-600'
                    } rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200`}
                  />
                </div>
                {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              
              <button
                type="submit"
                disabled={submitLoading}
                className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-lg shadow-purple-500/25 disabled:cursor-not-allowed disabled:transform-none"
                aria-busy={submitLoading}
              >
                {submitLoading ? t('loading') : t('createAccount')}
              </button>
            </form>

           
            <div className="text-center mt-6">
              <span className="text-slate-400">{t('alreadyHaveAccount')} </span>
              <button
                onClick={handleGoToLogin}
                className="text-purple-400 cursor-pointer hover:text-purple-300 font-medium transition-colors duration-200"
                type="button"
              >
                {t('signIn')}
              </button>
            </div>
          </div>
        </div>

       
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
          <div className="max-w-md text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">{t('rightSide.title')}</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{t('rightSide.benefits.benefit1')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{t('rightSide.benefits.benefit2')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{t('rightSide.benefits.benefit3')}</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{t('rightSide.benefits.benefit4')}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">{t('rightSide.stats.stat1.value')}</div>
                <div className="text-sm text-slate-400">{t('rightSide.stats.stat1.label')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">{t('rightSide.stats.stat2.value')}</div>
                <div className="text-sm text-slate-400">{t('rightSide.stats.stat2.label')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">{t('rightSide.stats.stat3.value')}</div>
                <div className="text-sm text-slate-400">{t('rightSide.stats.stat3.label')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
