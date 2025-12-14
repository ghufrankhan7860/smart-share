import { Search, BarChart3, Box, ShieldCheck } from "lucide-react";

export const featuresConfig = {
    header: {
        title: "Why leading brands choose us",
        description:
            "An end-to-end influencer marketing ecosystem built for consistency, scale, and high-impact influencer marketing.",
    },
    list: [
        {
            icon: Search,
            title: "Search Smarter",
            desc: "Using advanced creator discovery tools built for brand-aligned partnerships.",
            color: "bg-purple-100 text-brand-purple",
        },
        {
            icon: BarChart3,
            title: "Data-Driven Decisions",
            desc: "Real-time analytics and insights to predict campaign performance before you book.",
            color: "bg-blue-100 text-blue-600",
        },
        {
            icon: Box,
            title: "Built Around Your Brand",
            desc: "Customizable workflows that adapt to your team's specific requirements.",
            color: "bg-orange-100 text-orange-600",
        },
        {
            icon: ShieldCheck,
            title: "Transparency That Scales",
            desc: "Clear pricing, no hidden fees, and verified creator metrics you can trust.",
            color: "bg-green-100 text-green-600",
        },
    ],
};
