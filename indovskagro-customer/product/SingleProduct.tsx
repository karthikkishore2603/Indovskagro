import React from "react";
import { useQuery } from "@tanstack/react-query";

import type { Product } from "../src/types";
import { getProductById } from "../src/firebase/products";

export function SingleProduct() {
  const [productId, setProductId] = React.useState<string>("");

  React.useEffect(() => {
    // get productId from URLQuery,  ?id=
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (id) {
      setProductId(id);
    } else {
      // redirect to home page
      window.location.href = "/";
    }
  }, []);

  const { isPending, data } = useQuery<Product | null, Error>({
    queryKey: ["products", productId],
    queryFn: async function () {
      if (!productId) return null;
      const products = await getProductById(productId);
      return products;
    },
  });

  if (isPending || !data) return;

  return (
    <>
      {/* <div className="single-product mt-150 mb-150"> */}
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="single-product-img">
              <img src={data.image} alt={data.title} />
            </div>
          </div>
          <div className="col-md-7">
            <div className="single-product-content">
              <h3>{data?.title}</h3>
              <p className="single-product-pricing">
                {((price: string) => {
                  const amount = parseFloat(price);
                  const formatted = new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(amount);

                  return <div>{formatted}</div>;
                })(data.price.toString())}
              </p>
              <p>{data.description}</p>
              <div className="single-product-form">
                <form action="index.html">
                  <input type="number" placeholder="0" />
                </form>
                <a href="cart.html" className="cart-btn">
                  <i className="fas fa-shopping-cart"></i> Buy
                </a>
                <p>
                  <strong>Category: </strong> {data.category}
                </p>
              </div>
              <h4>Share:</h4>
              <ul className="product-share">
                <li>
                  <a href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
