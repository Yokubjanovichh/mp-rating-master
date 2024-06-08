import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./Components/Layout/Layout";
import { Home } from "./Pages/Home/Home";
import { Courier } from "./Pages/Сourier/Сourier";
import { AddTs } from "./Pages/Ts/AddTs";
import { Ts } from "./Pages/Ts/Ts";
import { NotFound } from "./Pages/NotFound/NotFound";

export const Router = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="courier" element={<Courier />} />
        <Route path="add-ts" element={<AddTs />} />
        <Route path="ts/:id" element={<Ts />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
});
