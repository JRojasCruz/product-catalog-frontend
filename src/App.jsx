import ProductList from "./pages/ProductList";
import ProductForm from "./components/ProductForm";
import { useState } from "react";

function App() {
  const [reload, setReload] = useState(false);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-3">{/* columna izquierda vacía */}</div>

        <div className="col-md-6">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fw-bold">Catálogo de Productos</h1>
          </div>
        </div>
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#productModal"
          >
            Agregar
          </button>
        </div>
        <ProductList key={reload} />

        <div className="col-md-3">{/* columna derecha vacía */}</div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Producto</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              <ProductForm
                onProductCreated={() => {
                  setReload(!reload);
                  document.querySelector("#productModal .btn-close").click();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
