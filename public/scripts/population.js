import Organism from './organism.js';

let nextId=1000;

export default class Population {

  constructor(organisms) {
    this.id=nextId++;
    this.organisms=organisms;
  }
  
}
