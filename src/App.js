import react, {useState} from 'react'
import Converter from "./components/Converter";
import Header from './components/Header';

function App() {
  const [currencyList, setCurrencyList] = useState({})
  const [exchangeRates,setExchangeRates] = useState ({})
  const [upperCurrency, setUpperCurrency] = useState('EUR')
  const [lowerCurrency, setLowerCurrency] = useState('USD')
  const [upperCurrencyValue, setUpperCurrencyValue] = useState()
  const [lowerCurrencyValue, setLowerCurrencyValue] = useState()
  return (
    <>
     <Header
        upperCurrency={upperCurrency}
        upperCurrencyValue={upperCurrencyValue}
        lowerCurrency={lowerCurrency}
        lowerCurrencyValue={lowerCurrencyValue}
      />
      <Converter
         currencyList={currencyList}
         setCurrencyList={setCurrencyList}
         exchangeRates={exchangeRates}
         setExchangeRates={setExchangeRates}
         upperCurrency={upperCurrency} 
         setUpperCurrency={setUpperCurrency}
         lowerCurrency={lowerCurrency} 
         setLowerCurrency={setLowerCurrency}
         upperCurrencyValue={upperCurrencyValue} 
         setUpperCurrencyValue={setUpperCurrencyValue}
         lowerCurrencyValue={lowerCurrencyValue} 
         setLowerCurrencyValue={setLowerCurrencyValue}
      />
    </>
  );
}

export default App;
