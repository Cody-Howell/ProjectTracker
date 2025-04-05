class PersistenceService {
  scoreFunction: string;
  
  constructor() {
    this.scoreFunction = this.getFunction();

  }

  getScoreFunction() {
    return this.scoreFunction;
  }

  updateFunction(s: string): void {
    window.localStorage.setItem("scoreFunction", s);
    this.scoreFunction = s;
  }
  
  private getFunction(): string {
    const value = window.localStorage.getItem("scoreFunction");
    return value == null ? "" : value;
  }
}

const instance = new PersistenceService();
export default instance;