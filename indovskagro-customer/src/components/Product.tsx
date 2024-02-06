import type { Product } from "../types";

export function ProductComponent({ product }: { product: Product }) {
  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="rounded position-relative fruite-item">
        <div className="fruite-img">
          <img
            src={product.image}
            className="img-fluid w-100 rounded-top"
            alt=""
          />
        </div>
        <div
          className="text-white bg-secondary px-3 py-1 rounded position-absolute"
          style={{
            top: "10px",
            left: "10px",
          }}
        >
          Fruits
        </div>
        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
          <h4>{product.title}</h4>
          <p>{product.description}</p>
          <div className="d-flex justify-content-between flex-lg-wrap">
            <p className="text-dark fs-5 fw-bold mb-0">
              {((price: string) => {
                const amount = parseFloat(price);
                const formatted = new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(amount);

                return (
                  <div className="text-right font-medium">{formatted}</div>
                );
              })(product.price.toString())}
            </p>
            <a
              href="#"
              className="btn border border-secondary rounded-pill px-3 text-primary"
            >
              <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to
              cart
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
