import hotelImage from '../assets/background.jpg';

const Hero = () => {
  return (
    <div className="relative bg-gray-100 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hotelImage}
          alt="Hotel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
      </div>
      <div className="container mx-auto px-6 py-24 text-center relative z-10">
        <h1 className="text-5xl font-bold text-white">
          Escape to Paradise
        </h1>
        <p className="text-lg text-white mt-4">
          30% ቅናሽ ለ ሃገር ውስጥ ደንበኞቻችን, Book your dream vacation today!
        </p>
        <button className="bg-white text-black font-bold py-3 px-6 rounded-md mt-6 hover:bg-gray-200 focus:outline-none focus:shadow-outline">
          Explore Destinations
        </button>
      </div>
    </div>
  );
};

export default Hero;
