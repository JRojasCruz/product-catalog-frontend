const API_URL = import.meta.env.VITE_API_URL + "/products";

export const getAllProducts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const error = await res.json();
    throw error;
  }

  return res.json();
};
