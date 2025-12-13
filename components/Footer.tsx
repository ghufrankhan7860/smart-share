"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { footerConfig } from "@/config/footer";
import { motion } from "framer-motion";
import { navbarConfig } from "@/config/navbar";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    companyName: z.string().min(1, "Company name is required"),
    mobile: z.string().min(10, "Valid mobile number is required"),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Footer() {
    const { header, benefits, form, footerBottom } = footerConfig;
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    // access_key: "2399718f-ab9b-4fd0-bf8e-dfb78c59de9e",      // ghufran's key
                    access_key: "8feee677-8a86-4377-9a6e-a8c7abfaba02",
                    ...data,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setIsSubmitted(true);
                reset();
            } else {
                console.error("Form submission failed:", result);
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <footer id="contact" className="bg-slate-50 dark:bg-slate-950 pt-24 pb-12 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 mb-20">

                {/* Left: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                        {header.line1} <br /> {header.line2}
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg">
                        {header.description}
                    </p>

                    <div className="flex flex-col gap-4 mt-8">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-brand-purple" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800"
                >
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{form.fields.name.label}</label>
                                    <input
                                        {...register("name")}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-purple focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 outline-none transition-all"
                                        placeholder={form.fields.name.placeholder}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{form.fields.email.label}</label>
                                    <input
                                        {...register("email")}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-purple focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 outline-none transition-all"
                                        placeholder={form.fields.email.placeholder}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{form.fields.companyName.label}</label>
                                    <input
                                        {...register("companyName")}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-purple focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 outline-none transition-all"
                                        placeholder={form.fields.companyName.placeholder}
                                    />
                                    {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{form.fields.mobile.label}</label>
                                    <input
                                        {...register("mobile")}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-purple focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 outline-none transition-all"
                                        placeholder={form.fields.mobile.placeholder}
                                    />
                                    {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{form.fields.website.label}</label>
                                    <input
                                        {...register("website")}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-purple focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 outline-none transition-all"
                                        placeholder={form.fields.website.placeholder}
                                    />
                                    {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{form.fields.message.label}</label>
                                    <textarea
                                        {...register("message")}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-purple focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 outline-none transition-all resize-none"
                                        placeholder={form.fields.message.placeholder}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-brand-purple text-white rounded-xl font-bold hover:bg-purple-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? form.submitButton.loading : form.submitButton.default}
                                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-12 space-y-4">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{form.success.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400">{form.success.message}</p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-brand-purple font-semibold hover:underline"
                            >
                                {form.success.retry}
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 dark:text-slate-400 text-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-0">

                    <img
                        src={navbarConfig.logo.src}
                        alt={navbarConfig.logo.alt}
                        className="w-18 h-18 rounded-lg object-cover"
                    />
                    <span className="font-semibold text-slate-900 dark:text-white">SmartShare</span>
                </div>
                <div className="flex gap-8">
                    {footerBottom.links.map((link) => (
                        <a key={link.label} href={link.href} className="hover:text-slate-900 dark:hover:text-white">{link.label}</a>
                    ))}
                </div>
                <div className="mt-4 md:mt-0">
                    {footerBottom.copyright}
                </div>
            </div>
        </footer>
    );
}
