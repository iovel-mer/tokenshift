"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeft,
  Mail,
  MessageSquare,
  LifeBuoy,
  Globe2,
  BookOpen,
  MapPin,
  Clock,
  Send
} from "lucide-react";
import Header from "../../components/Header";
import Link from "next/link";
import Footer from "../../components/Footer";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          {/* Back to Home (same section/button classes) */}
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

          {/* Info cards */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Support Channels */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <LifeBuoy className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.support.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0" />
                  <span>{t("cards.support.items.email")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="size-4 shrink-0" />
                  <span>{t("cards.support.items.ticket")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Globe2 className="size-4 shrink-0" />
                  <span>{t("cards.support.items.status")}</span>
                </li>
              </ul>
            </div>

            {/* Docs & Resources */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.docs.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li>{t("cards.docs.items.docs")}</li>
                <li>{t("cards.docs.items.guides")}</li>
                <li>{t("cards.docs.items.community")}</li>
              </ul>
            </div>

            {/* Office & Hours */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="size-5" />
                <h2 className="text-lg font-semibold">{t("cards.office.title")}</h2>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <Clock className="size-4 shrink-0" />
                  <span>{t("cards.office.items.hours")}</span>
                </li>
                <li>{t("cards.office.items.location")}</li>
                <li>{t("cards.office.items.response")}</li>
              </ul>
            </div>
          </div>

          {/* Simple contact form */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold mb-4">{t("form.title")}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // hook up to your action/endpoint later
              }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              <div>
                <label className="mb-1 block text-sm text-white/80">{t("form.name")}</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 outline-none placeholder:text-white/40"
                  placeholder={t("form.name")}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/80">{t("form.email")}</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 outline-none placeholder:text-white/40"
                  placeholder={t("form.email")}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm text-white/80">{t("form.topic")}</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 outline-none placeholder:text-white/40"
                  placeholder={t("form.topic")}
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm text-white/80">{t("form.message")}</label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 outline-none placeholder:text-white/40"
                  placeholder={t("form.message")}
                />
              </div>
              <div className="md:col-span-2">
                <Link href={`/${locale}`}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/10"
                    >
                      <Send className="size-4" />
                      {t("form.submit")}
                    </button>
                </Link>
              </div>
            </form>
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
