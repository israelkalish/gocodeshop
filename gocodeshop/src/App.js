
import './App.css';
import MyDrawer from './components/MyDrawer/MyDrawer';
import { ProductFilter } from './components/ProductFilter/ProductFilter';
import { Products } from './components/Products/Products';

function App() {
  return (
    <div className="App">
      <MyDrawer />
      <ProductFilter app />
      <Products />
    </div>
  );
}

export default App;

