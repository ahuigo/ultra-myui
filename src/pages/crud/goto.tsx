import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import { Button } from "https://esm.sh/antd?bundle";
// import { Button } from "@/antd.js";
// https://cdn.bootcdn.net/ajax/libs/antd/5.2.2/antd.min.js
// *https://antv-g2.gitee.io/app-6d685724b46ba90f1b43.js*


export default function HomePage() {
  const [c, setC] = useState(0);
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <input name="abc" />
        <button onClick={() => navigate('/dashboard', { replace: false })}>
          goto dashboard
        </button>
        {/* <Button>abc111</Button> */}
      </div>
    </div>
  );
}
