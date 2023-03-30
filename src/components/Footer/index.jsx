import React from 'react'
import FTLogo from '../../assets/icons/ft_logo.svg'
import LinkedIn from '../../assets/icons/LinkedInIcon.svg'
import Instagram from '../../assets/icons/IG.svg'
import Twitter from '../../assets/icons/TwitterIcon.svg'
import Github from '../../assets/icons/Github.svg'
import OptionsComp from '../Options';

const SearchOptions = ["Search Workspaces", "Search by City", "Hottest Coding Space Nearby", "Search by Mentorship Opening"];

const OwnerTab = ["List Workspace", "Sign Up", "Login"]

const ReviewsOptions = ["View all Reviews", "Most Reviewed Spaces"]

const CompanyOptions = ['About Us', 'Blog', 'Support']

const SupportOptions = ['Help Center', 'Contact Us', 'Cancellation Option']


const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer_left">
          <FTLogo />
        </div>
        <div className="footer_right">
          <div className="footer_right_wrapper">
            <OptionsComp label="SEARCH" options={SearchOptions} />
            <OptionsComp label="WORKSPACE OWNER" options={OwnerTab} />
            <OptionsComp label="REVIEWS" options={ReviewsOptions} />
          </div>
          <div className="footer_right_wrapper">
            <OptionsComp label="COMPANY" options={CompanyOptions} />
            <OptionsComp label="SUPPORT" options={SupportOptions} />
          </div>
        </div>

      </div>
      <div className="footer_right_social">
        <div className="footer_right_social_wrapper">
          <div className="footer_right_social_wrapper_left">
            <ul>
              <li>&copy; {new Date().getFullYear()}, TrySpacely</li>
              <li>Privacy</li>
              <li>Terms & Condition</li>
              <li>Site Map</li>
            </ul>
          </div>
          <div className="footer_right_social_wrapper_right">
            <LinkedIn />
            <Twitter />
            <Instagram />
            <Github />
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer