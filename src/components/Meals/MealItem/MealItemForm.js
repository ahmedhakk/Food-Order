import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef(); // to take the value of the input

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = +amountInputRef.current.value;
    // that value is always a string even its type is number
    // console.log(enteredAmount); // +'' => 0 , +'6' => 6 (number) , +'e' => NaN
    if (
      enteredAmount < 1 ||
      enteredAmount > 5 ||
      enteredAmount === 0 ||
      isNaN(enteredAmount)
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmount);
    setAmountIsValid(true);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1 → 5).</p>}
    </form>
  );
};

export default MealItemForm;
