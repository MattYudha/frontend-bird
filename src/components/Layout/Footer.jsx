import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-12 bg-brand-primary border-t w-full mt-auto">
      <h2 className="text-xl font-montserrat font-semibold text-white mb-4">Contact Us</h2>
      <p className="font-montserrat text-white">
        We'd love to hear from you. For questions, feedback, or support,<br />
        please contact us at{' '}
        <a 
          href="mailto:support@kicaufinder.com" 
          className="font-montserrat text-white font-medium underline decoration-white decoration-1"
        >
          support@kicaufinder.com
        </a>.
      </p>
    </footer>
  );
};

export default Footer;