import axios from 'axios';

export default class Command {
  constructor(url, key) {
    this.url = url;
    this.key = key;
  }
  
  async getResults() {
    try {
      const response = await axios.get(this.url);
      return response.data[this.key];
    } catch (error) {
      console.log(error);
    }
  }
}