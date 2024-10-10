function unlimitedVoid(): void {
  for (let n = 0; n < Infinity; n += 1) {
    console.log(Infinity + `${n}`);
  }
}

function limitedUnlimitedVoid(n: number): void {
  for (let i = 0; i < n; i++) {
    unlimitedVoid();
  }
}

export default limitedUnlimitedVoid;
