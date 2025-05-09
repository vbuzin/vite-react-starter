import type { JSX } from 'react/jsx-runtime'
import { useState } from 'react'

const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
]

interface ProductCategoryRowProps {
  category: string
}

function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  )
}

interface ProductRowProps {
  name: string
  stocked: boolean
  price: string
  category: string
}

function ProductRow({ name, stocked, price }: ProductRowProps) {
  const displayName = stocked ? name : <span style={{ color: 'red' }}>{name}</span>
  return (
    <tr>
      <td>{displayName}</td>
      <td>{price}</td>
    </tr>
  )
}

interface ProductTableProps {
  products: ProductRowProps[]
  filterText: string
  inStockOnly: boolean
}

function ProductTable({
  products,
  filterText,
  inStockOnly,
}: ProductTableProps) {
  const rows: JSX.Element[] = []
  let lastCategory: string | null = null

  products.forEach(
    (product: {
      name: string
      stocked: boolean
      price: string
      category: string
    }) => {
      if (!product.name.toLowerCase().includes(filterText.toLowerCase())) {
        return
      }
      if (inStockOnly && !product.stocked) {
        return
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />,
        )
      }
      rows.push(<ProductRow key={product.name} {...product} />)
      lastCategory = product.category
    },
  )

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

interface SearchBarProps {
  filterText: string
  inStockOnly: boolean
  onFilterTextChange: (arg0: string) => void
  onInStockOnlyChange: (arg0: boolean) => void
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}: SearchBarProps) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => { onFilterTextChange(e.target.value) }}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => { onInStockOnlyChange(e.target.checked) }}
        />
        Only show products in stock
      </label>
    </form>
  )
}

function FilterableProductTable({ products }: ProductTableProps) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <div className="m-5">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  )
}

export default function App() {
  return (
    <FilterableProductTable
      products={PRODUCTS}
      filterText=""
      inStockOnly={false}
    />
  )
}
