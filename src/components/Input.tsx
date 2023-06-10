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
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input type={type} className={classes} ref={ref} {...rest} />
      <label className="label">
        <span className="label-text text-red-400">{error}</span>
        <span className="label-text-alt text-warning">{labelAlt}</span>
      </label>
    </div>
  );
};

const forwardInput = React.forwardRef(Input);

export default forwardInput;
