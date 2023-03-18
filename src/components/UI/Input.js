import React from "react";
import classes from "./Input.module.css";

// props.input = { type: 'text' } => will be added as
//   <input {...props.input} => type="text" />
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={ref} />
    </div>
  );
});

export default Input;
