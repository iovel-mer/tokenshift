"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Eye, EyeOff, User, Lock } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { loginForDirectDashboard, loginUser } from "@/app/api/auth/postLogin";

export default function Login() {
  const locale = useLocale();
  const t = useTranslations("login");

  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    emailOrUsername?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkExistingAuth = async () => {
      try {
        const responseForDirect = await loginForDirectDashboard();
        console.log(responseForDirect);
        
        if (responseForDirect.ok) {
          window.location.href = `http://localhost:3001/${locale}/confirm-auth?authkey=${responseForDirect.data}`;
        }
      } catch {
        // no existing session
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkExistingAuth();
  }, [locale]);

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  });

  const validateField = (name: string, value: string) => {
    const errors: { [key: string]: string } = {};

    switch (name) {
      case "emailOrUsername":
        if (!value.trim()) {
          errors.emailOrUsername = t("errors.emailOrUsernameRequired");
        } else if (value.trim().length < 3) {
          errors.emailOrUsername = t("errors.emailOrUsernameTooShort");
        }
        break;
      case "password":
        if (!value) {
          errors.password = t("errors.passwordRequired");
        } else if (value.length < 6) {
          errors.password = t("errors.passwordTooShort");
        }
        break;
    }

    return errors;
  };

  const validateForm = () => {
    let allErrors: { [key: string]: string } = {};

    // Validate each field
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "rememberMe") {
        const fieldErrors = validateField(key, value as string);
        allErrors = { ...allErrors, ...fieldErrors };
      }
    });

    return allErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof typeof fieldErrors];
        return newErrors;
      });
    }

    // Clear general form error when user makes changes
    if (formError) {
      setFormError(null);
    }

    // Real-time validation for better UX (optional)
    if (type !== "checkbox" && value.trim()) {
      const errors = validateField(name, value);
      setFieldErrors((prev) => ({
        ...prev,
        ...errors
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFieldErrors({});

    // Validate form before submission
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError(t("errors.pleaseFixErrors"));
      return;
    }

    setIsSubmitting(true);

    const { emailOrUsername, password, rememberMe } = formData;

    try {
      const response = await loginUser(formData);
      console.log("login error payload:", response?.data);
      // console.log(response);

      // Check if login was successful
      if (!response.ok) {
        // Handle different types of login errors
        if (response.status === 401) {
         setFormError(t("errors.incorrect.emailOrUsername"));
        } else if (response.status === 429) {
          setFormError(t("errors.tooManyAttempts"));
        } else if (response.status >= 500) {
          setFormError(t("errors.serverError"));
        } else {
          setFormError(t("errors.loginFailed"));
        }
        return;
      }

      const responseForDirect = await loginForDirectDashboard();
      console.log(responseForDirect);
      
      if (responseForDirect.ok) {
        window.location.href = `http://localhost:3001/${locale}/confirm-auth?authkey=${responseForDirect.data}`;
      } else {
        setFormError(t("errors.authRedirectFailed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      setFormError(t("errors.network"));
    } finally {
      setIsSubmitting(false);
    }

    console.log({ emailOrUsername, password, rememberMe, locale });
  };

  // Show loading state while checking existing auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      <div className="relative w-full max-w-7xl mx-auto flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Back to localized home */}
          <Link
            href={`/${locale}`}
            className="flex items-center cursor-pointer gap-2 text-slate-400 hover:text-white mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("backHome")}</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{t("title")}</h1>
            <p className="text-slate-400 text-lg">{t("subtitle")}</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t("fields.emailOrUsername")}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type="text"
                  name="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={handleInputChange}
                  placeholder={t("placeholders.emailOrUsername")}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                    fieldErrors.emailOrUsername
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  }`}
                  disabled={isSubmitting}
                />
              </div>
              {fieldErrors.emailOrUsername && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.emailOrUsername}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {t("fields.password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={t("placeholders.password")}
                  className={`w-full pl-10 pr-12 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-all duration-200 ${
                    fieldErrors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  }`}
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-red-400">{fieldErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-600 bg-slate-800 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                  disabled={isSubmitting}
                />
                <span className="ml-2 text-sm text-slate-400">{t("rememberMe")}</span>
              </label>
            </div>

            {formError && (
              <div className="text-sm text-red-400 bg-red-950/30 border border-red-900/40 rounded-md p-3">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-lg shadow-purple-500/25 ${
                isSubmitting
                  ? "bg-slate-600 text-slate-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white cursor-pointer hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? t("signingIn") || "Signing in..." : t("signInButton")}
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-slate-400">{t("noAccount")} </span>
            <Link
              href={`/${locale}/register`}
              className="text-purple-400 hover:text-purple-300 font-medium cursor-pointer transition-colors duration-200"
            >
              {t("createAccount")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}