import { useState } from 'react'
import './Cart.css'

const PRODUCTS = [
  { id: 1, name: 'Product 1', price: 1, icon: '🍓' },
  { id: 2, name: 'Product 2', price: 2, icon: '🍊' },
  { id: 3, name: 'Product 3', price: 1, icon: '🥝' }
]

export default function Cart() {
  const [cart, setCart] = useState([])

  function addItem(product) {
    setCart(prev => {
      const item = prev.find(p => p.id === product.id)
      if (item) {
        return prev.map(p =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function updateQty(id, change) {
    setCart(prev =>
      prev
        .map(p =>
          p.id === id ? { ...p, qty: p.qty + change } : p
        )
        .filter(p => p.qty > 0)
    )
  }

  function removeItem(id) {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="container">
      {/* PRODUCTS */}
      <div className="products">
        {PRODUCTS.map(p => (
          <div className="card" key={p.id}>
            <div className="icon">{p.icon}</div>
            <p>{p.name} - ${p.price}</p>
            <button className="add" onClick={() => addItem(p)}>
              Add
            </button>
          </div>
        ))}
      </div>

      {/* CART TABLE */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td className="icon">{item.icon}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => updateQty(item.id, -1)}>-</button>
                <span className="qty">{item.qty}</span>
                <button onClick={() => updateQty(item.id, 1)}>+</button>
              </td>
              <td>
                <button
                  className="remove"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="total">TOTAL: {total}</h3>
    </div>
  )
}