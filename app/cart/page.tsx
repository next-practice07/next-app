"use client";

import React, { useEffect, useState } from 'react';
import { getUserId } from '../../utils/user';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";


type CartItem = {
  productId: number;
  quantity: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity:number;
};

const Cart: React.FC = () => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const userId = getUserId();
      const res = await fetch(`https://fakestoreapi.com/carts/user/3`);
      const data = await res.json();
      // console.log(data)
  
      // Get the most recent cart for this user
      const latestCart = data[data.length - 1];
      const items: CartItem[] = latestCart?.products || [];

      console.log(items)

      const productDetails = await Promise.all(
        items.map(async item => {
          const res = await fetch(`https://fakestoreapi.com/products/${item.productId}`);
          const product: Product = await res.json();
          return {
            ...product,
            quantity: item.quantity,
          };
        })
      );

      setCartProducts(productDetails);
      setLoading(false);
    };

    fetchCart();
  }, []);

  const increaseCount = () => {
    
  }


  if (loading) return <p className="text-center text-gray-500">Loading cart...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
      {cartProducts.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        cartProducts.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b py-2">
            <div className="flex items-center space-x-4">
              <img src={item.image} alt={item.title} className="h-16 w-16 object-contain" />
              <div>
                <p className="font-medium">{item.title}</p>
                <div className='flex items-center'>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <div className='ms-2 mt-1'>
                      <FaChevronUp size={10} className='text-gray-500 hover:text-black hover:cursor-pointer'/>
                      <FaChevronDown size={10} className='text-gray-500 hover:text-black hover:cursor-pointer'/>
                    </div>
                </div>
                
              </div>
            </div>
            <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
