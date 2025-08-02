// import {useState} from 'react'
// import Navpage from "./pages/Navpage"
// import Heropage from "./pages/Heropage"
// import Contentpage from "./pages/Contentpage"
// import Gallerypage from "./pages/Gallerypage"
// import Hoverpage from "./pages/Hoverpage"
// import Featurepage from "./pages/Featurepage"
// import Pricepage from "./pages/Pricepage"
// import Teampage from "./pages/Teampage"
// import Testmonialpage from "./pages/Testmonialpage"
// import Footerpage from "./pages/Footerpage"
// export default function LandPage(){
//     const[bgcolor,setBgcolor]=useState('white')
//     const[textColor,setTextColor]=useState('black')
//     const[mode,setMode]=use(false)
//     if(!mode){
//         setBgcolor('black')
//         setTextColor('lightblue')
//     }
//     const handleClick=()=>{
//         setMode(!mode)
//     }
//     return(
//         <div className ="bg-{bgcolor} text-{textColor}">
//             <Navpage />
//             <Heropage />
//             <Contentpage/>
//             <Gallerypage/>
//             <Hoverpage />
//             <Featurepage/>
//             <Pricepage/>
//             <Teampage/>
//             <Testmonialpage/>
//             <Contentpage/>
//             <Footerpage/>
//         </div>
//     )
// }
// import { useState } from 'react';
// import Navpage from "./pages/Navpage";
// import Heropage from "./pages/Heropage";
// import Contentpage from "./pages/Contentpage";
// import Gallerypage from "./pages/Gallerypage";
// import Hoverpage from "./pages/Hoverpage";
// import Featurepage from "./pages/Featurepage";
// import Pricepage from "./pages/Pricepage";
// import Teampage from "./pages/Teampage";
// import Testmonialpage from "./pages/Testmonialpage";
// import Footerpage from "./pages/Footerpage";

// export default function LandPage() {
//   const [mode, setMode] = useState(false); // ✅ useState should be used like this
//   const bgcolor = mode ? 'black' : 'white';
//   const textColor = mode ? 'white' : 'black';

//   const handleClick = () => {
//     setMode(!mode);
//   };

//   return (
//     <div className={`bg-${bgcolor} text-${textColor}`}>
//       <button onClick={handleClick} className="p-2 m-2 border rounded">
//         Toggle Mode
//       </button>
//       <Navpage/>
//       <Heropage />
//       <Contentpage />
//       <Gallerypage />
//       <Hoverpage />
//       <Featurepage />
//       <Pricepage />
//       <Teampage />
//       <Testmonialpage />
//       <Contentpage />
//       <Footerpage />
//     </div>
//   );
// }
