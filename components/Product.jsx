import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

// Receiving product data from backend and destructing it
const Product = ({ product: { image, name, slug, price } }) => {
  return (

    <div>
    {/* Point to the current slug */}
      <Link href={`/product/${slug.current}`}>

      {/* Must add a child. Below div is a child. */}
        <div className="product-card">

        {/* Product Image. */}
          <img src={urlFor(image && image[0])} width={250} height={250} className="product-image" />

          {/* Product Name */}
          <p className="product-name">{name}</p>

          {/* Product Price */}
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product