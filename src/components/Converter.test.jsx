/**
 * @jest-environment jsdom
 */

/* eslint-disable testing-library/no-unnecessary-act */
import { render, fireEvent, screen } from '@testing-library/react';
import Converter from './Converter';
import React from 'react';
import { act } from 'react-dom/test-utils';

describe('Converter', () => {
  const currencyList = {
    EUR: 'Euro',
    USD: 'United States Dollar',
  };

  const exchangeRates = {
    success: true,
    timestamp: 1654356843,
    base: 'EUR',
    date: '2022-06-04',
    rates: {
      EUR: 1,
      USD: 1.071983,
    },
  };

  it('should render correctly', () => {
    const { container } = render(
      <Converter
        currencyList={currencyList}
        setCurrencyList={jest.fn()}
        exchangeRates={exchangeRates}
        setExchangeRates={jest.fn()}
        upperCurrency={'EUR'}
        setUpperCurrency={jest.fn()}
        lowerCurrency={'USD'}
        setLowerCurrency={jest.fn()}
        upperCurrencyValue={1}
        setUpperCurrencyValue={jest.fn()}
        lowerCurrencyValue={1.07}
        setLowerCurrencyValue={jest.fn()}
      />
    );

    expect(container.childElementCount).toBe(3);
  });

  it('should call setCurrencyValue, should call display selected Currency', async () => {
    const setLowerCurrency = jest.fn();
    const setLowerCurrencyValue = jest.fn();
    render(
      <Converter
        currencyList={currencyList}
        setCurrencyList={jest.fn()}
        exchangeRates={exchangeRates}
        setExchangeRates={jest.fn()}
        upperCurrency={'EUR'}
        setUpperCurrency={jest.fn()}
        lowerCurrency={'USD'}
        setLowerCurrency={setLowerCurrency}
        upperCurrencyValue={1}
        setUpperCurrencyValue={jest.fn()}
        lowerCurrencyValue={1.07}
        setLowerCurrencyValue={setLowerCurrencyValue}
      />
    );

    await act(() => {
      fireEvent.input(screen.getAllByTestId('input')[0], { target: { value: '100' } });
    });
    expect(setLowerCurrencyValue).toHaveBeenCalled();

    await act(() => {
      fireEvent.click(screen.getAllByTestId('select')[0], { target: { value: 'USD' } });
    });
    let USD = screen.getAllByTestId('USD');
    let EUR = screen.getAllByTestId('EUR');
    expect(USD[0].selected).toBeTruthy();
    expect(EUR[0].selected).toBeFalsy();
  });
});
