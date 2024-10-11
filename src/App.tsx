import { ReactElement, useRef, useState } from "react";
import "./App.css";
import crash from "./Crash";
import Barrel from "./Barrel";

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

    if (remainder === 0) {
      return num2;
    } else {
      return gcd(small, remainder);
    }
  }

  const divisor: number = gcd(top, bottom);

  if (top < bottom) {
    return { bottom: bottom / divisor, top: top / divisor };
  } else {
    return { bottom: top / divisor, top: bottom / divisor };
  }
}

function ChanceSelector(): ReactElement {
  const [nominator, setNominator] = useState<number | string>("");
  const [denominator, setDenominator] = useState<number | string>("");

  const selectorRef = useRef<HTMLDivElement>(null);

  function handleNominatorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === "") {
      setNominator(value);
    }
  }

  function handleDenominatorChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === "") {
      setDenominator(value);
    }
  }

  function addSpinAnimation(element: HTMLElement) {
    const keyframes = [
      { transform: "rotate(0deg)" },
      { transform: "rotate(720deg)" },
    ];

    const options: KeyframeAnimationOptions = {
      duration: 1500,
      iterations: 1,
      easing: "ease-in-out",
    };

    const animation = element.animate(keyframes, options);

    animation.onfinish = () => {
      element.style.transform = "";
      animation.cancel();
    };
  }

  function swapFraction() {
    const currentNominator =
      nominator === "" ? 0 : parseInt(nominator as string);
    const currentDenominator =
      denominator === "" ? 1 : parseInt(denominator as string);

    function swap() {
      setNominator(currentDenominator);
      setDenominator(currentNominator);
    }

    if (currentNominator > currentDenominator) {
      if (selectorRef.current) {
        addSpinAnimation(selectorRef.current);
        setTimeout(swap, 720);
      }
    }
  }

  return (
    <>
      <span id="chance">
        <div id="indicators">
          <div id="lives">Lives: </div>
          <hr />
          <div id="blanks">Blanks: </div>
        </div>
        <div id="selector" ref={selectorRef}>
          <input
            id="nominator"
            placeholder="0"
            value={nominator}
            onChange={handleNominatorChange}
          />
          <hr />
          <input
            id="denominator"
            placeholder="1"
            value={denominator}
            onChange={handleDenominatorChange}
          />
        </div>
        <button id="simplifier" onClick={swapFraction}>
          Select Chance
        </button>
      </span>
    </>
  );
}

function App() {
  const simple = simplify(1400, 140);

  console.log(simple.top, simple.bottom);

  return (
    <>
      <header>Possibility of Infinity</header>
      <ChanceSelector />
      {Barrel(10, 7)}
    </>
  );
}

export default App;
