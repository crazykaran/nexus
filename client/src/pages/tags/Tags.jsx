import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./tags.css"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

export default function Tags() {
    const param=useParams();
    const [ menu , setMenu ]=useState(false);
  return (
    <>
      <Topbar menu={menu} setMenu={setMenu} />
      <div className="homeContainer">
      <Sidebar menu={menu}/>
        <Feed tag={param.tag}/>
        <Rightbar/>
      </div>
    </>
  );
}
