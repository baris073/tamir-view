import React from "react";
import Navbar from "../common/Navbar";
import MoviesSlider from "../MovieSlider";
import Latestmovies from "../Latestmovies";
import Latestseries from "../Latestseries";
import NotificationBanner from "../NotificationBanner";

export default function Home(){
    return(
        <>
        
        <MoviesSlider />
        <Latestmovies />
        <NotificationBanner />
        <Latestseries />
        </>
        
        
    )
}