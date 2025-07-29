import { useState } from "react";
import { createProduct } from "../services/productService";

function ProductForm({ onProductCreated }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !formData.name ||
      !formData.category ||
      parseFloat(formData.price) <= 0
    ) {
      setError(
        "Por favor, completa todos los campos requeridos con valores válidos."
      );
      return;
    }

    try {
      await createProduct({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
      });

      setFormData({ name: "", description: "", price: "", category: "" });
      setError("");
      setSuccess("Producto creado exitosamente.");

      if (onProductCreated) onProductCreated(); // para recargar lista
    } catch (err) {
      setError("Error al crear producto.");
      setSuccess("");
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        {/* <h3 className="card-title mb-4 text-center">Agregar Nuevo Producto</h3> */}

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <input
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              className="form-control"
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <input
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
