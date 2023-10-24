import { useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import authService from "./AppWrite/Auth";
import { login, logOut } from "./Store/AuthSlice";
import { Footer, Header } from './Components'

import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      test
      <div className="w-full block">
        <Header />
        <main>
          {/* <Outlet/> */}
          jdfh
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
