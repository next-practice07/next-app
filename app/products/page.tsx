"use client";

// pages/index.tsx
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { FaTimes } from "react-icons/fa";
import Cart from '../cart/page';
import { FaShoppingBag } from "react-icons/fa";

const ProductList = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");

  const productsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const savedPage = localStorage.getItem('paginationPage');
    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;



  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem('paginationPage', page.toString());
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredProducts = data.filter((item) =>
    item?.title?.toLowerCase().includes(searchItem.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  // console.log(filteredProducts)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1)
  }, [searchItem])

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-lg font-semibold text-gray-700">Loading...</div>
        </div>
      ) : (
        <>
          <div className="min-h-screen p-6">

            {/* Cards grid */}
            <div className="p-4 relative flex items-center justify-between">
              <input
                type="text"
                placeholder="Search products..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="border-2 p-2 dark:border-white dark:focus:border-gray-400 focus:border-black focus:outline-none hover:shadow rounded-md w-full max-w-md"
              />
              <Link href={'/cart'}>
                <FaShoppingBag size={24} className='dark:text-white' /></Link>
              {searchItem && <FaTimes size={20} className='absolute top-7 left-107 text-gray-400 hover:text-gray-900 hover:dark:text-white hover:cursor-pointer' onClick={() => { setSearchItem("") }} />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProducts.map((item) => {
                const isExpanded = expandedIds.includes(item.id);
                return (
                  <Link href={`/products/${item.id}`} key={item.id}>
                    <div className="cursor-pointer bg-black dark:bg-white rounded-2xl shadow-xl p-6 flex flex-col hover:bg-gray-950 hover:dark:bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-contain rounded-lg bg-white"
                      />
                      <h2 className="text-2xl font-bold mt-4 h-16 overflow-hidden text-ellipsis dark:text-black text-white">
                        {item.title}
                      </h2>
                      <p className="text-gray-500 text-sm mt-2">{item.category}</p>
                      <div className="text-gray-700 mt-4">
                        <p className={`${isExpanded ? '' : 'line-clamp-3'}`}>
                          {item.description}
                        </p>
                        {item.description.length > 100 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault(); // Prevent navigation on button click
                              toggleExpand(item.id);
                            }}
                            className="text-blue-500 mt-2 text-sm"
                          >
                            {isExpanded ? 'Show Less' : 'Show More'}
                          </button>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <span className="text-lg font-semibold text-green-600">
                          ${item.price}
                        </span>
                        <div className="flex items-center">
                          <span className="text-yellow-500 text-md">
                            {item.rating.rate}⭐
                          </span>
                          <span className="text-gray-400 ml-2">
                            ({item.rating.count} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="flex justify-center mt-8 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === index + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>


        </>
      )}
    </>
  );
};

export default ProductList;
