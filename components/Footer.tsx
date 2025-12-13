"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { footerConfig } from "@/config/footer";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  companySize: z.string().min(1, "Please select company size"),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof formSchema>;

export default function Footer() {
  const { header, benefits, form, footerBottom } = footerConfig;
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Mock API call
    console.log("Form Submitted:", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{form.fields.companySize.label}</label>
                  <select 
                    {...register("companySize")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-purple focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 outline-none transition-all"
                  >
                    <option value="">{form.fields.companySize.placeholder}</option>
                    {form.fields.companySize.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.companySize && <p className="text-red-500 text-sm mt-1">{errors.companySize.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{form.fields.website.label}</label>
                  <input 
                    {...register("website")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-brand-purple focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900 outline-none transition-all"
                    placeholder={form.fields.website.placeholder}
                  />
                  {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>}
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
          <div className="w-6 h-6 bg-slate-900 dark:bg-white rounded-md flex items-center justify-center text-white dark:text-slate-900 font-bold text-xs">1</div>
          <span className="font-semibold text-slate-900 dark:text-white">One Impression</span>
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
