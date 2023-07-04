import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import App from "./App"
import { MyContext } from "./MyContext";
import PageOfProduct from "./components/PageOfProduct/PageOfProduct";
import AdminPage from "./Pages/AdminPage/AdminPage";
import CartPage from "./Pages/CartPage/CartPage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import { GET_ALL_PRODUCTS_PATH, GET_PRODUCT_BY_ID } from "./constants/api";
import ChangeProductPage from "./Pages/ChangeProductPage/ChangeProductPage";
import EditingPage from "./Pages/EditingPage/EditingPage";

const Routing =()=>{

    const changingTheAmountOfItemsToAdd = (e) => {
      console.log(e.target.innerText);
      const newAmount = e.target.innerText === `+` ? 1 : -1;
      console.log(newAmount);
      return newAmount;
    };
  
    const retrievingProductsWithAllTheDetails = async () => {
      try {
        const response = await fetch(GET_ALL_PRODUCTS_PATH);
        const data = await response.json();
        // data.map((e) => e.category);
        setProductsWithData(data);
        setProductsCategory(data);
      } catch (err) {
        console.log(err);
      }
    };

    const [productsWithData,setProductsWithData] = useState([]);
    const [productsCategory,setProductsCategory] = useState([]);
    const [categoriesTo,setCategoriesTo] = useState([]);
    const [CartIndex,setCartIndex] = useState([]);
    const [categories,setCategories] = useState([]);
    const [myCartArr,setMyCartArr] = useState({});
    const [showCart,setShowCart] = useState(false);
    const [addProduct,setAddProduct] = useState(false);
    const [isadmin,setIsadmin] = useState(false);
    const [password, setPassword] = useState('');
    const [correctPassword, setCorrectPassword] = useState('123');
    const [productData, setProductData] = useState({
      title: '',
      price: '',
      image: '',
      description: '',
      category: '',
      rating: {
        rate: 0,
        count: 0,
      },
    });

    useEffect(() => {setCategories(productsWithData
      .map((p) => p.category)
      .filter((value, index, array) => array.indexOf(value) === index));
    }, [productsWithData]);
  
    useEffect(() => {
      retrievingProductsWithAllTheDetails();
    }, []);
    
    useEffect(() => {
      console.log(addProduct);
    }, [addProduct]);
  
    useEffect(() => {
      setProductsCategory(
        categoriesTo === "All"
          ? productsWithData
          : productsWithData.filter((p) => p.category === categoriesTo)
      );
    }, [categoriesTo]);
  
    const newCategories = (e) => {setCategoriesTo(e.target.value)};
    const inputOnChange = (e, setFunc) => {
      if (e.target.value < 1) {
        e.target.value = null;
      }
      setFunc(parseInt(e.target.value));
    };
    
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
      
    const handleFormSubmit = (event) => {
      event.preventDefault();

      if (password === correctPassword) {
        setIsadmin(true)
      } else {
        console.log('Incorrect password!');
      }
    };

    const newMyCartObj =(id,akshn)=>{
      const newObj ={...myCartArr}
      newObj[id]+=akshn
      newObj[id]===0
      &&delete newObj[id]
      setMyCartArr(newObj)
    }
    
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform validation and submit logic here
      const ndata = [...productsWithData]
      console.log(productData);
      ndata.push(productData)
      setProductsWithData(ndata);
      setProductsCategory(ndata);
      addingProductToStore(GET_ALL_PRODUCTS_PATH,productData)
      setAddProduct(false)
    };
    
  async function addingProductToStore(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  async function deleteFile(url = "") {
    const response = await fetch(url, {
      method: "DELETE",
    });
    return response.json(); // מחזיר תוצאה בפורמט JSON
  }
  
  const deleteFileFromShop = (e) => {
    console.log(e.target.id);
    deleteFile(GET_PRODUCT_BY_ID+e.target.id)
    const narr = [...productsWithData]
    narr.splice(narr.findIndex((obj)=>obj._id===e.target.id),1)
    setProductsWithData(narr)
    setProductsCategory(narr)
  };
  
  async function updateFile(url = "", data = {}) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    return response.json(); // מחזיר תוצאה בפורמט JSON
  }

    useEffect(() => {
      const newArr=[];
      for (let key in myCartArr) {
        newArr.push(key)
      }
      setCartIndex(newArr)
    }, [myCartArr]);

  
    return(
        <BrowserRouter>
        <MyContext.Provider
          value={{
            changingTheAmountOfItemsToAdd,
            retrievingProductsWithAllTheDetails,
            productsCategory,
            productsWithData,
            categories,
            categoriesTo,
            newCategories,
            inputOnChange,
            handlePasswordChange,
            handleFormSubmit,
            myCartArr,setMyCartArr,
            newMyCartObj,
            showCart,setShowCart,
            CartIndex,setCartIndex,
            password, setPassword,
            correctPassword, setCorrectPassword,
            isadmin,setIsadmin,
            productData, setProductData,
            handleInputChange,
            handleSubmit,
            addProduct,setAddProduct,
            deleteFileFromShop,
            updateFile
          }}
        >
            <Routes>
              <Route path="/" element={<App/>} />
              <Route path="about" element={<AboutPage/>} />
              <Route path="cart" element={<CartPage/>} />
              <Route path="admin" element={<AdminPage/>} />
              <Route path="products/:_id" element={<PageOfProduct/>} />
              <Route path="admin/products/:_id" element={<ChangeProductPage/>} />
              <Route path="editingPage" element={<EditingPage/>}/>
            </Routes>
        </MyContext.Provider>
        </BrowserRouter>
    )
}

export default Routing