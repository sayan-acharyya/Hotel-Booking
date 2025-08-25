 import React from "react";

const About = () => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      {/* Heading Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold">
          <span className="text-blue-700">Lanka</span>
          <span className="text-black">Stay</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Your trusted partner for unforgettable stays across Sri Lanka.  
          From luxury resorts to budget-friendly rooms, we make your journey
          smoother, safer, and more memorable.
        </p>
      </div>

      {/* About Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At <span className="font-semibold">LankaStay</span>, we believe that 
            finding the perfect place to stay should be simple and inspiring.  
            Our platform connects travelers with a variety of hotels, resorts,
            and guesthouses across Sri Lanka, offering the best deals for every
            budget and travel style.
          </p>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We aim to provide an easy-to-use platform where travelers can book
            with confidence, enjoy transparent pricing, and experience the true
            warmth of Sri Lankan hospitality. Whether you’re exploring beaches,
            cultural sites, or hill country retreats, <b>LankaStay</b> is here
            to make your trip special.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative">
          <img
            src="https://media.istockphoto.com/id/162137765/photo/summer-swimming-pool.webp?a=1&b=1&s=612x612&w=0&k=20&c=IDuiTpH_uuf0hLBeKrJdym1M3rzSUF1wNxdHKf99H1g="
            alt="Luxury Resort"
            className="rounded-2xl shadow-lg w-full h-80 object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80"
            alt="Hotel Room"
            className="rounded-2xl shadow-lg w-60 h-40 object-cover absolute -bottom-8 -left-8 border-4 border-white"
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">
          Why Choose <span className="text-black">LankaStay?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
              alt="Affordable"
              className="w-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p className="text-gray-600">
              Transparent and competitive rates with no hidden charges.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              alt="Comfort"
              className="w-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Comfort & Quality</h3>
            <p className="text-gray-600">
              A curated selection of hotels ensuring a relaxing stay.
            </p>
          </div>

          <div className="p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854894.png"
              alt="Support"
              className="w-12 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Friendly support to assist you anytime, anywhere in Sri Lanka.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
