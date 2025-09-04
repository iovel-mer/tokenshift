"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Home, Shield, TrendingUp, Lightbulb } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Documentation() {
  const locale = useLocale();
  const t = useTranslations("docs");

  return (
    <>
      <Header />

      {/* BLOG-STYLE BACKGROUND + SPACING */}
      <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          {/* BLOG-STYLE BACK BUTTON */}
          <div className="mb-8">
            <Link
              href={`/${locale}`}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/10"
            >
              <Home className="size-4" />
              <span className="hidden sm:inline">{t("backToHome")}</span>
              <ArrowRight className="size-4 rotate-180" />
            </Link>
          </div>

          {/* BLOG-STYLE PAGE TITLE */}
          <div className="text-left mb-10 sm:mb-12 lg:mb-16 max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-3 text-white/80 text-base sm:text-lg">
              {/* optional subtitle/excerpt if you add it later */}
            </p>
          </div>

          {/* CONTENT SECTIONS — BLOG CARD STYLE */}
          <div className="mx-auto mt-4 sm:mt-6 lg:mt-8 space-y-6 sm:space-y-8">
            {[
              {
                icon: (
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
                ),
                title: t("blockchain.title"),
                text: t("blockchain.text"),
              },
              {
                icon: (
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
                ),
                title: t("popular.title"),
                content: (
                  <ul className="space-y-3 text-white/80 text-sm sm:text-base">
                    <li className="flex items-start gap-3">
                      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60"></div>
                      <span>
                        <strong className="text-white">Bitcoin (BTC):</strong>{" "}
                        {t("popular.bitcoin")}
                      </span>
                    </li>
                  </ul>
                ),
              },
              {
                icon: (
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
                ),
                title: t("buy.title"),
                content: (
                  <ol className="space-y-3 text-white/80 text-sm sm:text-base">
                    {[1, 2].map((step) => (
                      <li key={step} className="flex items-start gap-3">
                        <div className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60"></div>
                        <span>{t(`buy.step${step}`)}</span>
                      </li>
                    ))}
                  </ol>
                ),
              },
              {
                icon: (
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white/90" />
                ),
                title: t("tips.title"),
                content: (
                  <ul className="space-y-3 text-white/80 text-sm sm:text-base">
                    {[1, 2].map((tip) => (
                      <li key={tip} className="flex items-start gap-3">
                        <div className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60"></div>
                        <span>{t(`tips.tip${tip}`)}</span>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ].map(({ icon, title, text, content }, i) => (
              <section
                key={i}
                className="relative rounded-xl border border-white/15 bg-white/5 p-5 sm:p-6 lg:p-8 backdrop-blur transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    {icon}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    {title}
                  </h2>
                </div>

                {text && (
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    {text}
                  </p>
                )}

                {content}
              </section>
            ))}
          </div>
        </section>
        <Footer/>
      </main>
    </>
  );
}
