import React from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Musica } from "../components/home/Musica";
import { Bio } from "../components/home/Bio";
import { SocialWall } from "../components/home/SocialWall";
import { Discography } from "../components/home/Discography";

export const Home = () => {
    return(
        <Layout>
            <Hero />
            <Discography />
            <Bio />
            <Musica />
            <SocialWall />
        </Layout>
    )
}