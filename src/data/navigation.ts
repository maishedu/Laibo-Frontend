import { MegamenuItem, NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";
import __megamenu from "./jsons/__megamenu.json";


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


