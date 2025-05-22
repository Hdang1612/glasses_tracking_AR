// File: src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ZapparFaceTracking from "../components/ZapparARFace";
import ModelViewer from "../components/ModelView";
import SizePredictor from "../components/Predict";
import { fetchProductById } from "../service/service";
export default function ProductDetail() {
  const { id } = useParams();
  const [showARModal, setShowARModal] = useState(false);
  const [show3DModal, setShow3DModal] = useState(false);
  const [showPredictModal, setShowPredictModal] = useState(false);

  // const fake = {
  //   message: "Product with id",
  //   httpCode: 200,
  //   data: {
  //     id: "1",
  //     name: "Kính cận",
  //     imageCover: "/public/glasses/1.png",
  //     price: 500000,
  //     description: "Kính gọng nhựa cao cấp, nhẹ và bền.",
  //     brandName: "Anna",
  //     attributes: [
  //       {
  //         name: "height",
  //         value: "12",
  //       },
  //     ],
  //     sizes: ["M", "L"],
  //     colors: [
  //       {
  //         label: "Green",
  //         arModelUrls: ["/glasses/sunglasses.glb"],
  //         imageUrls: ["/glasses/1.png"],
  //       },
  //       {
  //         label: "Black",
  //         arModelUrls: ["/glasses/sunglasses.glb"],
  //         imageUrls: ["/glasses/2.png"],
  //       },
  //     ],
  //   },
  //   metaData: null,
  // };
  const [product, setProduct] = useState();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  useEffect(() => {
    fetchProductById(id)
      .then((productData) => {
        setProduct(productData);
        setSelectedColorIndex(0);
      })
      .catch((error) => {
        // Xử lý lỗi nếu cần
        setProduct(null);
      });
  }, [id]);

  if (!product) return <p className="p-4">Loading...</p>;

  const selectedColor = product.colors[selectedColorIndex];
  const displayedImage = selectedColor?.imageUrls?.[0] || product.imageCover;

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <div
        className="flex-1 bg-black rounded-xl overflow-hidden relative"
        style={{ height: "500px" }}
      >
        {/* Component Zappar AR Face Tracking */}
        {/* <ZapparFaceTracking modelUrl={selectedColor.arModelUrls[0]} /> */}
        <img
          src={displayedImage}
          alt=""
          className="object-contain max-h-full"
        />
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
                className="bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full cursor-default"
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
          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setShowARModal(true)}
              className="bg-[#5483B3] text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Mở camera thử kính
            </button>
            <button
              onClick={() => setShow3DModal(true)}
              className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-800"
            >
              Xem kính 3D
            </button>
            <button
              onClick={() => setShowPredictModal(true)}
              className="bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-800"
            >
              Dự đoán kích thước
            </button>
          </div>
        </div>
        {/* MODAL for AR */}
        {showARModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-xl w-[60%] h-[80%] relative">
              <button
                onClick={() => setShowARModal(false)}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
              >
                X
              </button>
              <ZapparFaceTracking modelUrl={selectedColor.arModelUrls[0]} />
            </div>
          </div>
        )}

        {/* MODAL for 3D */}
        {show3DModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-xl w-[60%] h-[80%] relative">
              <button
                onClick={() => setShow3DModal(false)}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 flex items-center justify-center rounded-full"
              >
                X
              </button>
              <ModelViewer modelUrl={selectedColor.arModelUrls[0]} />
            </div>
          </div>
        )}
        {showPredictModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-xl w-[60%] h-[100%] ">
              <SizePredictor onClose={() => setShowPredictModal(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
