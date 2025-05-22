// File: src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../components/Filter";
import { fetchProducts } from "../service/service";
export default function ProductList() {
  const [filters, setFilters] = useState({
    keyword: "",
    colors: [],
    sizes: [],
    pageNumber: 1,
    pageSize: 10,
  });
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [totalItems, setTotalItems] = useState(0); // tổng số sản phẩm để phân trang

  useEffect(() => {
    fetchProducts(filters)
      .then((res) => {
        setProducts(res.items);
        setTotalItems(res.total);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch sản phẩm:", err);
      });
  }, [filters]);
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters, pageNumber: 1 }); // reset về trang 1 khi filter
  };
  const totalPages = Math.ceil(totalItems / filters.pageSize);
  return (
    <div className="flex px-10 pt-10">
      <div className="w-1/5 pt-4 sticky top-30 h-fit">
        <Filter onFilterChange={handleFilterChange} />
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
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`mx-1 px-3 py-1 rounded ${
                filters.pageNumber === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setFilters({ ...filters, pageNumber: i + 1 })}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
