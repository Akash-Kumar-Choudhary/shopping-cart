import { useRef ,useState} from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input/Input";
const MealItemForm = (props) => {
  const InputRef = useRef();
  const [amountIsValid,setamountIsValid]=useState(true)
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredamount=InputRef.current.value
    const enteredamountnumber= +enteredamount
    if(enteredamount.trim().length===0||enteredamountnumber<1||enteredamountnumber>5){
        setamountIsValid(false)
        return
    }
    props.onAddtoCart(enteredamountnumber)
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={InputRef}
        label="Amount"
        input={{
          key:"amount",
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add</button>
      {!amountIsValid && <p>Please entered a valid number(1-5)</p>}
    </form>
  );
};

export default MealItemForm;
