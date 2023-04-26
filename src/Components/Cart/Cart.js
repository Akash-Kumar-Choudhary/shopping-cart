import React, { useContext, useState } from "react";
import Modal from "../UI/Modals/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";
import Checkout from "../Checkout/Checkout";
const Cart = (props) => {
  const Cartctx = useContext(CartContext);
  const [isCheckout, setisCheckout] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const [didSubmit,setdidSubmit]=useState(false)
  const totalAmount = `$${Cartctx.totalAmount.toFixed(2)}`;
  const hasItem = Cartctx.items.length > 0;
  const RemoveCartHandler = (id) => {
    Cartctx.removeItem(id);
  };
  const AddCartHandler = (item) => {
    Cartctx.addItem({ ...item, amount: 1 });
  };

  const OrderChangeHandler = () => {
    setisCheckout(true);
  };

  const SubmitFormHandler = async (userdata) => {
    setisSubmit(true);
    await fetch("http://localhost:5000/meal", {
      method: "POST",
      body: JSON.stringify({
        user: userdata,
        orderedItem: Cartctx.items,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    setisSubmit(false);
    setdidSubmit(true)
    Cartctx.clearcart()
  };

  const ButtonHandler = (
    <React.Fragment>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && (
          <button className={classes.button} onClick={OrderChangeHandler}>
            Order
          </button>
        )}
      </div>
    </React.Fragment>
  );

  const ModalContent = (
    <React.Fragment>
      <ul className={classes["cart-items"]}>
        {Cartctx.items.map((cart) => (
          <CartItem
            key={cart.key}
            id={cart.id}
            name={cart.name}
            price={cart.price}
            amount={cart.amount}
            onRemove={RemoveCartHandler.bind(null, cart.id)}
            onAdd={AddCartHandler.bind(null, cart)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={SubmitFormHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && ButtonHandler}
    </React.Fragment>
  );

  return <Modal onClose={props.onClose}>
    {!isSubmit && !didSubmit && ModalContent}
    {isSubmit && !didSubmit&& <p>sending.......</p>}
    {didSubmit && !isSubmit && <p>successfully submitted the data</p>}
  </Modal>;
};

export default Cart;
