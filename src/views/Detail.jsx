// File: src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ZapparFaceTracking from "../components/ZapparARFace";

export default function ProductDetail() {
  const { id } = useParams();

  const fake = {
    message: "Product with id",
    httpCode: 200,
    data: {
      id: "1",
      name: "Kính cận",
      imageCover: "/public/glasses/1.png",
      price: 500000,
      description: "Kính gọng nhựa cao cấp, nhẹ và bền.",
      brandName: "Anna",
      attributes: [
        {
          name: "height",
          value: "12",
        },
      ],
      sizes: ["M", "L"],
      colors: [
        {
          label: "Green",
          arModelUrls: ["/glasses/sunglasses.glb"],
          imageUrls: ["/glasses/1.png"],
        },
        {
          label: "Black",
          arModelUrls: ["/glasses/sunglasses.glb"],
          imageUrls: ["/glasses/1.png"],
        },
      ],
    },
    metaData: null,
  };

  const [product, setProduct] = useState(fake.data);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Bạn có thể dùng API thật ở đây
  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/products/${id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data.data);
  //       setSelectedColorIndex(0);
  //     });
  // }, [id]);

  if (!product) return <p className="p-4">Loading...</p>;

  const selectedColor = product.colors[selectedColorIndex];

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <div
        className="flex-1 bg-black rounded-xl overflow-hidden relative"
        style={{ height: "600px" }}
      >
        {/* Component Zappar AR Face Tracking */}
        <ZapparFaceTracking modelUrl={selectedColor.arModelUrls[0]} />
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow p-4 text-[#7DA0CA]">
        <h1 className="text-2xl font-bold mb-2 text-[#7DA0CA]">
          {product.name}
        </h1>
        <p className="text-[#000]">Thương hiệu: {product.brandName}</p>
        <p className="text-green-600 font-bold">
          {product.price.toLocaleString()} VND
        </p>
        <p className="mt-2">{product.description}</p>

        <div className="mt-4">
          <h3 className="font-semibold text-[#000]">Kích cỡ:</h3>
          <div className="flex gap-2 mt-1">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="bg-gray-200 px-2 py-1 rounded-full cursor-default"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-[#000]">Màu sắc:</h3>
          <div className="flex gap-2 mt-1">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className={`flex flex-col items-center cursor-pointer p-1 rounded-xl border-2 ${
                  index === selectedColorIndex
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedColorIndex(index)}
              >
                <img
                  src={color.imageUrls[0]}
                  alt={color.label}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <span className="text-sm mt-1 text-[#000]">{color.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
