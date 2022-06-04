import axios from 'axios'
import { useEffect, useState } from 'react';
import Header from './Header';

export default function Converter() {
  const [currencyList, setCurrencyList] = useState({})
  const [exchangeRates,setExchangeRates] = useState ({})
  const [upperCurrency, setUpperCurrency] = useState('EUR')
  const [lowerCurrency, setLowerCurrency] = useState('USD')
  const [upperCurrencyValue, setUpperCurrencyValue] = useState(1)
  const [lowerCurrencyValue, setLowerCurrencyValue] = useState()

  const [RegexErrorUpper,setRegexErrorUpper] = useState(false)
  const [RegexErrorLower,setRegexErrorLower] = useState(false)
 
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
      >
        <option value={initialCurrency} selected>{currencyList[initialCurrency]}</option>
        {Object.keys(currencyList).map((list,i)=>
            <option 
              key={i}
              value={list}
            >
              {currencyList[list]}
            </option>
          )}
      </select>
    )
  }

  // function checkNumber(val){
  //   const reg = new RegExp(/^[0-9,]*$/)
  //   return reg.test(val)
  // }

  async function convertCurrency(from, valueFrom, to, setValueTo){
    // await setRegexErrorUpper(!checkNumber(upperCurrencyValue))
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


  function InputField(){
    return(
      <>
        <div>
          <input
            value={Intl.NumberFormat('de-DE',{style:'decimal'}).format(upperCurrencyValue)}
            onChange={async (e)=>{
              setUpperCurrencyValue(e.target.value)
            }}    
          />
          <DisplayCurrencyList
            initialCurrency='EUR'
            currentCurrency={upperCurrency}
            setCurrency={setUpperCurrency}
          />
          {RegexErrorUpper? <span>Please Input in a correct format</span>:null}
        </div>
        <div>
          <span>{lowerCurrency} : {lowerCurrencyValue}</span>
          <br/>
          <input
            value={Intl.NumberFormat('de-DE',{style:'decimal'}).format(lowerCurrencyValue)}
            onChange={(e)=>{
              setLowerCurrencyValue(e.target.value)
            }}    
          />
          <DisplayCurrencyList
            initialCurrency='USD'
            currentCurrency={lowerCurrency}
            setCurrency={setLowerCurrency}
          />
          {RegexErrorLower? <span>Please Input in a correct format</span>:null}
        </div>
      </>
    )
  }

  return (
    <>
      <Header
        upperCurrency={upperCurrency}
        upperCurrencyValue={upperCurrencyValue}
        lowerCurrency={lowerCurrency}
        lowerCurrencyValue={lowerCurrencyValue}
      />
      <InputField/>
    </>
  );
}
