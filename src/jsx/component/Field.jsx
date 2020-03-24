import React from 'react';
import PropType from 'prop-types';

const Field = ({
  name,
  localeKey,
  autocomplete,
  type,
  onChange,
  value,
  autoFocus,
  hasError,
}) => {
  return (
    <input
      name={name}
      placeholder={t(localeKey)}
      autoComplete={autocomplete || 'on'}
      type={type}
      onChange={onChange}
      value={value}
      className={`pia-form-control form-control ${hasError ? 'is-invalid' : ''}`}
      // If an autofocus action can be anticipated, it
      // has been said by users to not break accessibility
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
    />
  );
};

Field.propTypes = {
  name: PropType.string.isRequired,
  type: PropType.string.isRequired,
  localeKey: PropType.string.isRequired,
  onChange: PropType.func.isRequired,
  autocomplete: PropType.string,
  value: PropType.string.isRequired,
  autoFocus: PropType.bool,
  hasError: PropType.bool,
};

Field.defaultProps = {
  autoFocus: false,
  autocomplete: '',
  hasError: false,
};

export default Field;
