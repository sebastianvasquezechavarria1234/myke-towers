import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "../landing/pages/Home";
import { FullBio } from "../landing/pages/FullBio";
import { Albums } from "../landing/pages/Albums";
import { AlbumDetail } from "../landing/pages/AlbumDetail";
import { Header } from "../landing/layout/Header";
import { Bg } from "../landing/layout/Bg";
import { Cursor } from "../landing/components/common/Cursor";

export const Routers = () => {
    const location = useLocation();

    // Reset scroll to top on every route change
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return(
        <>
            <Cursor />
            <Bg />
            <Header />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/biografia" element={<FullBio />}/>
                    <Route path="/albums" element={<Albums />}/>
                    <Route path="/album/:id" element={<AlbumDetail />}/>
                </Routes>
            </AnimatePresence>
        </>
    )
}