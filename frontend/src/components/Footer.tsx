import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Brand and Description */}
        <div>
          <h2 className="text-3xl text-white font-bold">HULUBEAND</h2>
          <p className="mt-4">
            Your one-stop destination for finding the best hotels at the lowest prices. Experience luxury and comfort wherever you go.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about-us" className="hover:text-white">About Us</Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-white">Contact Us</Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">FAQ</Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-white">Terms and Conditions</Link>
            </li>
          </ul>
        </div>

        {/* Social Media & Contact */}
        <div>
          <h3 className="text-xl text-white font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-6">
            <a href="https://www.facebook.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com" className="hover:text-white" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
          </div>
          <p>
            <strong>Email:</strong> support@hulubeand.com
          </p>
          <p>
            <strong>Phone:</strong> +251 92 343 5442
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} HULUBEAND. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
