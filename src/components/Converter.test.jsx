/**
 * @jest-environment jsdom
 */
import axios from "axios";
import { render } from "@testing-library/react";
import Converter from "./Converter";


describe('Converter',()=>{

  const currencyMock={
    "EUR": "Euro",
    "USD": "United States Dollar",
  }

  const exchangeRatesMock = {
    "success":true,
    "timestamp":1654356843,
    "base":"EUR",
    "date":"2022-06-04",
    "rates":{
      "EUR":1,
      "USD":1.071983
    }
  }

  jest.mock("axios");
  axios.get
    .mockResolvedValueOnce(currencyMock)
    .mockResolvedValueOnce(exchangeRatesMock)

  it('should render correctly', ()=>{
    const {container} = render(<Converter/>)

    expect(container.childElementCount).toBe(2)
  })
})