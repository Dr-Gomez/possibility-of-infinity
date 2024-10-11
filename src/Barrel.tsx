import { ReactElement } from "react";
import "./Barrel.css";

const Barrel = (lives: number, blanks: number) => {
  const radius = 200;
  const centerX = 250;
  const centerY = 250;

  type coord = {
    x: number;
    y: number;
  };

  function polygonVertex(radius: number, sides: number): Array<coord> {
    const vertices: Array<coord> = [];
    for (let i = 0; i < sides; i++) {
      vertices.push({
        x: centerX + radius * Math.sin((2 * i * Math.PI) / sides),
        y: centerY - radius * Math.cos((2 * i * Math.PI) / sides),
      });
    }
    return vertices;
  }

  function makeBullet(
    x: number,
    y: number,
    color: string,
    bulletRadius: number
  ): ReactElement {
    return (
      <circle
        cx={x}
        cy={y}
        r={bulletRadius}
        fill={color}
        stroke="lightgray"
      ></circle>
    );
  }

  function makeBulletLayer(
    lives: number,
    blanks: number,
    bulletRadius: number,
    spacing: number
  ): Array<ReactElement> {
    const totalBullets = lives + blanks;
    const vertices = polygonVertex(spacing, totalBullets);
    const ratio = lives / totalBullets;

    const bullets = vertices.map((vertex, index) => {
      let color: string;
      if ((index * ratio) % 1 === 0) {
        color = "red";
      } else {
        color = "black";
      }
      return makeBullet(vertex.x, vertex.y, color, bulletRadius);
    });

    return bullets;
  }

  function makeBullets(
    lives: number,
    blanks: number,
    bulletRadius: number
  ): Array<Array<ReactElement>> {
    const bullets: Array<Array<ReactElement>> = [];
    let spacing: number = 0;

    bullets.push([makeBullet(centerX, centerY, "red", bulletRadius)]);
    lives--;

    let pow: number = 0;
    let i = 0;

    while (lives > pow && blanks > pow) {
      spacing += bulletRadius * 2;
      bulletRadius /= 1.5;

      pow = 3 * Math.pow(2, i);

      bullets.push(makeBulletLayer(pow, pow, bulletRadius, spacing));
      lives -= pow;
      blanks -= pow;
      i++;
    }

    return bullets;
  }

  return (
    <svg width="500" height="500" id="barrel">
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="lightgray"
      />

      {makeBullets(lives, blanks, 40)}
    </svg>
  );
};

export default Barrel;
