import React from 'react'


export default function Header({upperCurrency, upperCurrencyValue, lowerCurrency, lowerCurrencyValue}){
  return(
    <div>
      <h1>
        {upperCurrency} {upperCurrencyValue}
      </h1>
      <h1 style={{"color":'blue'}}>
        {lowerCurrency} {lowerCurrencyValue}
      </h1>
    </div>
  )
}