"use client";

// pages/product/[id].tsx


import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaTimes  } from "react-icons/fa";


const ProductDetail = () => {
    const params = useParams();
    const router = useRouter();
    //   const { id } = router.query;

    let id = Number(params?.id);

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState<number | null>(null);
    const [searchItem, setSearchItem] = useState<string>("");
    const [imageOpen, setImageOpen] = useState<boolean>(false)


    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                    const result = await response.json();
                    setProduct(result);
                } catch (err) {
                    console.error('Failed to fetch products:', err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }



    }, [id]);


    useEffect(() => {
        const fetchData1 = async () => {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            setCount(data.length); // Count the items
        };

        fetchData1();
    }, []);



    const handleCardChange = (card: number) => {
        if (card >= 1 && card <= 20) {
            router.push(`/products/${card}`)
        }
    }


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg font-semibold text-gray-700">Loading...</div>
            </div>
        );
    }

    if (!product) {
        return <div className="p-6">Product not found.</div>;
    }

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-black">
            {
                searchItem && <div> <h1>Hello world</h1></div>
            }
            <div>
                <button><Link href="/">
                    <span className="mb-4 inline-block px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 cursor-pointer">
                        ← Back to Products
                    </span>
                </Link></button>
                <div>
                    <input></input>
                </div>
                <div className='flex justify-center items-center'>
                    <button
                        disabled={id === 1}
                        onClick={() => handleCardChange(id - 1)}
                        className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 h-12 cursor-pointer"
                    >
                        &lt;
                    </button>
                    <div className="max-w-4xl mx-auto bg-white  p-6 rounded-2xl shadow-xl">

                        <div className="flex flex-col md:flex-row">
                            <Image src={product.image} alt={product.title} width={500}
                                height={500} className="w-full md:w-1/2 h-96 object-contain bg-white rounded-lg" onClick={()=>{setImageOpen(true)}} />
                            {/* <img
                            src={product.image}
                            alt={product.title}
                            className="w-full md:w-1/2 h-96 object-contain bg-white rounded-lg"
                        /> */}
                            <div className="md:ml-8 mt-6 md:mt-0">
                                <h1 className="text-3xl font-bold">{product.title}</h1>
                                <p className="text-sm text-gray-500 mt-2">{product.category}</p>
                                <p className="text-gray-700 mt-4">{product.description}</p>
                                <div className="mt-6 flex justify-between items-center">
                                    <span className="text-xl font-semibold text-green-600">${product.price}</span>
                                    <div>
                                        <span className="text-yellow-500 text-md">{product.rating.rate}⭐</span>
                                        <span className="text-gray-400 ml-2">({product.rating.count} reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        disabled={count === id}
                        onClick={() => handleCardChange(id + 1)}
                        className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 h-12 cursor-pointer"
                    >
                        &gt;
                    </button>
                </div>
            </div>
            <div>
            {imageOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <div className="relative">
                <img src={product.image} alt="Full view" className="max-h-[90vh] max-w-[90vw]" />
                <button
                  
                  className="absolute top-5 right-5  text-2xl"
                >
                  <FaTimes size={20} className='text-gray-900 cursor-pointer transition-transform duration-200 hover:scale-125' onClick={() => setImageOpen(false)} />
                </button>
              </div>
            </div>
          )}
            </div>
        </div>
        
    );
};

export default ProductDetail;
