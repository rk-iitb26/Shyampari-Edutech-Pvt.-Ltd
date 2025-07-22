// src/Components/Footer.jsx
import React from 'react';
import { FaUserPlus, FaLaptopCode, FaMoneyBillWave } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Column 1: Company Info / Logo */}
                    <div className="col-span-full md:col-span-1 text-center md:text-left mb-6 md:mb-0">
                        {/* Replace with your logo if you have one */}
                        <h3 className="text-2xl font-bold text-white mb-2">Shampari Edutech Pvt.Ltd</h3>
                        <p className="text-gray-400 text-sm">Empowering Futures with Quality Education.</p>
                        <p className="text-gray-400 text-sm mt-2">
                            Pune, Maharashtra, India
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">How It Works</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Testimonials</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Courses</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="tel:+911234567890" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    <i className="fas fa-phone mr-2"></i>+91 12345 67890
                                </a>
                            </li>
                            <li>
                                <a href="mailto:info@shampari.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                                    <i className="fas fa-envelope mr-2"></i>info@shampari.com
                                </a>
                            </li>
                            <li>
                                <span className="text-gray-400">
                                    <i className="fas fa-map-marker-alt mr-2"></i>123 Edutech Road, Knowledge City, Pune, India
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social Media */}
                    <div className="text-center md:text-left">
                        <h4 className="text-lg font-semibold mb-4 text-white">Follow Us</h4>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200" aria-label="Facebook">
                                <i className="fab fa-facebook-f text-2xl"></i>
                            </a>
                            <a href="https://www.youtube.com/@shyampariedutech/featured" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Twitter">
                                <i className="fab fa-youtube text-2xl"></i>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-200" aria-label="Instagram">
                                <i className="fab fa-instagram text-2xl"></i>
                            </a>
                            <a href="https://in.linkedin.com/company/shyampariedutech" className="text-gray-400 hover:text-blue-700 transition-colors duration-200" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in text-2xl"></i>
                            </a>
                        </div>
                        {/* Optional: Newsletter Signup */}
                        {/* <h4 className="text-lg font-semibold mt-8 mb-4 text-white">Newsletter</h4>
            <form>
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200"
              >
                Subscribe
              </button>
            </form> */}
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Shampari Edutech Pvt.Ltd. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;