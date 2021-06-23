// import logo from './logo.svg';
import "./App.scss";
import React, { useEffect, useState } from "react";

const Card = ({ symbol, number, flipped }) => {
  const isNumber = !isNaN(number);
  const [isFlipped, setIsFlipped] = useState(flipped);
  return (
    <div
      symbol={symbol}
      number={number}
      className={["card", isFlipped ? "flipped" : ""].filter(Boolean).join(" ")}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="container">
        <div
          className="front"
          data-before={`${number}\n${symbol}`}
          data-after={`${number}\n${symbol}`}
        >
          <div className="symbols">
            {number === "A" && <div className="symbol">{symbol}</div>}
            {["J", "Q", "K"].includes(number) && <div className="image"></div>}
            {isNumber &&
              new Array(parseInt(number))
                .fill(symbol)
                .map((_, key) => <div key={key}>{symbol}</div>)}
          </div>
        </div>
        <div className="back"></div>
      </div>
    </div>
  );
};

const Deck = (props) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    (async () => {
      let cards = await (
        await fetch(`http://localhost:4001/${props.path}`)
      ).json();
      setCards(cards["cards"]);
    })();
  }, [props.path]);

  return (
    <div>
      {cards.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h3>{props.title}</h3>
          <div className="deck">
            {" "}
            {cards.map((card, index) => {
              const number = card.slice(0, -1);
              const symbol = card.slice(-1);
              const flip = index < props.flipped;
              return (
                <Card
                  symbol={symbol}
                  number={number}
                  key={index}
                  flipped={flip}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// class Deck extends React.Component{

//   constructor(props){
//     super(props)
//     this.state = {
//       cards: []
//     }
//     function load(){
//       return 1 + 2
//     }
//     load()
//   }

//   componentDidMount(){
//     (async () =>{
//       const cards = await (await fetch(`http://localhost:4001/${this.props.path}`)).json()
//       // console.log(cards['cards'])
//       this.setState({ cards: cards['cards'] })
//     })();
//   }

//   render(){
//     // console.log(this.state.cards.length)
//     return (
//     <div>
//       {(this.state.cards.length === 0) ?

//         <div>Loading...</div> :
//         <div>
//           <h3>{this.props.title}</h3>
//           <div className="deck"> {this.state.cards.map((card, index) =>{
//             const number = card.slice(0, -1);
//             const symbol = card.slice(-1);
//             const isNumber = !isNaN(number)

//             return (
//               <div className='card' symbol={symbol} number={number} key={index}>
//                 <div className='front' >
//                   <div className="card-corner top-left">
//                     <div>{number}</div>
//                     <div>{symbol}</div>
//                   </div>

//                   <div className="symbols">
//                     {isNumber ? new Array(parseInt(number))
//                             .fill(symbol)
//                             .map((cardSymbol, index) =>
//                             <div key={index}>{cardSymbol}</div>)
//                         : number === "A"
//                               ? <div >{symbol}</div>
//                               : ""
//                     }

//                   </div>
//                   <div className="card-corner bottom-right">
//                     <div>{number}</div>
//                     <div>{symbol}</div>
//                   </div>
//                 </div>
//               </div>)
//           })}</div>
//         </div>
//       }
//     </div>)
//   }
// }

//eslint-disable-next-line

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Deck title="Table" flipped="0" path="table/" />
        <Deck title="Hand" flipped="0" path="playerHand/" />
      </header>
    </div>
  );
}

export default App;
