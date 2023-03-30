import React from 'react'
import ReviewsHeader from "./ReviewsUI/ReviewsHeader";
import ReviewsHero from "./ReviewsUI/ReviewsHero";
import Spacesearch from '../aboutblog/aboutui/spacesearch'
import HowItWorksFooterLink from '../HowItWorks/HowItWorksUI/HowItWorksFooterlink'
import HowItWorksFooter from '../HowItWorks/HowItWorksUI/HowItWorksFooter'
import ReviewsCard from "./ReviewsUI/ReviewsCard";

const Reviews = () => {
  return (
    <div>
      <ReviewsHeader/>
      <ReviewsHero/>
      <ReviewsCard/>
      <Spacesearch/>
      <HowItWorksFooterLink/>
      <HowItWorksFooter/>
    </div>

  )
}
export default Reviews;