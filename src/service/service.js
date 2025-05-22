import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export async function fetchProductById(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data.data; 
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}   

/**
 * 
 * @param {object} filter - đối tượng filter, ví dụ:
 *  {
 *    keyword: "kính",
 *    colors: ["Black", "Green"],
 *    sizes: ["M"],
 *    brand: "Anna",
 *    pageNumber: 1,
 *    pageSize: 10,
 *    orderBy: "price",
 *    direction: "desc"
 *  }
 */
export async function fetchProducts(filters) {
  const query = new URLSearchParams();

  if (filters.keyword) query.append("keyword", filters.keyword);
  if (filters.colors.length > 0) query.append("colors", filters.colors.join(","));
  if (filters.sizes.length > 0) query.append("sizes", filters.sizes.join(","));
  if (filters.brand) query.append("brand", filters.brand);
  if (filters.orderBy) query.append("orderBy", filters.orderBy);
  if (filters.direction) query.append("direction", filters.direction);
  query.append("pageNumber", filters.pageNumber || 1);
  query.append("pageSize", filters.pageSize || 10);
  query.append("orderBy", "id");
  query.append("direction", "asc");

  try {
    const response = await axios.get(`${API_BASE_URL}/products?${query.toString()}`);
    return {
      items: response.data.data,           // danh sách sản phẩm
      total: response.data.totalItems,     // tổng số lượng
    };
  } catch (error) {
    console.error("Lỗi khi tải danh sách sản phẩm:", error);
    throw error;
  }
}




export async function predictSizeFromImage(imageBlob) {
  const formData = new FormData();
  formData.append("file", imageBlob, "photo.jpg"); 

  try {
    const response = await axios.post(`${API_BASE_URL}/eyeglass-size/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // hoặc response.data.data nếu có wrapper
  } catch (error) {
    console.error("Lỗi khi dự đoán kích thước:", error);
    throw error;
  }
}




