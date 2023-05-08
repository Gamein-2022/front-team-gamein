import React, { forwardRef } from 'react';
import classNames from 'classnames';
import './style.scss';

function Input(
  {
    label,
    error,
    type = 'text',
    className,
    containerClassName,
    onChange = () => {},
    placeholder,
    readOnly,
    disabled,
    value,
    ...props
  },
  ref
) {
  const isEditable = !readOnly && !disabled;
  const input = (
    <input
      ref={ref}
      readOnly={readOnly}
      disabled={disabled}
      type={type}
      value={value}
      onChange={onChange}
      className={classNames('input', { 'input--disabled': !isEditable }, { 'input--error': error }, className)}
      placeholder={placeholder}
      {...props}
    />
  );

  return (
    <div className={classNames('input__container', containerClassName)}>
      {label && (
        <label>
          <span className="input-label">{label}</span>
          {input}
        </label>
      )}
      {!label && input}
      {error && <div className="input__text--error">{error}</div>}
    </div>
  );
}

export default forwardRef(Input);
