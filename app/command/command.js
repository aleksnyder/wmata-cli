export default class Command {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }
  
  async getResults() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data[this.key];
    } catch (error) {
      console.log(error);
    }
  }
}