import React from "react"
import Header from "../homepage/ui/header"
import SitemapHero from "./SitemapUI/SitemapHero"
import Sitemaplocation from "./SitemapUI/Sitemaplocation"
import Footerlink from "../homepage/ui/footerlink";
import Footer from "../homepage/ui/footer";

const Sitemap = () => {
  return (
    <div className="overflow-hidden">
      <Header/>
      <SitemapHero/>
      <Sitemaplocation/>
      <Footer/>
      <Footerlink/>
    </div>
  )
}
export default Sitemap;