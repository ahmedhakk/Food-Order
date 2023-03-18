import { useReducer } from "react";

const initialinputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }

  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }

  if (action.type === "RESET") return initialinputState;

  return initialinputState;
};

const useInput = (validateFun) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialinputState
  );

  const valueIsValid = validateFun(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const valueBlurHandler = () => dispatch({ type: "BLUR" });

  const reset = () => dispatch({ type: "RESET" });

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
