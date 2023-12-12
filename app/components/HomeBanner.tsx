const HomeBanner = () => {
  return ( <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
    <div className="mx-auto flex px-8 py-12 flex-col md:flex-row items-center justify-evenly ">
      <div className="mb-8 md:mb-0 text-center">
     <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">Summer Sale!</h1>
     <p className="text-white text-lg md:text-xl mb-2">Enjoy discounts on selected Items</p>
     <p className="text-yellow-400 text-2xl md:text-5xl font-bold">GET 50% OFF</p>
      </div>
      <div className="w-1/3 relative aspect-video">
        <img
        src="/apple.png"
        fill
        alt='s'
        />
      </div>
    </div>
  </div> );
}
 
export default HomeBanner;