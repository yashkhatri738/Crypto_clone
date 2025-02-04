import React, { useEffect, useState, useContext } from 'react';
import './Home.css';
import { CoinContext } from '../../components/Context/CoinContext';
import { Link } from 'react-router-dom';


export const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');


  const handelSearch=(event)=>{
    event.preventDefault();
  }

  const searchHandler = displayCoin.filter((item) => item.name.toLowerCase().includes(input.toLowerCase()))


  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

return (
  <div className="home">
    <div className="hero">
      <h1>Largest <br /> Crypto Marketplace</h1>
      <p>Discover and trade the top cryptocurrencies.</p>
      <form onSubmit={handelSearch}>
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Search crypto..." />
        <button type="submit">Search</button>
      </form>
    </div>
    <div className="crypto-table">
      <div className="table-layout header">
        <p>#</p>
        <p>Coins</p>
        <p>Price</p>
        <p style={{ alignItems: 'center' }}>24h Change</p>
        <p className="market-cap">Market Cap</p>
      </div>
      {searchHandler.slice(0, 10).map((item, index) => (
        <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
          <p>{item.market_cap_rank}</p>
          <div>
            <img src={item.image} alt="" />
            <p>{item.name + " - " + item.symbol}</p>
          </div>
          <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
          <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>{Math.floor(item.price_change_percentage_24h * 100) / 100}</p>
          <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
        </Link>
      ))}
    </div>
  </div>
);
};


