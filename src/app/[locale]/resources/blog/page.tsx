"use client";

import type React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft, CalendarDays, Tag as TagIcon } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function BlogPost() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const router = useRouter();
  const params = useParams() as { slug: string };

  // Map slugs used on the index page to translation keys
  const slugToKey: Record<string, "post1" | "post2" | "post3"> = {
    "crypto-security-basics": "post1",
    "layer2-guide": "post2",
    "defi-risk-checklist": "post3",
  };
  const key = slugToKey[params.slug] ?? "post1";

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
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-widest">
              <CalendarDays className="size-3.5" />
              {t(`posts.${key}.date`)}
              <span className="mx-2">•</span>
              <TagIcon className="size-3.5" />
              {t(`posts.${key}.tag`)}
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {t(`posts.${key}.title`)}
            </h1>
            <p className="mt-4 text-lg text-white/80">
              {t(`posts.${key}.excerpt`)}
            </p>
          </header>

          {/* Placeholder body (use excerpt as lightweight body) */}
          <article className="prose prose-invert mt-10 max-w-3xl">
            <p className="text-white/85">
              {t(`posts.${key}.excerpt`)}
            </p>
            <p className="mt-4 text-white/80">
              {t("footnote")}
            </p>

            {/* Link back to blog list */}
            <div className="mt-8">
              <p
               
                className="text-sm underline underline-offset-4 hover:no-underline"
              >
               
              </p>
            </div>
          </article>
        </section>
        <Footer/>
      </main>
    </>
  );
}
