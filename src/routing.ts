export interface RouteItem {
  path: string;
  icon?: string;
  name: string;
  page?: string;
  routes?: RouteItem[];
}
const routes: RouteItem[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "dashboard.svg",
    routes: [
      {
        path: "/dashboard", name: "Dashboard", page: "./pages/dashboard/dashboard.tsx"
      },
    ],
  },
  {
    path: "/curd",
    name: "crud",
    routes: [
      { path: "/curd/goto", name: "goto2", page: "./pages/crud/goto.tsx" },
    ],
  },
  // { path: "/about", name: "About", page: "./pages/About.tsx" },
];
export default routes;
