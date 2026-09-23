import { useState } from 'react'
import './App.css'
import taco from './assets/taco.jpg'

const menuItems = [
  { name: 'Pizza', price: 20.0 },
  { name: 'Taco', price: 5.0 },
  { name: 'Ice Cream', price: 10.0 },
  { name: 'Burrito', price: 15.0 }
]
const taxRate = 0.0975

function App() {
  const [selectedItems, setSelectedItems] = useState([])
  const [numPeople, setNumPeople] = useState(1)
  const [tipPercent, setTipPercent] = useState(15)

  function handleToggle(name) {
    if (selectedItems.includes(name)) {
      setSelectedItems(selectedItems.filter(item => item !== name))
    } else {
      setSelectedItems([...selectedItems, name])
    }
  }

  let subtotal = 0

  for (const item of menuItems) {
    if (selectedItems.includes(item.name)) {
      subtotal += item.price
    }
  }

  const tax = subtotal * taxRate
  const tip = subtotal * (tipPercent / 100)
  const total = subtotal + tax + tip
  const perPerson = total / numPeople

  return (
    <div className="app-container">
      <header>
        <img 
      src={taco} 
      alt="Tasty taco yum" 
      style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
  />
        <h1>Resteraunt Bill Splitter</h1>
      </header>

      <main>
        <h2>Availble Items</h2>
        <p>Local Tax(Los Angeles, CA): 9.75%
          <a
            href="https://cdtfa.ca.gov/taxes-and-fees/rates.aspx"
          >
            (Tax Rate Source)
          </a>
        </p>
        {menuItems.map(menuItem => (
          <div key={menuItem.name} className="menu-item">
            <label>
              <input
                type="checkbox"
                checked={selectedItems.includes(menuItem.name)}
                onChange={() => handleToggle(menuItem.name)}
              />
              {menuItem.name} - ${menuItem.price}
            </label>
          </div>
        ))}
        <div className="form-group">
          <label htmlFor="party size">Party Size;</label>
          <input
            id="party size"
            type="number"
            min="1"
            value={numPeople}
            onChange={e => setNumPeople(Math.max(1, Number(e.target.value)))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tip range">Tip: {tipPercent}%</label>
          <input
            id="tip range"
            type="range"
            min="0"
            max="30"
            step="1"
            value={tipPercent}
            onChange={e => setTipPercent(Number(e.target.value))}
          />
        </div>
        <div className="summary-card">
          <h3>Order Summary</h3>
          <p>Items Cost: ${subtotal.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <p>Tip: ${tip.toFixed(2)}</p>
          <p>
            <strong>Total: ${total.toFixed(2)}</strong>
          </p>
          <p>
            <strong>Total Per Party Member: ${perPerson.toFixed(2)}</strong>
          </p>
        </div>
      </main>

      

      <footer>Eat food</footer>
    </div>
  )
}

export default App
