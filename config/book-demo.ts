export const bookDemoConfig = {
    title: "Book a Demo",
    description: "See how SmartShare can scale your influencer marketing.",
    accessKey: "67273b67-c15e-4c01-b2f5-2d23df176540",
    success: {
        title: "Request Sent!",
        message: "We've scheduled your demo. Check your email for the invite.",
    },
    form: {
        fields: {
            name: {
                label: "Full Name",
                placeholder: "Name",
                required: true,
            },
            email: {
                label: "Work Email",
                placeholder: "Email",
                required: true,
            },
            mobile: {
                label: "Mobile Number",
                placeholder: "+1 00000 00000",
                required: true,
            },
            region: {
                label: "Country / Region",
                placeholder: "Select your region",
                required: true,
                options: [
                    "North America",
                    "Europe",
                    "Asia Pacific",
                    "South America",
                    "Middle East & Africa",
                ],
            },
            date: {
                label: "Select Date",
                required: true,
            },
            time: {
                label: "Select Time",
                required: true,
            },
        },
        submitButton: {
            text: "Schedule Demo",
            loading: "Scheduling...",
        },
        backLink: {
            text: "Back to Home",
            href: "/",
        },
    },
};
