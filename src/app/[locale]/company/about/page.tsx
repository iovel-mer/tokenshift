"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield, Sparkles, Coins, Globe2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Header from "../../components/Header";
import Link from "next/link";

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
       

        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-15">
          <Link href={`/${locale}`}>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/10"
            >
              <ArrowLeft className="size-4" />
              {t("backToHome")}
            </button>
          </Link>
        </div>
          {/* Hero */}
          <header className="max-w-3xl">
            <p className="mb-3 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest">
              {t("badge")}
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-white/80">{t("subtitle")}</p>
          </header>

          {/* Content grid */}
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Left column */}
            <article className="space-y-8">
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-2 text-xl font-semibold">
                  {t("mission.title")}
                </h2>
                <p className="text-white/85">{t("mission.body1")}</p>
                <p className="mt-3 text-white/75">{t("mission.body2")}</p>
              </section>

              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-2 text-xl font-semibold">
                  {t("whyCrypto.title")}
                </h2>
                <ul className="space-y-3 text-white/85">
                  <li className="flex items-start gap-3">
                    <Shield className="mt-1 size-5 shrink-0" />
                    <div>
                      <h3 className="font-medium">
                        {t("whyCrypto.points.security.title")}
                      </h3>
                      <p className="text-white/70">
                        {t("whyCrypto.points.security.body")}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Globe2 className="mt-1 size-5 shrink-0" />
                    <div>
                      <h3 className="font-medium">
                        {t("whyCrypto.points.openAccess.title")}
                      </h3>
                      <p className="text-white/70">
                        {t("whyCrypto.points.openAccess.body")}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="mt-1 size-5 shrink-0" />
                    <div>
                      <h3 className="font-medium">
                        {t("whyCrypto.points.innovation.title")}
                      </h3>
                      <p className="text-white/70">
                        {t("whyCrypto.points.innovation.body")}
                      </p>
                    </div>
                  </li>
                </ul>
              </section>
            </article>

            {/* Right column */}
            <aside className="space-y-8">
              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-2 text-xl font-semibold">
                  {t("values.title")}
                </h2>
                <p className="text-white/80">{t("values.lead")}</p>
                <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <dt className="text-sm text-white/70">
                      {t("values.items.transparency.title")}
                    </dt>
                    <dd className="text-white/85">
                      {t("values.items.transparency.body")}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <dt className="text-sm text-white/70">
                      {t("values.items.performance.title")}
                    </dt>
                    <dd className="text-white/85">
                      {t("values.items.performance.body")}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <dt className="text-sm text-white/70">
                      {t("values.items.education.title")}
                    </dt>
                    <dd className="text-white/85">
                      {t("values.items.education.body")}
                    </dd>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <dt className="text-sm text-white/70">
                      {t("values.items.security.title")}
                    </dt>
                    <dd className="text-white/85">
                      {t("values.items.security.body")}
                    </dd>
                  </div>
                </dl>
              </section>

              <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="mb-2 text-xl font-semibold">
                  {t("tech.title")}
                </h2>
                <p className="text-white/80">{t("tech.lead")}</p>
                <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <li className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Coins className="size-5" />
                      <span className="font-medium">
                        {t("tech.items.chains.title")}
                      </span>
                    </div>
                    <p className="text-sm text-white/75">
                      {t("tech.items.chains.body")}
                    </p>
                  </li>
                  <li className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Shield className="size-5" />
                      <span className="font-medium">
                        {t("tech.items.security.title")}
                      </span>
                    </div>
                    <p className="text-sm text-white/75">
                      {t("tech.items.security.body")}
                    </p>
                  </li>
                  <li className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="size-5" />
                      <span className="font-medium">
                        {t("tech.items.analytics.title")}
                      </span>
                    </div>
                    <p className="text-sm text-white/75">
                      {t("tech.items.analytics.body")}
                    </p>
                  </li>
                  <li className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Globe2 className="size-5" />
                      <span className="font-medium">
                        {t("tech.items.global.title")}
                      </span>
                    </div>
                    <p className="text-sm text-white/75">
                      {t("tech.items.global.body")}
                    </p>
                  </li>
                </ul>
              </section>
            </aside>
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
