import React from 'react';

const Footer = () => {
  return (
    <footer className="hidden md:flex w-full bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* 🔥 LEFT - COPYRIGHT */}
        <p className="text-sm md:text-base text-center md:text-left">
          © {new Date().getFullYear()} DevChat. All rights reserved.
          <br className="md:hidden" />
          <span className="block md:inline">
            {' '}
            Developed by{' '}
            <span className="text-white font-medium">Anurag Singh</span>
          </span>
        </p>

        {/* 🔥 RIGHT - SOCIALS */}
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition text-lg"
          >
            🐦
          </a>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-500 transition text-lg"
          >
            ▶️
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition text-lg"
          >
            📘
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
