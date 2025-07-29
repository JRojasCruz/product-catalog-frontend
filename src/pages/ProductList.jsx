import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import { Link } from "react-router-dom";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch((err) => setError("Error cargando productos"));
  }, []);

  return (
    <div>
      <h2>Listado de Productos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>S/ {prod.price.toFixed(2)}</td>
                <td>
                  <Link
                    to={`/product/${prod.id}`}
                    title="Ver detalles del producto"
                    className="text-decoration-none"
                  >
                    <i className="bi bi-eye-fill"></i>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No hay productos...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
