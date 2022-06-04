import axios from 'axios'
import React, { useEffect, useState } from 'react'


function InputField({currencyValue,setCurrencyValue}){
  return(
    <input
      data-testid="input"
      value={currencyValue? Intl.NumberFormat('de-DE',{style:'decimal'}).format(currencyValue):null}
      // value={currencyValue? currencyValue : null}
      onChange={async (e)=>{
        e.preventDefault()
        setCurrencyValue(e.target.value)
      }}    
  />
  )
}

export default function Converter(prop) {

  const {
    currencyList, 
    setCurrencyList,
    exchangeRates,
    setExchangeRates,
    upperCurrency, 
    setUpperCurrency,
    lowerCurrency, 
    setLowerCurrency,
    upperCurrencyValue, 
    setUpperCurrencyValue,
    lowerCurrencyValue, 
    setLowerCurrencyValue
  } = prop
  const [regexError, setRegexError] = useState(false)
 
  function sortObject(object){
    let array = Object.entries(object)
    array.sort(function(p1, p2){
      var p1Key = p1[0], p2Key = p2[0];
      if(p1Key < p2Key){ return -1; }
      if(p1Key > p2Key){ return 1; }
      return 0;
    })
    const sortedObject = Object.fromEntries(array);
    return sortedObject
  }


  function fetchCurrencyList(){
    axios.get('https://openexchangerates.org/api/currencies.json')
    .then((res)=>{
      setCurrencyList(sortObject(res.data))
    })

    axios.get('http://api.exchangeratesapi.io/v1/latest?access_key=3298054fd6cea8d6cbc4f26298ad9f2d')
    .then((res)=>{
      setExchangeRates(res.data.rates)
    })
  }

  function DisplayCurrencyList({initialCurrency,currentCurrency,setCurrency}){
    return(
      <select 
        onChange={(e)=>{
          e.preventDefault()
          setCurrency(e.target.value)}}
        value={currentCurrency}
        data-testid="select"
      >
        <option value={initialCurrency} selected>{currencyList[initialCurrency]}</option>
        {Object.keys(currencyList).map((list,i)=>
            <option 
              key={i}
              value={list}
              data-testid={list}
            >
              {currencyList[list]}
            </option>
          )}
      </select>
    )
  }

  function checkNumber(val){
    const reg = new RegExp(/^[0-9,.]*$/)
    if(!val) {return false}
    return reg.test(val)
  }

  async function convertCurrency(from, valueFrom, to, setValueTo){
    // await setRegexError(!checkNumber(valueFrom))
    // await setRegexErrorLower(!checkNumber(lowerCurrencyValue))
    // const formatNumber= (number)=>{
    //   return Intl.NumberFormat('de-DE',{style:'decimal'}).format(number)
    // }
 
    const rateFrom = exchangeRates[from]
    const rateTo = exchangeRates[to]

    setValueTo(valueFrom * rateFrom / rateTo)
    // setValueTo(formatNumber(valueFrom)*formatNumber(rateFrom)/formatNumber(rateTo))
  }

  useEffect(()=>{
    convertCurrency( upperCurrency, upperCurrencyValue, lowerCurrency, setLowerCurrencyValue)
  },[upperCurrencyValue,upperCurrency])

  useEffect(()=>{
    convertCurrency( lowerCurrency, lowerCurrencyValue, upperCurrency, setUpperCurrencyValue)
  },[lowerCurrencyValue,lowerCurrency])

  useEffect(()=>{
    fetchCurrencyList()
  },[])

  return(
    <>
      <div>
        <InputField
          currencyValue={upperCurrencyValue}
          setCurrencyValue={setUpperCurrencyValue}
        />
        <DisplayCurrencyList
          initialCurrency='EUR'
          currentCurrency={upperCurrency}
          setCurrency={setUpperCurrency}
        />
      </div>
      <br/>
      <div>
        <InputField
          currencyValue={lowerCurrencyValue}
          setCurrencyValue={setLowerCurrencyValue}
        />
        <DisplayCurrencyList
          initialCurrency='USD'
          currentCurrency={lowerCurrency}
          setCurrency={setLowerCurrency}
        />
        {regexError? <span>Please Input in a correct format</span>:null}
      </div>
    </>
  )
  

}
