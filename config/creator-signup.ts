export const creatorSignupConfig = {
    title: "Join as a Creator",
    description: "Connect with top brands and grow your audience.",
    accessKey: "62b8596b-a900-4ac0-ba3c-38c24ef2af95",
    success: {
        title: "Success!",
        message:
            "Your application has been submitted. Redirecting to homepage...",
    },
    form: {
        fields: {
            channelName: {
                label: "Channel Name",
                placeholder: "Channel Name",
                required: true,
            },
            channelUrl: {
                label: "Channel URL",
                placeholder: "https://youtube.com/@yourchannel",
                required: true,
            },
            email: {
                label: "Email Address",
                placeholder: "email",
                required: true,
            },
            mobileNumber: {
                label: "Mobile Number",
                optionalLabel: "(Optional)",
                placeholder: "+91 00000 000000",
                required: false,
            },
        },
        submitButton: {
            text: "Submit Application",
        },
        backLink: {
            text: "Back to Home",
            href: "/",
        },
    },
};
