import { Search, BarChart3, Box, ShieldCheck } from "lucide-react";

export const featuresConfig = {
  header: {
    title: "Why leading brands choose us",
    description:
      "A complete ecosystem designed to make influencer marketing predictable, scalable, and effective.",
  },
  list: [
    {
      icon: Search,
      title: "Search Smarter",
      desc: "Advanced filters to find creators who align perfectly with your brand voice.",
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
