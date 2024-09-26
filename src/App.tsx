import { ReactElement, useEffect, useState } from "react";
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
  const [nominator, setNominator] = useState<number>(0);
  const [denominator, setDenominator] = useState<number>(1);

  function handleNominator(e: React.ChangeEvent<HTMLInputElement>) {
    const numAsString: string = e.target.value;
    if (numAsString) {
      setNominator(parseInt(e.target.value));
    } else if (numAsString == "") {
      setNominator(0);
    }
  }

  function handleDenominator(e: React.ChangeEvent<HTMLInputElement>) {
    const numAsString: string = e.target.value;
    if (
      numAsString.length == 2 &&
      numAsString[0] == "1" &&
      numAsString != "" &&
      numAsString[1] != "1"
    ) {
      setDenominator(parseInt(numAsString[1]));
    } else if (numAsString) {
      setDenominator(parseInt(e.target.value));
    } else if (numAsString == "") {
      setDenominator(1);
    }
  }

  useEffect(() => {}, []);

  return (
    <span id="chance">
      <div id="selector">
        <input value={nominator} onChange={handleNominator}></input>
        <hr />
        <input value={denominator} onChange={handleDenominator}></input>
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
