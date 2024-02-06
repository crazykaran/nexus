import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./bookmarks.css"
import { useState } from "react";

export default function Bookmarks() {
  const [ menu , setMenu ]=useState(false);
  return (
    <>
      <Topbar menu={menu} setMenu={setMenu} />
      <div className="homeContainer">
      <Sidebar menu={menu}/>
        <Feed bookmarks={true} />
        <Rightbar/>
      </div>
    </>
  );
}
