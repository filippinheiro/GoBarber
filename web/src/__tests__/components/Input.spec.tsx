import React from 'react';

import { render, fireEvent, wait } from '@testing-library/react';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defautlValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByPlaceholderText } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const container = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(container).toHaveStyle('border-color: #ff9000');
      expect(container).toHaveStyle('color: #ff9000');
    });
  });

  it('should stop highlightin on input blur', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input name="email" placeholder="E-mail" />,
    );

    const inputElement = getByPlaceholderText('E-mail');
    const container = getByTestId('input-container');

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(container).not.toHaveStyle('border-color: #ff9000');
      expect(container).not.toHaveStyle('color: #ff9000');
    });
  });
});
