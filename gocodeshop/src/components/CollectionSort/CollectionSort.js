import './CollectionSort.css'

export const CollectionSort = ({arr,name,onChange}) => {
  return(
      <div className="collection-sort">
        <label>{name}</label>
        <select onChange={onChange}>
          {name===`Filter by`&&<option value={"All"}>All Products</option>}
          {arr.map((filter) => <option value={filter}>{filter}</option>)}
        </select>
      </div>
  )
}
