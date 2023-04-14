import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import useServerContext from "ultra/hooks/use-server-context.js";
import DefaultLayout from "./layouts/DefaultLayout.tsx";
import routing from "@/routing.ts";
// import routing from "./routing.ts";
import { Outlet } from "react-router-dom";
import './global.d.ts';
import { useMemo } from "react";

function SubMenu() {
  return (
    <Outlet />
  );
}

const routesPage = routing.map((route) => {
  const { path, page, routes } = route;
  if (page) {
    const Page = lazy(() => import(page));
    return (
      <Route key={path} path={path} index={path === "/"} element={<Page />} />
    );
  } else if (routes) {
    return (
      <Route key={path} path={path} element={<SubMenu />}>
        {routes.map((route) => {
          const { path, page, routes } = route;
          if (page) {
            const Page = lazy(() => import(page));
            return (
              <Route
                key={path}
                path={path}
                index={path === "/"}
                element={<Page />}
              />
            );
          }
        })}
      </Route>
    );
  }
});

function RouteNotFound() {
  useServerContext((context) => {
    context.status(404);
  });
  return <div>Not found</div>;
}

const layout = <DefaultLayout />;

console.log('init App2');

declare global {
  interface Window { G5: { name: string; }; }
}
console.log(window.G5);
// window.G4.name;

export default function App() {
  useEffect(() => { console.log('init App'); }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Map Cloud UI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="/main.css" rel="stylesheet" />
        <script src="https://gw.alipayobjects.com/os/lib/antv/g2/4.2.9/dist/g2.min.js"></script>
      </head>
      <body>
        <Suspense fallback={<div>Page is Loading...</div>}>
          <Routes>
            <Route path="/" element={layout}>
              {routesPage}
              <Route path="*" element={<RouteNotFound />} />
              {/* <Route index element={<HomePage />} /> */}
            </Route>
          </Routes>
        </Suspense>
      </body>
    </html>
  );
}
