import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useState } from "react";

export default function Home() {
  const [ menu , setMenu ]=useState(false);
  return (
    <>
      <Topbar menu={menu} setMenu={setMenu} />
      <div className="homeContainer">
        <Sidebar menu={menu}/>
        <Feed />
        <Rightbar/>
      </div>
    </>
  );
}
