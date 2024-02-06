import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Setting from "./pages/setting/Setting";
import Search from "./pages/search/Search";
import Tags from "./pages/tags/Tags";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Register />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger/:userId">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/messenger/" render={() => <Redirect to="/messenger/all" />}/>
        <Route path="/setting">
          {!user ? <Redirect to="/"/> : <Setting/> }
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/profile/" render={() => <Redirect to="/" />}/>
        <Route path="/search/:query">
          <Search />
        </Route>
        <Route path="/search/" render={() => <Redirect to="/search/ " />}/>
        <Route path="/tags/:tag">
          <Tags />
        </Route>
        <Route path="/bookmarks">
          <Bookmarks />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
