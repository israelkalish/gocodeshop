// import React, { useContext } from "react";
// import AdminLogin from "../AdminLoginPage/AdminLoginPage";
// import { MyContext } from "../../MyContext";
// import { ProductFilter } from "../../components/ProductFilter/ProductFilter";
// import AddNewItem from "../../components/AddNewItem/AddNewItem";
// import { ProductCard } from "../../components/ProductCard/ProductCard";

// const EditingPage = () => {
//   const { isadmin, setAddProduct, productsCategory } = useContext(MyContext);

//   if (!isadmin) {
//     return <AdminLogin />;
//   }


//   return (
//     <div>
//       <ProductFilter />
//       <button type="adding" onClick={() => setAddProduct(true)}>
//         Adding
//       </button>
//       <AddNewItem />
//       <section className="products">
//         {productsCategory.map((event) => (
//           <ProductCard
//             app
//             value="delete"
//             className="product-card"
//             src={event.image}
//             title={event.title}
//             price={event.price}
//             id={event._id}
//           />
//         ))}
//       </section>
//     </div>
//   );
// };

// export default EditingPage;
