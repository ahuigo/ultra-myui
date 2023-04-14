import { tw } from "@/twind.ts";
import { useState, useEffect } from "react";
import { getLoginName, getLogoutUrl } from "@/api/user.ts";
export default function Header() {
  const [username, setName] = useState('');
  const [logoutUrl, setLogoutUrl] = useState('');
  useEffect(() => {
    console.log('init login');
    getLoginName().then(name => { setName(name); }).catch(err => { console.log(err); });
    setLogoutUrl(getLogoutUrl());
  }, []);
  return (
    <header className={tw(`text(sm white) bg-blue-500 p-3 flex`)}>
      <div style={{ marginLeft: "auto" }}>
        {username}&nbsp; <a href={logoutUrl} target="_blank">Sign Out</a>
        {/* <a href={getLogoutUrl()} target="_blank">ahui</a> */}
      </div>
    </header>
  );
}
