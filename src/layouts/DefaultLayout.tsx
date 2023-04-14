import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
// import routing, { RouteItem } from "../routing.ts";
import routing, { RouteItem } from "@/routing.ts";
import Header from "./Header.tsx";

function toRouteNav(routeItems: RouteItem[]) {
  const currentPath = location?.pathname || '';
  return routeItems.map(({ path, page, icon, name, routes }) => {
    if (page) {
      return (
        <li key={path}>
          {/* <img src={`/icons/` + (icon ?? 'align-right.svg')} alt="icon" /> */}
          <Link to={path}>
            {name}
          </Link>
        </li>
      );
    }
    if (routes) {
      // console.log([path, currentPath]);
      return (
        <details key={path} open={currentPath.includes(path)} suppressHydrationWarning={true}>
          <summary>
            <img src={`/icons/` + (icon ?? 'align-right.svg')} alt="icon" />
            {name}
          </summary>
          <ul>
            {toRouteNav(routes)}
          </ul>
        </details>
      );
    }
  });
}
export default function DefaultLayout() {
  useEffect(() => {
    console.log('init layout');
  }, []);
  return (
    <>
      <style suppressHydrationWarning={true}>{`
      .layout{
          display: grid;
          position: absolute;
          height: 100%;
          width: 100%;
          grid-template-columns: 200px auto;
      }
      .layout>.left{
        // border-right:1px solid rgb(229, 231, 235);
        background: #0168eb;
        color: white;
      }
      main>header{
        background: linear-gradient(18deg, #9191e2, green);
      }
      ul{
          padding:0
      }
      .nav summary{
        display:flex;
      }
      .nav summary>img{
        margin-right: 5px;
      }
      .nav li{
        padding:0.5em;
        display: flex;
        color:rgba(255, 255, 255, 0.75);
      }
      .nav li>img{
        margin-right: 5px;
      }
      .nav li:hover{
        color:white;
      }
      .nav details{
          padding: 0.5em;
      }
      details>summary {
        padding: 0.5em;
        color:rgba(255, 255, 255, 0.85);
        // font-weight: bold;
      }
      details>summary:hover {
        color:white;
      }
      details[open]>ul {
          margin-left:1.5em;
      }

      .nav img{
        filter: brightness(0) invert(1);
      }
      .left>img{
        box-sizing: content-box;
        width:114px;
        height:35px;
      }
      main{
        background:#f0f2f5;
      }
    `}</style>
      <div className="layout" suppressHydrationWarning={true}>
        <div className="left">
          <img src="/icons/arrow-right.svg" className="pad-15" />
          <ul className="nav">
            {toRouteNav(routing)}
            {/* <li> <Link to="/404">404</Link> </li> */}
          </ul>
        </div>
        <main>
          <Header />
          <Outlet />
          <div className="pad-15 text-center">Copyright © 2023 | Powered by MYUI</div>
        </main>
      </div>
    </>
  );
}
