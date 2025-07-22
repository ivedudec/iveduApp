
import React, { useState } from 'react';
import FormComboField from './form-combo-field';

export const DefaultStory = ({ onChange, value }) => (
  <div style={{ height: 300 }}>
    <FormComboField onChange={onChange} value={value} />
  </div>
);

export const NoOptionsStory = () => (
  <div style={{ height: 300 }}>
    <FormComboField noOptionsText="No cities found" />
  </div>
);
