import React from "react";
import { Layout } from "../layout/Layout";
import { Hero } from "../components/home/Hero";
import { Discography } from "../components/home/Discography";
import { Bio } from "../components/home/Bio";
import { Musica } from "../components/home/Musica";
import { SocialWall } from "../components/home/SocialWall";

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