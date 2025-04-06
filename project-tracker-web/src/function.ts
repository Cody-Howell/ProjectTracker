class FunctionService {
  scoreFunction: Array<number>;
  
  constructor() {
    this.scoreFunction = this.getFunction();
  }

  updateFunction(s: Array<number>): void {
    window.localStorage.setItem("scoreFunction", JSON.stringify(s));
    this.scoreFunction = s;
  }

  returnValue(PrS: number, PeS: number, DeS: number, DiS: number, SD: number, ED: number): number {
    const weights = this.scoreFunction;
    return (
      PrS * weights[0] + PeS * weights[1] + DeS * weights[2] + DiS * weights[3] + SD * weights[4] + ED * weights[5]
    );
  }
  
  private getFunction(): Array<number> {
    const value = window.localStorage.getItem("scoreFunction");
    return value == null ? 
      [1, 1, 1, 1, 1, 1] : 
      JSON.parse(value);
  }
}

const instance = new FunctionService();
export default instance;