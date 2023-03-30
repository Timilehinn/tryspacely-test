import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../../homepage/ui/header";

const Aboutheader = () => {

  const [modalOpen, setModalStatus] = React.useState(false);
  const [hamBurgerOpen] = React.useState(true);
  const ModalDialog = () => {
    setModalStatus(false);
  }
  const HamBurger = () => {
    setModalStatus(true);
  }
  return (
    <>
      <Header/>
      <div className='geek' style={{ 'background': "url('https://trybookings-assets.s3.eu-west-2.amazonaws.com/code_learning.jpg')" }}></div>
    </>

  );
};

export default Aboutheader;
