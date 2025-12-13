export const pricingConfig = {
  text: {
    heading: {
      line1: "Smart & Dynamic",
      line2: "Campaign Pricing",
    },
    description:
      "Estimate your reach and creator network size based on your budget and campaign duration.",
    currency: "INR",
  },
  controls: {
    budget: {
      label: "Campaign Budget",
      min: 5000,
      max: 2500000,
      step: 5000,
      minLabel: "₹5k",
      maxLabel: "₹25L",
    },
    duration: {
      label: "Campaign Duration",
      options: [
        { label: "3 Months", value: "3m", multiplier: 1 },
        { label: "6 Months", value: "6m", multiplier: 1.2, tag: "Popular" },
        {
          label: "12 Months",
          value: "12m",
          multiplier: 1.5,
          tag: "Best Value",
        },
      ],
    },
  },
  output: {
    title: "Estimated Deliverables",
    tiers: [
      {
        id: "micro",
        label: "Micro Creators",
        cost: 3000,
        desc: "10k-50k followers",
        color: "bg-blue-50 text-blue-700 border-blue-100",
      },
      {
        id: "medium",
        label: "Medium Creators",
        cost: 15000,
        desc: "50k-500k followers",
        color: "bg-purple-50 text-purple-700 border-purple-100",
      },
      {
        id: "large",
        label: "Large Creators",
        cost: 100000,
        desc: "500k+ followers",
        color: "bg-rose-50 text-rose-700 border-rose-100",
      },
    ],
    cta: "Lock this Plan",
    disclaimer: "Estimates based on current market rates.",
  },
};
