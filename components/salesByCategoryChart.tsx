import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Define the shape of each item in the chart
interface CategoryData {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#b366ff', '#ff6666'];

export default function SalesByCategoryChart() {
  const [data, setData] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products: { category: string }[] = await res.json();

        const categoryMap: Record<string, number> = {};
        products.forEach((item) => {
          categoryMap[item.category] = (categoryMap[item.category] || 0) + 1;
        });

        const formattedData: CategoryData[] = Object.entries(categoryMap).map(
          ([key, value]) => ({
            name: key,
            value,
          })
        );

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full h-[400px]">
      <h2 className="text-xl font-semibold mb-4 text-center">🛍️ Sales by Category</h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
