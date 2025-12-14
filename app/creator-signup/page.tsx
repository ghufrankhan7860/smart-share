"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { creatorSignupConfig } from "@/config/creator-signup";

export default function CreatorSignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        channelName: "",
        channelUrl: "",
        mobileNumber: "",
        email: "",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        title,
        description,
        accessKey,
        success,
        form: { fields, submitButton, backLink },
    } = creatorSignupConfig;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    ...formData,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setShowSuccess(true);
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                console.error("Form submission failed:", result);
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <main className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
            <div className="w-full max-w-md relative">
                <AnimatePresence>
                    {showSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                {success.title}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                {success.message}
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
                        >
                            <div className="p-8">
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                        {title}
                                    </h1>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {description}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label
                                            htmlFor="channelName"
                                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                                        >
                                            {fields.channelName.label}
                                        </label>
                                        <input
                                            required={fields.channelName.required}
                                            type="text"
                                            id="channelName"
                                            name="channelName"
                                            value={formData.channelName}
                                            onChange={handleChange}
                                            placeholder={fields.channelName.placeholder}
                                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="channelUrl"
                                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                                        >
                                            {fields.channelUrl.label}
                                        </label>
                                        <input
                                            required={fields.channelUrl.required}
                                            type="url"
                                            id="channelUrl"
                                            name="channelUrl"
                                            value={formData.channelUrl}
                                            onChange={handleChange}
                                            placeholder={fields.channelUrl.placeholder}
                                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                                        >
                                            {fields.email.label}
                                        </label>
                                        <input
                                            required={fields.email.required}
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={fields.email.placeholder}
                                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="mobileNumber"
                                            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5"
                                        >
                                            {fields.mobileNumber.label} <span className="text-slate-400 font-normal">{fields.mobileNumber.optionalLabel}</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="mobileNumber"
                                            name="mobileNumber"
                                            value={formData.mobileNumber}
                                            onChange={handleChange}
                                            placeholder={fields.mobileNumber.placeholder}
                                            required={fields.mobileNumber.required}
                                            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all outline-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-3 px-4 bg-brand-purple hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-brand-purple/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Submitting..." : submitButton.text}
                                    </button>
                                </form>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 text-center border-t border-slate-200 dark:border-slate-800">
                                <Link href={backLink.href} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
                                    &larr; {backLink.text}
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
