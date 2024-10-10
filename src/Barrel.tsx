const Barrel = () => {
  // SVG parameters
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
        x: radius * Math.sin((2 * i * Math.PI) / sides),
        y: radius * Math.cos((2 * i * Math.PI) / sides),
      });
    }

    return vertices;
  }

  return (
    <svg width="500" height="500">
      <circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="lightgray"
      />
    </svg>
  );
};

export default Barrel;
