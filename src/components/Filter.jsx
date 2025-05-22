// src/components/Filter.jsx
import { useState } from "react";

export default function Filter({ onFilterChange }) {
  const [keyword, setKeyword] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const colors = ["Black", "Brown", "Green", "Blue", "White"];
  const sizes = ["XXS", "XS", "S", "M", "L", "XL"];

  const handleCheckboxChange = (value, list, setList) => {
    setList((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({
      keyword,
      colors: selectedColors,
      sizes: selectedSizes,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow mb-4 w-full text-[#000]"
      >
        <h2 className="text-xl text-[#7DA0CA] font-semibold mb-4">Bộ lọc</h2>

        {/* Tìm kiếm */}
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm theo tên kính..."
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />

        {/* Lọc theo màu */}
        <div className="mb-4">
          <p className="font-medium mb-1">Màu sắc:</p>
          <div className="flex gap-4 flex-wrap">
            {colors.map((color) => (
              <label key={color} className="flex items-center gap-2 ">
                <input
                  className="border border-gray-400 bg-pink-200"
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() =>
                    handleCheckboxChange(
                      color,
                      selectedColors,
                      setSelectedColors
                    )
                  }
                />
                {color}
              </label>
            ))}
          </div>
        </div>

        {/* Lọc theo kích cỡ */}
        <div className="mb-4">
          <p className="font-medium mb-1">Kích cỡ:</p>
          <div className="flex gap-4 flex-wrap">
            {sizes.map((size) => (
              <label key={size} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() =>
                    handleCheckboxChange(size, selectedSizes, setSelectedSizes)
                  }
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-[#7DA0CA] text-white rounded hover:bg-blue-700"
        >
          Áp dụng
        </button>
      </form>
    </div>
  );
}
