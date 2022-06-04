import React from 'react';

export default function Header({
  upperCurrency,
  upperCurrencyValue,
  lowerCurrency,
  lowerCurrencyValue,
}) {
  return (
    <div>
      <h1>
        {upperCurrency} : {upperCurrencyValue ? <>{upperCurrencyValue}</> : null}
        {/* {upperCurrency} : {upperCurrencyValue? <>{upperCurrencyValue.toFixed(2)}</>:null} */}
      </h1>
      <h1 style={{ color: 'blue' }}>
        {lowerCurrency} : {lowerCurrencyValue ? <>{lowerCurrencyValue}</> : null}
        {/* {lowerCurrency} : {lowerCurrencyValue? <>{lowerCurrencyValue.toFixed(2)}</>:null} */}
      </h1>
    </div>
  );
}
