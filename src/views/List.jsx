// File: src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/Filter";

export default function ProductList() {
  const fake = {
    message: "Danh sách product",
    httpCode: 200,
    data: [
      {
        id: "1",
        name: "Kính cận",
        imageCover: "/glasses/1.png",
        price: 500000,
        description: "Kính gọng nhựa cao cấp, nhẹ và bền.",
        brandName: "Anna",
      },
      {
        id: "2",
        name: "Kính thời trang",
        imageCover: "/glasses/2.png",
        price: 750000,
        description: "Phong cách hiện đại, phù hợp cả nam và nữ.",
        brandName: "Zoro",
      },
      {
        id: "3",
        name: "Kính thời trang",
        imageCover: "/glasses/2.png",
        price: 750000,
        description: "Phong cách hiện đại, phù hợp cả nam và nữ.",
        brandName: "Zoro",
      },
      {
        id: "4",
        name: "Kính thời trang",
        imageCover: "/public/glasses/2.png",
        price: 750000,
        description: "Phong cách hiện đại, phù hợp cả nam và nữ.",
        brandName: "Zoro",
      },
      {
        id: "4",
        name: "Kính thời trang",
        imageCover: "/public/glasses/2.png",
        price: 750000,
        description: "Phong cách hiện đại, phù hợp cả nam và nữ.",
        brandName: "Zoro",
      },
      {
        id: "4",
        name: "Kính thời trang",
        imageCover: "/public/glasses/2.png",
        price: 750000,
        description: "Phong cách hiện đại, phù hợp cả nam và nữ.",
        brandName: "Zoro",
      },
      {
        id: "4",
        name: "Kính thời trang",
        imageCover: "/public/glasses/2.png",
        price: 750000,
        description: "Phong cách hiện đại, phù hợp cả nam và nữ.",
        brandName: "Zoro",
      },
    ],
    metaData: {
      pageNumber: 1,
      pageSize: 10,
      totalElement: 2,
      totalPage: 1,
    },
  };
  const [products, setProducts] = useState(fake.data);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     fetch("http://localhost:8080/api/products")
  //       .then((res) => res.json())
  //       .then((data) => setProducts(data.data));
  //   }, []);

  return (
    <div className="flex px-10 pt-10">
      <div className="w-1/5 pt-4 sticky top-30 h-fit">
        <Filter></Filter>
      </div>
      <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow p-4 cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.imageCover || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="mt-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.brandName}</p>
              <p className="text-green-600 font-bold">
                {product.price.toLocaleString()} VND
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
