import { ReactElement } from "react";
import "./App.css";

function simplify(
  top: number,
  bottom: number
): { top: number; bottom: number } {
  function gcd(num1: number, num2: number): number {
    let remainder;
    let small;

    if (num1 > num2) {
      small = num2;
      remainder = num1 % num2;
    } else {
      small = num1;
      remainder = num2 % num1;
    }

    if (remainder == 0) {
      return num2;
    } else {
      return gcd(small, remainder);
    }
  }

  const divisor: number = gcd(top, bottom);
  return { top: top / divisor, bottom: bottom / divisor };
}

function ChanceSelector(): ReactElement {
  return (
    <span id="chance">
      <div id="selector">
        <input></input>
        <hr />
        <input></input>
      </div>
      <button id="simplifier">Select Chance</button>
    </span>
  );
}

function App() {
  return (
    <>
      <header>Possibility of Infinity</header>
      <ChanceSelector />
    </>
  );
}

export default App;
