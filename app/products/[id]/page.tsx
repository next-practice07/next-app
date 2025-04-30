"use client";

// pages/product/[id].tsx


import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ProductDetail = () => {
    const { id } = useParams();
    //   const { id } = router.query;

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

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



    }, []);

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
        <div className="min-h-screen p-6 bg-gray-100">
                <button><Link href="/">
                    <span className="mb-4 inline-block px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-gray-800 cursor-pointer">
                        ← Back to Products
                    </span>
                </Link></button>
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
                
                <div className="flex flex-col md:flex-row">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full md:w-1/2 h-96 object-contain bg-white rounded-lg"
                    />
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
        </div>
    );
};

export default ProductDetail;
