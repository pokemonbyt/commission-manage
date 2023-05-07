/*
 * @Description: menu
 * @Author: code pro
 * @Date: 2022-06-10 23:33:43
 * @LastEditTime: 2022-06-18 22:40:23
 * @LastEditors: code pro
 */
export const menu = [
  {
    label: "Quản lý admin",
    items: [
      {
        label: "Quản lý 1",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
      {
        label: "Cài đặt 2",
        icon: "pi pi-fw pi-home",
        to: "/agent/commission",
      },
    ],
  },
  {
    label: "Quản lý quyền hạn",
    items: [
      {
        label: "Quản lý roles",
        icon: "pi pi-fw pi-star-fill",
        to: "/permissions/roles"
      }
    ]
  },

  {
    label: "Tài khoản",
    icon: "pi pi-fw pi-sitemap",
    items: [{ label: "Quản lý tài khoản", icon: "pi pi-users", to: "/users" }],
  },
];
