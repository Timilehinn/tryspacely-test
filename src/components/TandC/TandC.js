import React from 'react'
import Header from '../homepage/ui/header'
import TandCHero from "./TandCUI/TandCHero";
import TandCAside from "./TandCUI/TandCAside";
import TandCFooter from "./TandCUI/TandCFooter";
import Aboutfooter from "../aboutblog/aboutui/aboutfooter";

const TandC = () => {
  return (
    <div>
      <Header/>
      <TandCHero/>
      <TandCAside/>
      <TandCFooter/>
      <Aboutfooter/>
    </div>
  )
}
export default TandC