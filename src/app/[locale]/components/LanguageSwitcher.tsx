'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {Button} from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

type Locale = 'en' | 'es' | 'de';

const META: Record<Locale, {label: string; flag: string; country: string}> = {
  en: {label: 'EN', flag: 'us', country: 'English'},
  es: {label: 'ES', flag: 'es', country: 'Español'},
  de: {label: 'DE', flag: 'de', country: 'Deutsch'}
};

export default function LanguageSwitcher() {
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  // swap language on the current route; replace avoids adding history entries
  const change = (next: Locale) => {
    if (next === current) return;
    router.replace(pathname, {locale: next});
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-xl gap-2 h-10 px-4 hover:bg-slate-700 transition-colors bg-slate-800 border-slate-600 shadow-sm text-white hover:text-white"
        >
          <span className={`fi fi-${META[current].flag} text-xl rounded-xl overflow-hidden w-6 h-6 flex items-center justify-center`} style={{borderRadius: '50%', minWidth: '20px', minHeight: '20px'}}></span>
          <span className="font-medium text-sm">{META[current].country}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40 p-1 border border-slate-600 shadow-lg rounded-lg bg-slate-800"
      >
        {(Object.keys(META) as Locale[]).map((code) => (
          <DropdownMenuItem
            key={code}
            onClick={() => change(code)}
            className={`cursor-pointer gap-2  py-2.5 rounded  hover:bg-slate-700 transition-colors text-white ${
              current === code ? 'bg-blue-600 text-white' : ''
            }`}
          >
            <span className={`fi fi-${META[code].flag} text-xl rounded-xl flex-shrink-0 mr-8  overflow-hidden w-6 h-6 flex items-center justify-center`} style={{borderRadius: '25%', minWidth: '15px', minHeight: '15px'}}></span>
            <span className="font-medium text-sm">{META[code].country}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}