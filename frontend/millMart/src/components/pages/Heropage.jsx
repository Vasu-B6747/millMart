// export default function Heropage(){
//     return(
//         <section>
//             <section className="text-gray-600 body-font">
//   <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
//     <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
//       <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Before they sold out
//         <br className="hidden lg:inline-block" />readymade Upgrade Your Mill
//       </h1>
//       <p className="mb-8 leading-relaxed"> Milltec, Preferred global company for all grain processing solutions. AGI MILLTEC is passionately committed to delivering customer-driven innovative solutions, to save process loss, and to maintain hygienic standards in food processing and allied industries by adopting qualitative practices.</p>
//       <div className="flex justify-center">
//         <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Buy</button>
//         <button className="ml-4 inline-flex text-gray-700 bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sell</button>
//       </div>
//     </div>
//     <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
//       <img className="object-cover object-center rounded" alt="hero" src="src/assets/pulse-processing-500x500.webp"/>
//     </div>
//   </div>
// </section>
//         </section>
//     )
// }
// import {heroImage} from 'src/assets/pulse-processing-500x500.webp'; // Adjust path as needed

export default function Heropage() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Before they sold out
            <br className="hidden lg:inline-block" />
            readymade Upgrade Your Mill
          </h1>
          <p className="mb-8 leading-relaxed">
            Milltec, Preferred global company for all grain processing solutions. AGI MILLTEC is passionately committed
            to delivering customer-driven innovative solutions, to save process loss, and to maintain hygienic standards
            in food processing and allied industries by adopting qualitative practices.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Buy
            </button>
            <button className="ml-4 inline-flex text-gray-700 bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Sell
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <img className="object-cover object-center rounded" alt="hero" src="src/assets/pulse-processing-500x500.webp" />
        </div>
      </div>
    </section>
  );
}
