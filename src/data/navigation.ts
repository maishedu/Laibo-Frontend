import {  NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    
    isNew: true,
  },

  {
    id: ncNanoId(),
    href: "/how-it-works",
    name: "How it works",
  },
  {
    id: ncNanoId(),
    href: "/authors",
    name: "Authors",
  },

  {
    id: ncNanoId(),
    href: "/press",
    name: "Press",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Contact",
  },
];


