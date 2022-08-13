import React from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-container">

      {/* Footer Text */}
      <p>Copyright © 2022 Harpinder. All rights reserved.</p>

      {/* Footer Icons */}
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer