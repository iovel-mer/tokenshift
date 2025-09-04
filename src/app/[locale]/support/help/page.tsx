"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  LifeBuoy,
  BookOpen,
  Shield,
  Wallet,
  Activity,
  Bug,
  Mail
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Help() {
  const t = useTranslations("help");
  const locale = useLocale();
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          {/* Back to Home (same classes as your example) */}
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

          {/* Help categories */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Getting Started */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.gettingStarted.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.gettingStarted.items.createAccount")}</li>
                <li>{t("cards.gettingStarted.items.verifyEmail")}</li>
                <li>{t("cards.gettingStarted.items.connectWallet")}</li>
              </ul>
            </div>

            {/* Account & Security */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Shield className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.security.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.security.items.twoFA")}</li>
                <li>{t("cards.security.items.resetPassword")}</li>
                <li>{t("cards.security.items.phishing")}</li>
              </ul>
            </div>

            {/* Wallet & Funds */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Wallet className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.funds.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.funds.items.deposit")}</li>
                <li>{t("cards.funds.items.withdraw")}</li>
                <li>{t("cards.funds.items.fees")}</li>
              </ul>
            </div>

            {/* Trading */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Activity className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.trading.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.trading.items.placeOrder")}</li>
                <li>{t("cards.trading.items.orderTypes")}</li>
                <li>{t("cards.trading.items.slippage")}</li>
              </ul>
            </div>

            {/* Troubleshooting */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <Bug className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.troubleshoot.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.troubleshoot.items.pageNotLoading")}</li>
                <li>{t("cards.troubleshoot.items.failedTx")}</li>
                <li>{t("cards.troubleshoot.items.wrongNetwork")}</li>
              </ul>
            </div>

            {/* Contact Support */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <LifeBuoy className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.contact.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.contact.items.email")}</li>
                <li>{t("cards.contact.items.docs")}</li>
                <li>{t("cards.contact.items.status")}</li>
              </ul>
              <p className="mt-3 text-sm text-white/65">{t("cards.contact.note")}</p>
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
