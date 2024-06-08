import React, { memo } from "react";
import "./Layout.css";
import { Link, Outlet } from "react-router-dom";
import logo from "./logo/logo.svg";
import youtube from "./logo/Ic_you_tube.svg";
import telegram from "./logo/Ic_telegram.svg";

export const Layout = memo(() => {
  return (
    <main className="layout-main">
      <header className="layout-header">
        <div className="layout-header-left">
          <Link to="/">
            <img src={logo} alt="" title="logo" />
          </Link>
          <p>Инструкция</p>
        </div>

        <div className="layout-header-right">
          <a
            href="https://www.youtube.com/@mprating"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="youtube"
          >
            <img src={youtube} alt="" />
          </a>

          <a
            href="https://t.me/+zSeyIbwjlX9lMGM6"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="telegram"
          >
            <img src={telegram} alt="" />
          </a>
        </div>
      </header>
      <section className="layout-section">
        <Outlet />
      </section>
    </main>
  );
});
