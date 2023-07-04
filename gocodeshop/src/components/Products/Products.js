import { ProductCard } from "../ProductCard/ProductCard";
import "./Products.css";
import { useContext } from "react";
import { MyContext } from "../../MyContext";

export const Products = () => {
  const { productsCategory, isadmin } = useContext(MyContext);

  return (
    <section className="products">
      {productsCategory.map((event) => (
        <ProductCard
          app
          value={isadmin?'delete':'Add 🛒'}
          className="product-card"
          src={event.image}
          title={event.title}
          price={event.price}
          id={event._id}
        />
      ))}
    </section>
  );
};
