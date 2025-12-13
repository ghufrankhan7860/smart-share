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
      name: { label: "Full Name", placeholder: "Name" },
      email: { label: "Work Email", placeholder: "Email" },
      companyName: { label: "Company Name", placeholder: "Your Company" },
      mobile: { label: "Mobile Number", placeholder: "+91 00000 00000" },
      website: { label: "Website URL", placeholder: "https://yourwebsite.com" },
      message: { label: "Short Message", placeholder: "Tell us a bit about your campaign goals..." },
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
    copyright: "© 2025 SmartShare.",
  },
};
