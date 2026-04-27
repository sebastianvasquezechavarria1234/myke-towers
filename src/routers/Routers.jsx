import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "../landing/pages/Home";
import { FullBio } from "../landing/pages/FullBio";
import { Header } from "../landing/layout/Header";
import { Bg } from "../landing/layout/Bg";
import { Cursor } from "../landing/components/common/Cursor";

export const Routers = () => {
    const location = useLocation();

    return(
        <>
            <Cursor />
            <Bg />
            <Header />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/biografia" element={<FullBio />}/>
                </Routes>
            </AnimatePresence>
        </>
    )
}