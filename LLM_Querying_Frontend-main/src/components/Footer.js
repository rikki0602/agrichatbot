import React from "react";

function Footer() {
  return (
    <footer className="bg-transparent shadow-md pt-3 pb-9 pl-8 mt-auto">
      <div className="container mx-auto px-8">
        <p className="text-white tracking-widest text-xs">
          &copy; {new Date().getFullYear()} AgriLLM. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
