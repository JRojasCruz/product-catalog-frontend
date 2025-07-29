import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getProductById(id)
      .then(setProduct)
      .catch(() => setError("Producto no encontrado."));
  }, [id]);

  if (error)
    return (
      <div className="container py-5 text-center">
        <p className="text-danger">{error}</p>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    );

  if (!product)
    return (
      <div className="container py-5 text-center">
        <p>Cargando...</p>
      </div>
    );

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Detalle del Producto</h3>

          <p className="mb-2">
            <strong>Nombre:</strong> {product.name}
          </p>
          <p className="mb-2">
            <strong>Descripción:</strong>{" "}
            {product.description || "No especificada"}
          </p>
          <p className="mb-2">
            <strong>Precio:</strong> S/ {product.price.toFixed(2)}
          </p>
          <p className="mb-2">
            <strong>Categoría:</strong> {product.category}
          </p>
          <p className="mb-3">
            <strong>Creado el:</strong>{" "}
            {new Date(product.createdAt).toLocaleString()}
          </p>

          <div className="text-center">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate(-1)}
            >
              ← Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
