// import React from 'react'
//
//
// const KommunicateChat = () => {
//
//
//   (function (d, m) {
//
//     const kommunicateSettings =
//
//       {
//         appId: '11013f1895cc82dba05df233fe3af57f5', popupWidget: true, automaticChatOpenOnNavigation: true,
//
//         "preLeadCollection": [{
//           "field": "Name", // Name of the field you want to add
//           "required": true, // Set 'true' to make it a mandatory field
//           "placeholder": "Enter your name" // add whatever text you want to show in the placeholder
//         },
//
//           {
//             "field": "Email",
//             "type": "email",
//             "required": true,
//             "placeholder": "Enter your email"
//           },
//         ]
//       };
//
//     const s = document.createElement('script');
//     s.type = 'text/javascript';
//     s.async = true;
//
//     s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
//
//     const h = document.getElementsByTagName('head')[0];
//     h.appendChild(s);
//
//     window.kommunicate = m;
//     m._globals = kommunicateSettings;
//
//   })(document, window.kommunicate || {});
//
//
//   return (
//     <div>
//     </div>
//   )
// }
// export default KommunicateChat