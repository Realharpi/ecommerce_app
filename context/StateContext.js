import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    // We update the Total price here. Previous Total price + Price + Quantity.
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    // We update the Total Quantity here. 
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    // Here we will check the products in the cart, whether it exists or not.
    if(checkProductInCart) {
      // if the product we are trying to add to the cart already exists in the cart, we will just increase it's quantity.
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })
      // Here we are updating the Cart items.
      setCartItems(updatedCartItems);
    

    // if the product doesn't already exist then this will happen.
    } else {
      // Quantity will be the quantity chosen by the user.
      product.quantity = quantity;
      
      // Existing previous products (cart items) and new product.
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  // Increase Quantity
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  // Decrease Quantity
  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setShowCart,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);