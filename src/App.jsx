import { useRef, useState } from 'react'
import cross_icon from '../Assets/cross.png'

import circle_icon from '../Assets/circle.png'

import './App.css'
import Confetti from './celebration.jsx';


let data = ["", "", "", "", "", "", "", "", ""]

function App() {

  let [count, setCount] = useState(0)
  let [winStatus, setWinStatus] = useState(false);

  let [currentPlayer, setCurrentPlayer] = useState('x');

  let [lock, setLock] = useState(false)
  let titleRef = useRef(null)
  let box1 = useRef(null)
  let box2 = useRef(null)
  let box3 = useRef(null)
  let box4 = useRef(null)
  let box5 = useRef(null)
  let box6 = useRef(null)
  let box7 = useRef(null)
  let box8 = useRef(null)
  let box9 = useRef(null)
  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}'>`;
      data[num] = "x";
      setCurrentPlayer('o');
      setCount(++count);

    } else {
      e.target.innerHTML = `<img src='${circle_icon}'>`;
      data[num] = "o";
      setCurrentPlayer('x')
      setCount(++count);
    }
    checkWin();
  }

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      console.log("conmes 1")
      won(data[2])
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      console.log("conmes 12")

      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      console.log("conmes 3")

      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      console.log("conmes 4")

      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      console.log("conmes 5")

      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      console.log("conmes 6")

      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      console.log("conmes 7")
      won(data[8]);
    } else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      console.log("conmes 8")
      won(data[2]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      console.log("conmes 9")
      won(data[6]);
    }
    else {
      let draw = true;
      data.forEach(cell => {
        if (cell === "") {
          draw = false;
        }
      });

      if (draw) {
        won('draw');
      }
    }
  }

  const won = (winner) => {
    setLock(true);
    if (winner === 'x') {
      console.log('titleRef -->', titleRef);
      titleRef.current.innerHTML = `congratulation: <img src='${cross_icon}'> Won`
    } else if (winner == 'o') {
      titleRef.current.innerHTML = `congratulation: <img src='${circle_icon}'> Won`
    } else {
      titleRef.current.innerHTML = `Its a Draw`
    }

    if (winner === 'x' || winner === 'o') {
      setWinStatus(true);
    } else {
      setWinStatus(false);
    }
  }

  const reset = () => {
    setLock(false)
    setWinStatus(false)
    data = ["", "", "", "", "", "", "", "", ""]
    titleRef.current.innerHTML = 'Tic Tac Toe ';
    box_array.map((e) => {
      e.current.innerHTML = "";
    })
  }
  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac Toe Game</h1>
      {!lock && (
        <h2>
          <img src={currentPlayer === 'x' ? cross_icon : circle_icon} alt={currentPlayer} />
          {` Turn now`}
        </h2>
      )}      <div className="board">
        <div className="row1">
          <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
          <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
          <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
        </div>
        <div className="row2">
          <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
          <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
          <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
        </div>
        <div className="row3">
          <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
          <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
          <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
        </div>
      </div>
      <button className='reset' onClick={reset}>Reset</button>
      {winStatus && <Confetti />}

    </div>
  )
}

export default App
