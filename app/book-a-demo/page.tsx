"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, ChevronDown } from "lucide-react";
import Link from "next/link";
import { bookDemoConfig } from "@/config/book-demo";
import { cn } from "@/lib/utils";

export default function BookDemoPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        region: "",
        date: new Date(),
        time: "10:00",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        title,
        description,
        accessKey,
        success,
        form: { fields, submitButton, backLink },
    } = bookDemoConfig;

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
                    name: formData.name,
                    email: formData.email,
                    phone: formData.mobile, // Web3Forms uses 'phone' often, or custom field
                    region: formData.region,
                    date: formData.date.toLocaleDateString(),
                    time: formData.time,
                    subject: "New Demo Request",
                }),
            });

            const result = await response.json();
            if (result.success) {
                setShowSuccess(true);
                setTimeout(() => {
                    router.push("/");
                }, 3000);
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

    return (
        <main className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
            <div className="w-full max-w-5xl relative">
                <AnimatePresence>
                    {showSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-12 shadow-xl border border-slate-200 dark:border-slate-800 text-center max-w-lg mx-auto"
                        >
                            <div className="flex justify-center mb-6">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                                {success.title}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                {success.message}
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-8 items-start">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                                        {title}
                                    </h1>
                                    <p className="text-lg text-slate-600 dark:text-slate-400">
                                        {description}
                                    </p>
                                </div>

                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                                    <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">{fields.date.label}</h3>
                                    <CustomCalendar
                                        selected={formData.date}
                                        onSelect={(d) => setFormData({ ...formData, date: d })}
                                    />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200 dark:border-slate-800"
                            >
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {fields.name.label}
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            required={fields.name.required}
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder={fields.name.placeholder}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-purple outline-none transition-all"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {fields.email.label}
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            required={fields.email.required}
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder={fields.email.placeholder}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-purple outline-none transition-all"
                                        />
                                    </div>

                                    {/* Mobile */}
                                    <div>
                                        <label htmlFor="mobile" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {fields.mobile.label}
                                        </label>
                                        <input
                                            type="tel"
                                            id="mobile"
                                            required={fields.mobile.required}
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            placeholder={fields.mobile.placeholder}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-purple outline-none transition-all"
                                        />
                                    </div>

                                    {/* Region */}
                                    <div>
                                        <label htmlFor="region" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                            {fields.region.label}
                                        </label>
                                        <CustomSelect
                                            options={fields.region.options}
                                            value={formData.region}
                                            onChange={(val) => setFormData({ ...formData, region: val })}
                                            placeholder={fields.region.placeholder}
                                        />
                                    </div>

                                    {/* Clock Dialer */}
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {fields.time.label}
                                        </label>
                                        <div className="flex justify-center">
                                            <AestheticClock
                                                selectedTime={formData.time}
                                                onChange={(t) => setFormData({ ...formData, time: t })}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-brand-purple text-white rounded-xl font-bold hover:bg-purple-800 transition-all shadow-lg hover:shadow-brand-purple/25 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                                    >
                                        {isSubmitting ? submitButton.loading : submitButton.text}
                                    </button>
                                    <div className="text-center mt-4">
                                        <Link href={backLink.href} className="text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                            &larr; {backLink.text}
                                        </Link>
                                    </div>
                                </form>
                            </motion.div >
                        </div >
                    )
                    }
                </AnimatePresence >
            </div >
        </main >
    );
}

function CustomCalendar({ selected, onSelect }: { selected: Date, onSelect: (d: Date) => void }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const isToday = (day: number) => {
        const today = new Date();
        return day === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
    };

    const isSelected = (day: number) => {
        return day === selected.getDate() && currentMonth.getMonth() === selected.getMonth() && currentMonth.getFullYear() === selected.getFullYear();
    };

    const renderDays = () => {
        const days = [];
        const totalDays = daysInMonth(currentMonth);
        const startDay = firstDayOfMonth(currentMonth);

        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-full aspect-square"></div>);
        }

        for (let i = 1; i <= totalDays; i++) {
            days.push(
                <button
                    key={i}
                    onClick={(e) => {
                        e.preventDefault();
                        onSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
                    }}
                    className={cn(
                        "w-full aspect-square rounded-full flex items-center justify-center text-sm font-medium transition-all",
                        isSelected(i)
                            ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                            : isToday(i)
                                ? "bg-slate-100 dark:bg-slate-800 text-brand-purple border border-brand-purple/20"
                                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    )}
                >
                    {i}
                </button>
            );
        }

        return days;
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-4">
                <button onClick={(e) => { e.preventDefault(); handlePrevMonth(); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
                <div className="font-semibold text-slate-900 dark:text-white">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                <button onClick={(e) => { e.preventDefault(); handleNextMonth(); }} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                    <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                    <div key={d} className="text-xs font-bold text-slate-400 uppercase tracking-wider">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1 place-items-center">
                {renderDays()}
            </div>
        </div>
    );
}



function AestheticClock({ selectedTime, onChange }: { selectedTime: string, onChange: (t: string) => void }) {
    const [mode, setMode] = useState<'AM' | 'PM'>('AM');
    const [step, setStep] = useState<'hours' | 'minutes'>('hours');
    const clockRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const [selectedHourStr, selectedMinuteStr] = selectedTime.split(':');
    const selectedHour = parseInt(selectedHourStr);
    const selectedMinute = parseInt(selectedMinuteStr);

    // Normalize display hour
    const displayHour = selectedHour > 12 ? selectedHour - 12 : (selectedHour === 0 ? 12 : selectedHour);

    const handlePointerDown = (e: React.PointerEvent) => {
        setIsDragging(true);
        handleClockInteraction(e);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (isDragging) {
            handleClockInteraction(e);
        }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        e.currentTarget.releasePointerCapture(e.pointerId);
        if (step === 'hours') {
            setStep('minutes');
        }
    };

    const handleClockInteraction = (e: React.PointerEvent) => {
        if (!clockRef.current) return;
        const rect = clockRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = e.clientX - centerX;
        const y = e.clientY - centerY;

        const angleRad = Math.atan2(y, x);
        let angleDeg = angleRad * (180 / Math.PI);
        let adjustedAngle = angleDeg + 90;
        if (adjustedAngle < 0) adjustedAngle += 360;

        if (step === 'hours') {
            // Map 0-360 to 1-12
            // 360/12 = 30 deg per hour
            let val = Math.round(adjustedAngle / 30);
            if (val === 0) val = 12;

            let h24 = val;
            if (mode === 'PM' && val !== 12) h24 = val + 12;
            if (mode === 'AM' && val === 12) h24 = 0;

            onChange(`${h24.toString().padStart(2, '0')}:${selectedMinuteStr}`);
        } else {
            // Map 0-360 to 0-59
            // 360/60 = 6 deg per minute
            let val = Math.round(adjustedAngle / 6);
            if (val === 60) val = 0;

            onChange(`${selectedHourStr}:${val.toString().padStart(2, '0')}`);
        }
    };

    // Dial Numbers
    const hourNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const minuteNumbers = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

    const dialNumbers = step === 'hours' ? hourNumbers : minuteNumbers;

    // Rotation logic
    // Hours: purely based on hour integer (snap to number)
    // Minutes: purely based on minute integer
    const rotation = step === 'hours'
        ? (displayHour % 12) * 30
        : selectedMinute * 6;

    return (
        <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex items-center gap-4">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button
                        type="button"
                        onClick={() => setMode('AM')}
                        className={cn(
                            "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                            mode === 'AM' ? "bg-white dark:bg-slate-700 shadow-sm text-brand-purple" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        )}
                    >
                        AM
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('PM')}
                        className={cn(
                            "px-4 py-1.5 rounded-lg text-sm font-bold transition-all",
                            mode === 'PM' ? "bg-white dark:bg-slate-700 shadow-sm text-brand-purple" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                        )}
                    >
                        PM
                    </button>
                </div>
                {step === 'minutes' && (
                    <button
                        type="button"
                        onClick={() => setStep('hours')}
                        className="text-xs font-medium text-brand-purple hover:underline bg-brand-purple/10 px-3 py-2 rounded-lg"
                    >
                        Reset Time
                    </button>
                )}
            </div>

            <div
                ref={clockRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                className="relative w-full max-w-[250px] aspect-square rounded-full bg-slate-100 dark:bg-slate-800 shadow-inner flex items-center justify-center p-4 touch-none cursor-pointer select-none"
            >
                {/* Center Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand-purple rounded-full z-30 ring-4 ring-slate-100 dark:ring-slate-800"></div>

                {/* Single Hand */}
                <motion.div
                    className="absolute top-1/2 left-1/2 w-1.5 h-[40%] bg-brand-purple origin-bottom z-20 rounded-full pointer-events-none"
                    style={{ transformOrigin: "bottom center", x: "-50%", y: "-100%" }}
                    animate={{ rotate: rotation }}
                    transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 200, damping: 20 }}
                >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xs">
                            {step === 'hours' ? displayHour : selectedMinute.toString().padStart(2, '0')}
                        </span>
                    </div>
                </motion.div>

                {/* Dial Numbers */}
                {dialNumbers.map((num, i) => {
                    const angleDeg = i * 30; // 12 numbers -> 30 deg separation

                    // We need to map index correctly.
                    // i=0 is 12 (or 00) which is at angle 0 (top) if we consider 0 deg at top.
                    // But in standard CSS/trig:
                    // 0 deg is right. 
                    // Our map above for rotation assumed 0 is 12.
                    // Let's stick to standard math: 0 deg = 3 o'clock.
                    // 12 o'clock is 90 deg (or -90 deg depending on direction).
                    // In previous code:
                    // x = 50 + r * sin(angleDeg * PI/180)
                    // y = 50 - r * cos(angleDeg * PI/180)
                    // This formula treats "angleDeg" as "degrees clockwise from top (12 o'clock)".
                    // i=0 -> 0 deg from top -> 12/00. Correct.
                    // i=1 -> 30 deg from top -> 1/05. Correct.

                    const r = 38;
                    const x = 50 + r * Math.sin(angleDeg * (Math.PI / 180));
                    const y = 50 - r * Math.cos(angleDeg * (Math.PI / 180));

                    // Adjust highlighting logic
                    const isActive = step === 'hours'
                        ? displayHour === num
                        : (i * 5) === (Math.round(selectedMinute / 5) * 5) % 60;


                    return (
                        <div
                            key={num.toString()}
                            className={cn(
                                "absolute w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-sm md:text-lg transition-colors z-10 pointer-events-none",
                                isActive ? "text-white opacity-0" : "text-slate-400 dark:text-slate-500" // Hide text under the hand bulb
                            )}
                            style={{
                                left: `${x}%`,
                                top: `${y}%`,
                                transform: "translate(-50%, -50%)"
                            }}
                        >
                            {num}
                        </div>
                    );
                })}
            </div>

            <div className="text-xl font-medium text-slate-500 dark:text-slate-400">
                {step === 'hours' ? 'Select Hour' : 'Select Minutes'}
            </div>

            <div className="text-3xl font-bold text-slate-900 dark:text-white font-mono tracking-widest bg-slate-100 dark:bg-slate-800 px-8 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                {selectedTime} <span className="text-base text-slate-400 ml-1">{mode}</span>
            </div>
        </div>
    );
}

function CustomSelect({ options, value, onChange, placeholder }: { options: string[], value: string, onChange: (val: string) => void, placeholder: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button" // Prevent form submission
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none transition-all text-left flex items-center justify-between group",
                    isOpen ? "ring-2 ring-brand-purple border-transparent" : "hover:border-slate-300 dark:hover:border-slate-700",
                    value ? "text-slate-900 dark:text-white" : "text-slate-400"
                )}
            >
                <span className="block truncate">{value || placeholder}</span>
                <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl max-h-60 overflow-auto scrollbar-hide py-1"
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                    onChange(opt);
                                    setIsOpen(false);
                                }}
                                className={cn(
                                    "w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between",
                                    value === opt
                                        ? "bg-brand-purple/10 text-brand-purple font-medium"
                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                                )}
                            >
                                {opt}
                                {value === opt && <CheckCircle2 className="w-4 h-4 text-brand-purple" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
