// import React from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
//
// const HowItWorksFooterlink = () => {
//   const { t } = useTranslation()
//   return (
//     <div className="bg-[#011936]">
//       <div
//         className='lg:flex lg:flex-row lg:justify-between lg:items-baseline mt-14 text-white lg:gap-6
//       lg:px-10 lg:py-14 md:flex md:justify-center md:flex-col md:px-10 md:py-10 sm:px-10 sm:py-10'
//       >
//         <div>
//           <Link to='/' className='w-1/6 '>
//             <h1 className='text-white lg:text-4xl font-bold md:font-bold md:text-2xl sm:text-2xl'>
//             TRYBOOKINZ
//             </h1>
//           </Link>
//         </div>
//
//         <section className='lg:grid lg:grid-cols-3 lg:space-y-0 gap-5 w-4/6 lg:-mt-1 md:grid md:grid-cols-2 md:py-5 md:space-y-5
//         sm:space-y-5 sm:py-5'>
//           <div>
//             <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
//
//               {t("Search")}
//             </h1>
//             <div
//               className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
//               <Link to='/workspaces'> {t("Search Workspaces")} </Link>
//               <Link to='/workspaces'> {t("Search by City")} </Link>
//               <Link to='/workspaces'> {t("Hottest Coding Space Nearby")} </Link>
//               <Link to='/workspaces'> {t("Search by mentorship Opening")} </Link>
//             </div>
//           </div>
//
//           <div className='lg:-ml-0 md:ml-20'>
//             <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
//
//               {t("Workspace Owners")}
//             </h1>
//             <div
//               className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base '>
//               <Link to='/booking'> {t("List Workspace")} </Link>
//               <Link to='/signup'> {t("Sign Up")} </Link>
//               <Link to='/login'> {t("Login")} </Link>
//             </div>
//           </div>
//
//           <div>
//             <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
//
//               {t("Reviews")}
//             </h1>
//             <div
//               className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
//               <Link to='/viewallreviews'> {t("view all Reviews")} </Link>
//               {/*<Link to='/mostreviewed'> {t("Most Reviewed Spaces")} </Link>*/}
//               <Link to='/howitworks'>{t("How It Works")}</Link>
//             </div>
//           </div>
//
//           <div className='lg:-ml-0 md:ml-20'>
//             <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
//
//               {t("Company")}
//             </h1>
//             <div
//               className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col sm:flex sm:flex-col lg:text-base lg:font-light md:text-base sm:text-base'>
//               <Link to='/about'> {t("About Us")} </Link>
//               <Link to='/blog'> {t("Blog")} </Link>
//               {/*<Link to='/support'> {t("Support")} </Link>*/}
//             </div>
//           </div>
//
//           <div>
//             <h1 className='uppercase text-base text-white lg:font-medium md:font-medium sm:font-medium'>
//
//               {t("Support")}
//             </h1>
//             <div
//               className='lg:flex lg:flex-col gap-3 py-4 md:flex md:flex-col lg:text-base sm:flex sm:flex-col lg:font-light md:text-base sm:text-base'>
//               <Link to='/helpcenter'> {t("Help Center")} </Link>
//               {/*<Link to='/contact'> {t("Contact Us")} </Link>*/}
//               {/*<Link to='/cancel'> {t("Cancellation Option")} </Link>*/}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//
//   )
// }
//
// export default HowItWorksFooterlink;
