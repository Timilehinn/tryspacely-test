import React from 'react';
import HelpCenterHeader from "./HelpCenterUi/HelpCenterHeader";
import HelpCenterHero from "./HelpCenterUi/HelpCenterHero";
import HelpCenterEx from "./HelpCenterUi/HelpCenterEx";
import Aboutfooter from "../aboutblog/aboutui/aboutfooter";
import HelpCenterFooterlink from "./HelpCenterUi/HelpCenterFooterlink";
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom'


const  HelpCenter =() => {
  return(
      <div>
        <Helmet>
          <title>Help Center</title>
          <meta name="description" content=""/>
          <meta name="keywords" content="Getting Started, User Guidelines, Legal, Assistance"/>
        </Helmet>
        <a href='https://tryspacely.tawk.help'>

        {/*<HelpCenterHeader/>*/}
        {/*<HelpCenterHero/>*/}
        {/*<HelpCenterEx/>*/}
        {/*<HelpCenterFooterlink/>*/}
        {/*<Aboutfooter/>*/}
      </a>
      </div>

  )
}
export default HelpCenter;