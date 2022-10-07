import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './';
import { useStateContext} from '../context/StateContext';

const Navbar = () => {
  // To display the Cart. We are getting it via StateContext.
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">

      {/* Name logo */}
      <p className="logo">
        <Link href="/">Harpi</Link>
      </p>

      {/* Cart button.  ShowCart will be true when we click on the button. */}
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>

        {/* Cart Icon */}
        <AiOutlineShopping />

        {/* Display number of items inside the cart. */}
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {/* If Showcart is true (when we click on the button), Call the "Cart" component. */}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar