import { Home } from "react-feather";
export const menuitems = [
  {
    title: "Dashboard",
    icon: "home",
    type: "link",
    path: "/Dashboard",
    badgeType: "primary",
    active: false
  },
  {
    title: "License",
    icon: "home",
    type: "link",
    path: "/license",
    badgeType: "primary",
    active: true,
    modelName: "license",
    displayModelName: "license",
    alwaysShow: false
  },
  {
    title: "Product",
    icon: "home",
    type: "link",
    path: "/product",
    badgeType: "primary",
    active: false,
    modelName: "product",
    displayModelName: "product",
    alwaysShow: false
  },
  {
    title: "Authority",
    icon: "home",
    type: "link",
    path: "/authority",
    badgeType: "primary",
    active: false,
    modelName: "authority",
    displayModelName: "authority",
    alwaysShow: false
  },
  {
    title: "User",
    icon: "home",
    type: "link",
    path: "/user",
    badgeType: "primary",
    active: false,
    modelName: "user",
    displayModelName: "user",
    alwaysShow: false
  }
];
