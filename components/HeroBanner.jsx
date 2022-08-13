import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

// Receiving Banner from sanity as a prop here.
const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">

    
      <div>
        {/* Small Text */}
        <p className="beats-solo">{heroBanner.smallText}</p>

        {/* Medium Text */}
        <h3>{heroBanner.midText}</h3>

        {/* All Caps Text */}
        <h1>{heroBanner.largeText1}</h1>

        {/* Banner Image */}
        <img src={urlFor(heroBanner.image)} alt="headphones" className="hero-banner-image" />

        {/* "Show Now" Button with a Link. */}
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>

          {/* Description at the bottom-right corner */}
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HeroBanner