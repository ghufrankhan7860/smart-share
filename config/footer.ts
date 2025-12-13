export const footerConfig = {
  header: {
    line1: "Choose the power that",
    line2: "fits you best.",
    description:
      "Whether you're a startup or a global enterprise, we have the tools to scale your influencer marketing.",
  },
  benefits: [
    "Access to 100k+ verified creators",
    "Zero commission on media spend",
    "End-to-end campaign management",
  ],
  form: {
    fields: {
      name: { label: "Full Name", placeholder: "name" },
      email: { label: "Work Email", placeholder: "email" },
      companySize: {
        label: "Company Size",
        placeholder: "Select size",
        options: [
          "1-10 employees",
          "11-50 employees",
          "51-200 employees",
          "200+ employees",
        ],
      },
      website: { label: "Website URL", placeholder: "https://marketingsmartshare.com" },
    },
    submitButton: {
      default: "Get Started",
      loading: "Submitting...",
    },
    success: {
      title: "Thank you!",
      message:
        "We've received your request and will be in touch shortly.",
      retry: "Send another response",
    },
  },
  footerBottom: {
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Twitter", href: "#" },
    ],
    copyright: "© 2025 One Impression Clone.",
  },
};
