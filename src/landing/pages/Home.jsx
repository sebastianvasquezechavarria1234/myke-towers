import React from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Musica } from "../components/home/Musica";
import { Bio } from "../components/home/Bio";

export const Home = () => {
    return(
        <Layout>
            <Hero />
            <Bio />
            <Musica />
            
        </Layout>
    )
}