"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, Cookie as CookieIcon, Settings, BarChart3 } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Cookie() {
  const t = useTranslations("cookies");
  const locale = useLocale();
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          {/* Back to Home (section button, same classes you used) */}
          <div className="mb-15">
            <button
              type="button"
              onClick={() => router.push(`/${locale}`)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/10"
            >
              <ArrowLeft className="size-4" />
              {t("backToHome")}
            </button>
          </div>

          {/* Header */}
          <header className="max-w-3xl">
            <p className="mb-3 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest">
              {t("badge")}
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-white/80">{t("subtitle")}</p>
          </header>

          {/* Compact 3-card layout */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Types */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <CookieIcon className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.types.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.types.items.essential")}</li>
                <li>{t("cards.types.items.analytics")}</li>
                <li>{t("cards.types.items.preferences")}</li>
              </ul>
            </div>

            {/* How we use */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <BarChart3 className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.use.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.use.items.security")}</li>
                <li>{t("cards.use.items.performance")}</li>
                <li>{t("cards.use.items.features")}</li>
              </ul>
            </div>

            {/* Your choices */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Settings className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.choices.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.choices.items.acceptAll")}</li>
                <li>{t("cards.choices.items.reject")}</li>
                <li>{t("cards.choices.items.manage")}</li>
              </ul>
              <p className="mt-3 text-sm text-white/65">{t("cards.choices.note")}</p>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-center text-white/80">{t("footnote")}</p>
            <p className="mt-2 text-center text-xs text-white/60">{t("lastUpdated")}</p>
          </div>
        </section>
        <Footer/>
      </main>
    </>
  );
}
