import {useState} from 'react'

import Header from './Components/Layout/Header'
import Meals from './Components/Meals/Meals'
import Cart from './Components/Cart/Cart'
import CartProvider from './Store/CartProvider'
function App() {

  const [CartShow,setCartShow] = useState(false)

  const HeaderShowHandler=() => {
    setCartShow(true)
  }

  const CloseShowHandler=() => {
    setCartShow(false)
  }

  return (
    <CartProvider>
      {CartShow && <Cart onClose={CloseShowHandler} />}
      <main>
        <Header onShowCart={HeaderShowHandler}/>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App;
