import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';

// Receiving data as props.
const Home = ({ products, bannerData }) => (
  <div>

  {/* Hero Banner. We are sending banner data as prop to HeroBanner component. */}
    <HeroBanner heroBanner={bannerData.length && bannerData[0]}  />


    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>speaker There are many variations passages</p>
    </div>

    {/* Products Here */}
    <div className="products-container">
      {products?.map((product) => <Product key={product._id} product={product} />)}
    </div>

    {/* Footer Banner */}
    <FooterBanner footerBanner={bannerData && bannerData[0]} />
  </div>
);


// We are fetching data from backend "Sanity"
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
}

export default Home;
