"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, FileText, ShieldCheck, Scale, Handshake, AlertTriangle } from "lucide-react";
import Header from "../../components/Header";

export default function Terms() {
  const t = useTranslations("terms");
  const locale = useLocale();
  const router = useRouter();

  return (
    <>
    <Header/>
    <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
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

        {/* Sections */}
        <div className="mt-14 space-y-10">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="size-5" />
              <h2 className="text-xl font-semibold">{t("sections.intro.title")}</h2>
            </div>
            <p className="text-white/80">{t("sections.intro.body")}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="size-5" />
              <h2 className="text-xl font-semibold">{t("sections.privacy.title")}</h2>
            </div>
            <p className="text-white/80">{t("sections.privacy.body")}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Scale className="size-5" />
              <h2 className="text-xl font-semibold">{t("sections.usage.title")}</h2>
            </div>
            <ul className="mt-2 list-disc pl-5 space-y-2 text-white/80">
              <li>{t("sections.usage.points.legal")}</li>
              <li>{t("sections.usage.points.fair")}</li>
              <li>{t("sections.usage.points.restrictions")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <Handshake className="size-5" />
              <h2 className="text-xl font-semibold">{t("sections.liability.title")}</h2>
            </div>
            <p className="text-white/80">{t("sections.liability.body")}</p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="size-5" />
              <h2 className="text-xl font-semibold">{t("sections.disclaimer.title")}</h2>
            </div>
            <p className="text-white/80">{t("sections.disclaimer.body")}</p>
          </section>
        </div>

        {/* Footer note */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-center text-white/80">{t("footnote")}</p>
        </div>
      </section>
    </main>
    </>
  );
}
