export const navbarConfig = {
  logo: {
    badge: "1",
    text: "SmartShare",
    href: "/",
    src: "/logo.png",
    alt: "SmartShare Logo",
  },
  links: [] as { label: string; href: string; hasDropdown?: boolean; dropdownItems?: { label: string; href: string }[] }[],
  actions: {
    login: { label: "Log in", href: "#" },
    contact: { label: "Contact Us", href: "#" },
  },
};
