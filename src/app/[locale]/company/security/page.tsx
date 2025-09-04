"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, ShieldCheck, Lock, Eye, Globe2, KeyRound, FileWarning } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Security() {
  const t = useTranslations("security");
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
          className="inline-flex items-center cursor-pointer gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/10"
        >
          <ArrowLeft className="size-4" />
          {t("backToHome")}
        </button>
      </div>
        
        <header className="max-w-3xl">
          <p className="mb-3 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest">
            {t("badge")}
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-lg text-white/80">{t("subtitle")}</p>
        </header>

        {/* Highlights */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <ShieldCheck className="size-5" />
              <h3 className="font-medium">{t("pillars.defenseInDepth.title")}</h3>
            </div>
            <p className="text-white/75">{t("pillars.defenseInDepth.body")}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Lock className="size-5" />
              <h3 className="font-medium">{t("pillars.encryption.title")}</h3>
            </div>
            <p className="text-white/75">{t("pillars.encryption.body")}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Eye className="size-5" />
              <h3 className="font-medium">{t("pillars.monitoring.title")}</h3>
            </div>
            <p className="text-white/75">{t("pillars.monitoring.body")}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <KeyRound className="size-5" />
              <h3 className="font-medium">{t("pillars.keyManagement.title")}</h3>
            </div>
            <p className="text-white/75">{t("pillars.keyManagement.body")}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <Globe2 className="size-5" />
              <h3 className="font-medium">{t("pillars.globalCompliance.title")}</h3>
            </div>
            <p className="text-white/75">{t("pillars.globalCompliance.body")}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 flex items-center gap-2">
              <FileWarning className="size-5" />
              <h3 className="font-medium">{t("pillars.risk.title")}</h3>
            </div>
            <p className="text-white/75">{t("pillars.risk.body")}</p>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl font-semibold">{t("custody.title")}</h2>
            <p className="text-white/80">{t("custody.lead")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
              <li>{t("custody.points.nonCustodial")}</li>
              <li>{t("custody.points.multiSig")}</li>
              <li>{t("custody.points.hardware")}</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 text-xl font-semibold">{t("operations.title")}</h2>
            <p className="text-white/80">{t("operations.lead")}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-white/80">
              <li>{t("operations.points.codeReviews")}</li>
              <li>{t("operations.points.audits")}</li>
              <li>{t("operations.points.incident")}</li>
            </ul>
          </section>
        </div>

        {/* CTA note */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-center text-white/80">{t("footnote")}</p>
        </div>
      </section>
      <Footer/>
    </main>
    </>
  );
}
