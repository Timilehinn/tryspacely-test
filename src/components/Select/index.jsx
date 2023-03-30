import React, { useState } from "react";

const SelectElement = ({
  t,
  options = [],
  selectedValue,
  label = "label",
  defaultValue = "none",
}) => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(defaultValue);

  const handleShow = () => setShow(!show);
  const handleSelected = (e, label, value) => {
    e.preventDefault();
    selectedValue(value);
    setSelected(label);
    handleShow();
  };

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={handleShow}
          className="relative cursor-default gap-2 rounded-lg border-[.5px] border-[#dbdada73] h-[40px] min-w-[250px] bg-white p-2 text-xs   pl-3 pr-10 text-left shadow-sm sm:text-sm"
        >
          <span className="flex items-center">
            <span>{label}</span>
            <span className="ml-2 capitalize block truncate text-[14px]">
              {selected}
            </span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>

        {show && (
          <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options?.map(({ label, value }, idx) => (
              <li
                key={idx}
                className="hover:bg-[#dbdada50] w-full text-gray-900  cursor-default select-none  "
              >
                <button
                  value={t(value)}
                  onClick={(e) => handleSelected(e, label, value)}
                  className="h-full w-full pl-2 text-left font-normal py-2  block truncate text-xs capitalize border-none"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SelectElement;

// export const NestedDropDown = () => {
//   //this should go in the css file
//   //     <style>

//   //   li>ul                 { transform: translatex(100%) scale(0) }
//   //   li:hover>ul           { transform: translatex(101%) scale(1) }
//   //   li > button svg       { transform: rotate(-90deg) }
//   //   li:hover > button svg { transform: rotate(-270deg) }

//   //   .group:hover .group-hover\:scale-100 { transform: scale(1) }
//   //   .group:hover .group-hover\:-rotate-180 { transform: rotate(180deg) }
//   //   .scale-0 { transform: scale(0) }
//   //   .min-w-32 { min-width: 8rem }
//   // </style>
//   return (
//     <div class="group inline-block">
//       <button class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
//         <span class="pr-1 font-semibold flex-1">Dropdown</span>
//         <span>
//           <svg
//             class="fill-current h-4 w-4 transform group-hover:-rotate-180
//         transition duration-150 ease-in-out"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 20 20"
//           >
//             <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//           </svg>
//         </span>
//       </button>
//       <ul
//         class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute
//   transition duration-150 ease-in-out origin-top min-w-32"
//       >
//         <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Programming</li>
//         <li class="rounded-sm px-3 py-1 hover:bg-gray-100">DevOps</li>
//         <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
//           <button class="w-full text-left flex items-center outline-none focus:outline-none">
//             <span class="pr-1 flex-1">Langauges</span>
//             <span class="mr-auto">
//               <svg
//                 class="fill-current h-4 w-4
//             transition duration-150 ease-in-out"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//               </svg>
//             </span>
//           </button>
//           <ul
//             class="bg-white border rounded-sm absolute top-0 right-0
//   transition duration-150 ease-in-out origin-top-left
//   min-w-32
//   "
//           >
//             <li class="px-3 py-1 hover:bg-gray-100">Javascript</li>
//             <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
//               <button class="w-full text-left flex items-center outline-none focus:outline-none">
//                 <span class="pr-1 flex-1">Python</span>
//                 <span class="mr-auto">
//                   <svg
//                     class="fill-current h-4 w-4
//                 transition duration-150 ease-in-out"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                   </svg>
//                 </span>
//               </button>
//               <ul
//                 class="bg-white border rounded-sm absolute top-0 right-0
//       transition duration-150 ease-in-out origin-top-left
//       min-w-32
//       "
//               >
//                 <li class="px-3 py-1 hover:bg-gray-100">2.7</li>
//                 <li class="px-3 py-1 hover:bg-gray-100">3+</li>
//               </ul>
//             </li>
//             <li class="px-3 py-1 hover:bg-gray-100">Go</li>
//             <li class="px-3 py-1 hover:bg-gray-100">Rust</li>
//           </ul>
//         </li>
//         <li class="rounded-sm px-3 py-1 hover:bg-gray-100">Testing</li>
//       </ul>
//     </div>
//   );
// };
