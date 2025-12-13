export const navbarConfig = {
  logo: {
    badge: "1",
    text: "SmartShare",
    href: "/",
    src: "/logo.png",
    alt: "SmartShare Logo",
  },
  links: [
    {
      label: "Products",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Marketplace", href: "#" },
        { label: "Enterprise", href: "#" },
      ],
    },
    {
      label: "Resources",
      href: "#",
      hasDropdown: false,
    },
  ],
  actions: {
    login: { label: "Log in", href: "#" },
    contact: { label: "Contact Us", href: "#" },
  },
};
