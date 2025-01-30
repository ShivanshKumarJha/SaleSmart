import React from 'react';
import {FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa';
import {HiHeart} from 'react-icons/hi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-800 text-slate-200 py-2">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-['Open Sans']">
                    <div className="text-center md:text-left">
                        <p className="text-sm">
                            © {currentYear} Shivansh Kumar Jha. All rights reserved.
                        </p>
                        <p className="mt-1 text-slate-400 text-sm flex items-center justify-center md:justify-start gap-1">
                            Made with <HiHeart className="text-red-400"/> in India
                        </p>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a
                            href="https://github.com/ShivanshKumarJha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-white transition-colors duration-300"
                        >
                            <FaGithub className="w-6 h-6"/>
                        </a>

                        <a
                            href="https://linkedin.com/in/shivansh-kumar-jha-4b3141234/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-blue-400 transition-colors duration-300"
                        >
                            <FaLinkedin className="w-6 h-6"/>
                        </a>

                        <a
                            href="https://x.com/Shivansh2003_26"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-300 hover:text-blue-500 transition-colors duration-300"
                        >
                            <FaTwitter className="w-6 h-6"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;