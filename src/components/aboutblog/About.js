import React from "react";
import Worklocation from './aboutui/worklocation';
import Founders from './aboutui/founders';
import Spacesearch from "./aboutui/spacesearch";
import Aboutfooterlink from "./aboutui/aboutfooterlink";
import Aboutheader from "./aboutui/aboutheader";
import Aboutfooter from "./aboutui/aboutfooter";
import {Helmet} from "react-helmet";


const About = () => {


  return (
    < div className="md:h-screen sm:h-screen overflow-x-hidden">
      <Helmet>
        <title>TryBookinz | About</title>
        <meta name="description" content="We are creating an experience for every user. No need to worry about where. select from our wide range of workspace listings and grow your network. Stay inspired, productive, and focused."/>
        <meta name="keywords" content="Editor, Founder, CTO, Director, Find Space, Join our Team"/>
      </Helmet>
      <Aboutheader/>
      <Worklocation />
      <Founders/>
      <Spacesearch/>
      <Aboutfooterlink/>
      <Aboutfooter/>
    </div>
  );

};


export default About;