import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const {
    value: nameInputValue,
    isValid: nameInputIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameResetInput,
  } = useInput(isNotEmpty);

  const {
    value: streetInputValue,
    isValid: streetInputIsValid,
    hasError: streetInputHasError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: streetResetInput,
  } = useInput(isNotEmpty);

  const {
    value: postalCodeInputValue,
    isValid: postalCodeInputIsValid,
    hasError: postalCodeInputHasError,
    valueChangeHandler: postalCodeChangeHandler,
    valueBlurHandler: postalCodeBlurHandler,
    reset: postalCodeResetInput,
  } = useInput(isFiveChars);

  const {
    value: cityInputValue,
    isValid: cityInputIsValid,
    hasError: cityInputHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: cityResetInput,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (
    nameInputIsValid &&
    streetInputIsValid &&
    postalCodeInputIsValid &&
    cityInputIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) return;

    /* submit the cart data */
    props.onConfirm({
      name: nameInputValue,
      street: streetInputValue,
      postalCode: postalCodeInputValue,
      city: cityInputValue,
    });

    /* RESET input values */
    nameResetInput();
    streetResetInput();
    postalCodeResetInput();
    cityResetInput();
  };

  const nameControlClasses = `${classes.control} ${
    nameInputHasError ? classes.invalid : ""
  }`;

  const streetControlClasses = `${classes.control} ${
    streetInputHasError ? classes.invalid : ""
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    postalCodeInputHasError ? classes.invalid : ""
  }`;

  const cityControlClasses = `${classes.control} ${
    cityInputHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={nameInputValue}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && <p>Please, Enter a valid name!</p>}
      </div>

      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={streetInputValue}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetInputHasError && <p>Please, Enter a valid street!</p>}
      </div>

      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={postalCodeInputValue}
        />
        {postalCodeInputHasError && (
          <p>Please, Enter a valid postal code! (5 characters long)</p>
        )}
      </div>

      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={cityInputValue}
        />
        {cityInputHasError && <p>Please, Enter a valid city!</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
