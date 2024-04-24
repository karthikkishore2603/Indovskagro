import React from "react";
import { ProductComponent } from "./components/Product";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./firebase/products";

import type { Product } from "./types";

// import { Button } from "@mui/material";



export default function ProductsShop() {
  // key is string and the value is product
  const [groups, setGroups] = React.useState<Record<string, Product[]>>({});

  const { isPending, data } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async function () {
      const products = await getProducts();
      return products;
    },
  });

  React.useEffect(() => {
    // group products by category
    if (data) {
      const grouped = data.reduce((acc, product) => {
        if (acc[product.category]) {
          acc[product.category].push(product);
        } else {
          acc[product.category] = [product];
        }
        return acc;
      }, {} as Record<string, Product[]>);
      setGroups(grouped);
    }
  }, [data]);

  if (isPending) return;

  return (
    <>
      <div className="tab-class text-center">
        <div className="row g-4">
          <div className="col-lg-4 text-start">
            <h1>Our Products</h1>
          </div>
          <div className="col-lg-8 text-end">
            <ul className="nav nav-pills d-inline-flex text-center mb-5">
              <li className="nav-item">
                <a
                  className="d-flex m-2 py-2 bg-light rounded-pill active"
                  data-bs-toggle="pill"
                  href="#tab-all-products"
                >
                  <span
                    className="text-dark"
                    style={{
                      width: "130px",
                    }}
                  >
                    All Products
                  </span>
                </a>
              </li>

              {Object.keys(groups).map((category) => (
                <li className="nav-item" key={category}>
                  <a
                    className="d-flex py-2 m-2 bg-light rounded-pill"
                    data-bs-toggle="pill"
                    href={`#tab-${category}`}
                  >
                    <span
                      className="text-dark"
                      style={{
                        width: "130px",
                      }}
                    >
                      {category}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="position-relative mx-auto"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <input
            className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill"
            type="text"
            placeholder="Search"
          />
          <button
            type="submit"
            className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100"
            style={{
              top: 0,
              right: "10%",
            }}
          >
            Submit Now
          </button>
        </div>
        <br />
        <div className="tab-content">
          <div id="tab-all-products" className="tab-pane fade show p-0 active">
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  {data?.map((p) => (
                    <ProductComponent product={p} key={p.id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {
            // render each category
            Object.entries(groups).map(([category, products]) => (
              <div
                id={`tab-${category}`}
                className="tab-pane fade show p-0"
                key={category}
              >
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {products.map((p) => (
                        <ProductComponent product={p} key={p.id} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}
