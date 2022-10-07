// It is in square brackets because it's going to dynamic. 
// When we click on each product, like Headphones or Speakers, It will open all the Headphones and Speakers list.

import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';


const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  // We are getting this from StateContext.
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">

            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>

          <div className="small-images-container">
          {/* Display all the images by looping through them using map. */}
            {image?.map((item, i) => (
              <img 
                key={i}
                src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

         {/* Product description. */}
        <div className="product-detail-desc">
          {/* Product name */}
          <h1>{name}</h1>

          <div className="reviews">
          {/* Review stars. */}
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>

            {/* Number of reviews. */}
            <p>
              (20)
            </p>
          </div>

          {/* Details of the products. */}
          <h4>Details: </h4>
          <p>{details}</p>

          {/* Price */}
          <p className="price">${price}</p>

          {/* How many do you want to buy. Order Quantity */}
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>


      {/* Displaying more products the customer might like, under the main product */}
      <div className="maylike-products-wrapper">
          <h2>You may also like</h2>
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  // * means get all. type == "product" means get the things where the type is product. Inside the product, get slug and current slug which we clicked on.
  const query = `*[_type == "product"] {slug {current}}`

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

// getStaticProps is a Next js function.
export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product }
  }
}

export default ProductDetails