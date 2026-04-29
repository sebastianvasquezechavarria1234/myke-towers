import React from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Musica } from "../components/home/Musica";
import { SocialWall } from "../components/home/SocialWall";
import { DiscographySection } from "../components/home/DiscographySection";

export const Home = () => {
    return (
        <Layout>
            <Hero />
            <Musica />
            <SocialWall />
            <DiscographySection />
        </Layout>
    );
};