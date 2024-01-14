
 

import React from "react";

type InputProps = {
  type: string;
  label: string;
  labelAlt: string;
  error: any;
  className: string;
};

const Input = (
  { type, label, labelAlt, error, className, ...rest }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) => {
  const classes = "input-bordered input w-full max-w-xs " + className;
  return (
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">{label}</span>
      </label>
      <input type={type} class={classes} ref={ref} {...rest} />
      <label class="label">
        <span class="label-text text-red-400">{error}</span>
        <span class="label-text-alt text-warning">{labelAlt}</span>
      </label>
    </div>
  );
};

const forwardInput = React.forwardRef(Input);

export default forwardInput;
