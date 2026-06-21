import React from 'react'
import facebook from "../assets/facebook.png";
import twitter from "../assets/twiiter.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";

const usefulLinks = [
  "Blog",
  "Privacy",
  "Terms",
  "FAQs",
  "Security",
  "Contact",
];

const usefulLinks2 = [
  "Partner",
  "Franchise",
  "Seller",
  "Warehouse",
  "Deliver",
  "Resources",
];

const usefulLinks3 = [
  "Recipes",
  "Bistro",
  "District",
  "Blinkit Ambulance",
];

const categories1 = [
  "Bath & Body",
  "Beauty & Cosmetics",
  "Health & Pharma",
  "Atta, Rice & Dal",
  "Bakery & Biscuits",
  "Kitchenware & Appliances",
  "Drinks & Juices",
  "Sauces & Spreads",
  "Home & Lifestyle",
  "Stationery & Games",
  "Rakhi Gifts",
];

const categories2 = [
  "Hair",
  "Feminine Hygiene",
  "Sexual Wellness",
  "Oil, Ghee & Masala",
  "Dry Fruits & Cereals",
  "Chips & Namkeen",
  "Tea, Coffee & Milk Drinks",
  "Paan Corner",
  "Cleaners & Repellents",
  "Print Store",
];

const categories3 = [
  "Skin & Face",
  "Baby Care",
  "Vegetables & Fruits",
  "Dairy, Bread & Eggs",
  "Chicken, Meat & Fish",
  "Sweets & Chocolates",
  "Instant Food",
  "Ice Creams & More",
  "Electronics",
  "E-Gift Cards",
];

export default function Footer() {
  return (
    <footer className="bg-white mt-16 border-t">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Useful Links */}
          <div>
            <h2 className="text-3xl font-semibold mb-8">
              Useful Links
            </h2>

            <div className="grid grid-cols-3 gap-8 text-gray-600">
              <div className="space-y-4">
                {usefulLinks.map((item) => (
                  <p
                    key={item}
                    className="cursor-pointer hover:text-black"
                  >
                    {item}
                  </p>
                ))}
              </div>

              <div className="space-y-4">
                {usefulLinks2.map((item) => (
                  <p
                    key={item}
                    className="cursor-pointer hover:text-black"
                  >
                    {item}
                  </p>
                ))}
              </div>

              <div className="space-y-4">
                {usefulLinks3.map((item) => (
                  <p
                    key={item}
                    className="cursor-pointer hover:text-black"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-3xl font-semibold">
                Categories
              </h2>

              <button className="text-green-600 font-medium">
                see all
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 text-gray-600">
              <div className="space-y-4">
                {categories1.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>

              <div className="space-y-4">
                {categories2.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>

              <div className="space-y-4">
                {categories3.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">

          <p className="text-gray-500 text-sm">
            © Blink Commerce Private Limited, 2016-2026
          </p>

          <div className="flex items-center gap-4">
            <span className="font-semibold">
              Download App
            </span>

            <button className="bg-black text-white px-4 py-2 rounded-lg">
              App Store
            </button>

            <button className="bg-black text-white px-4 py-2 rounded-lg">
              Google Play
            </button>
          </div>

          <div className="flex gap-4">
            {["f", "x", "ig", "in", "t"].map((icon) => (
              <div
                key={icon}
                className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-gray-500 text-sm leading-7">
          <p>
            “Blinkit” is owned & managed by
            "Blink Commerce Private Limited" and is not
            related, linked or interconnected in whatsoever
            manner or nature, to “GROFFR.COM” which is a
            real estate services business operated by
            “Redstone Consultancy Services Private Limited”.
          </p>
        </div>

        <div className="flex gap-4 mt-5">
  <img
    src={facebook}
    alt="Facebook"
    className="w-10 h-10 cursor-pointer"
  />

  <img
    src={twitter}
    alt="Twitter"
    className="w-10 h-10 cursor-pointer"
  />

  <img
    src={instagram}
    alt="Instagram"
    className="w-10 h-10 cursor-pointer"
  />

  <img
    src={linkedin}
    alt="LinkedIn"
    className="w-10 h-10 cursor-pointer"
  />
</div>

      </div>
    </footer>
  );
}



