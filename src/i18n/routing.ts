import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'de'] as const,
  defaultLocale: 'en'
});
export type AppLocale = (typeof routing.locales)[number];
