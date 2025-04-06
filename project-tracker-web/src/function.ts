class FunctionService {
  scoreFunction: string;
  
  constructor() {
    this.scoreFunction = this.getFunction();

  }

  updateFunction(s: string): void {
    window.localStorage.setItem("scoreFunction", s);
    this.scoreFunction = s;
  }

  returnValue(PrS: number, PeS: number, DeS: number, DiS: number, SD: number, ED: number): number {
    let func = this.scoreFunction;
    let regex = new RegExp('PrS', 'g');
    func = func.replace(regex, PrS.toString());
    regex = new RegExp('PeS', 'g');
    func = func.replace(regex, PeS.toString());
    regex = new RegExp('DeS', 'g');
    func = func.replace(regex, DeS.toString());
    regex = new RegExp('DiS', 'g');
    func = func.replace(regex, DiS.toString());
    regex = new RegExp('SD', 'g');
    func = func.replace(regex, SD.toString());
    regex = new RegExp('ED', 'g');
    func = func.replace(regex, ED.toString());

    return Number(eval(func));
  }
  
  private getFunction(): string {
    const value = window.localStorage.getItem("scoreFunction");
    return value == null ? 
      "PrS + PeS + DeS - DiS + SD - ED" : 
      value;
  }
}

const instance = new FunctionService();
export default instance;