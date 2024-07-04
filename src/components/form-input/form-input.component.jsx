import React from 'react';
import { GroupContainer, FormInputContainer, FormInputLabel } from './form-input.styles.jsx';

const FormInput = ({ label, ...otherProps }) => (
  <GroupContainer>
    <FormInputContainer className="form-input" {...otherProps} />
    {label && (
      <FormInputLabel className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
        {label}
      </FormInputLabel>
    )}
  </GroupContainer>
);

export default FormInput;
