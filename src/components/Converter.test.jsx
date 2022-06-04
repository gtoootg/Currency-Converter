/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen } from "@testing-library/react";
import Converter from "./Converter";
import React from 'react'
import {act} from 'react-dom/test-utils'

describe('Converter',()=>{

  const currencyList={
    "EUR": "Euro",
    "USD": "United States Dollar",
  }

  const exchangeRates = {
    "success":true,
    "timestamp":1654356843,
    "base":"EUR",
    "date":"2022-06-04",
    "rates":{
      "EUR":1,
      "USD":1.071983
    }
  }



  it('should render correctly', ()=>{
    const {container} =  render(
      <Converter
      currencyList={currencyList}
      setCurrencyList={jest.fn()}
      exchangeRates={exchangeRates}
      setExchangeRates={jest.fn()}
      upperCurrency={"EUR"} 
      setUpperCurrency={jest.fn()}
      lowerCurrency={"USD"} 
      setLowerCurrency={jest.fn()}
      upperCurrencyValue={1} 
      setUpperCurrencyValue={jest.fn()}
      lowerCurrencyValue={1.07} 
      setLowerCurrencyValue={jest.fn()}
      />)

    expect(container.childElementCount).toBe(3)
  })

  it('should call setCurrencyValue',async()=>{

    const setLowerCurrencyValue=jest.fn()
    render(
      <Converter
      currencyList={currencyList}
      setCurrencyList={jest.fn()}
      exchangeRates={exchangeRates}
      setExchangeRates={jest.fn()}
      upperCurrency={"EUR"} 
      setUpperCurrency={jest.fn()}
      lowerCurrency={"USD"} 
      setLowerCurrency={jest.fn()}
      upperCurrencyValue={1} 
      setUpperCurrencyValue={jest.fn()}
      lowerCurrencyValue={1.07} 
      setLowerCurrencyValue={setLowerCurrencyValue}
      />)
      // eslint-disable-next-line testing-library/no-unnecessary-act
      await  act(()=>{
        fireEvent.input(screen.getAllByTestId('input')[0],{target:{value:"100"}})
      })

      expect(setLowerCurrencyValue).toHaveBeenCalled()
  })
})