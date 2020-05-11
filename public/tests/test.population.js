import Population from '../scripts/population.js';
import Organism from '../scripts/organism.js';

let nextRandom=0;
let randomList = [54, 162, 241, 287, 375, 448, 519, 528, 534, 574, 596, 629, 633, 655, 675, 702, 725, 746, 887, 940,
                  514, 62, 21, 387, 385, 48, 599, 328, 1, 56, 338, 987, 679, 523, 693, 318, 260, 369, 233, 22, 540,
                  388, 715, 322, 199, 443, 272, 769, 208, 584, 57, 221, 941, 295, 532, 603, 646, 848, 457, 236, 59,
                  536, 724, 153, 343, 854, 654, 76, 538, 499, 788, 116, 883, 278, 6, 16, 889, 959, 774, 954, 475,
                  222, 585, 131, 806, 920, 661, 925, 253, 90, 55, 309, 450, 421, 561, 274, 611, 738, 219, 661, 273,
                  205, 682, 564, 265, 919, 451, 424, 951, 521, 33, 254, 574, 873, 298, 642, 482, 42, 96, 694, 336,
                  976, 88, 322, 0, 349, 479, 812, 288, 149];

let organism1 = new Organism( [
  {chromosomeFromMaleParent: ["gene1", "gene2", "gene3"], chromosomeFromFemaleParent: ["gene1", "gene5", "gene3"]},
  {chromosomeFromMaleParent: ["gene7", "gene8", "gene9", "gene10"], chromosomeFromFemaleParent: ["gene11", "gene8", "gene13", "gene10"]},
  {chromosomeFromMaleParent: ["gene15", "gene17"], chromosomeFromFemaleParent: ["gene20", "gene17"]}
] );

let organism2 = new Organism( [
  {chromosomeFromMaleParent: ["gene33", "gene2", "gene3"], chromosomeFromFemaleParent: ["gene1", "gene2", "gene44"]},
  {chromosomeFromMaleParent: ["gene11", "gene8", "gene99", "gene45"], chromosomeFromFemaleParent: ["gene11", "gene82", "gene13", "gene10"]},
  {chromosomeFromMaleParent: ["gene20", "gene16"], chromosomeFromFemaleParent: ["gene20", "gene17"]}
] );

let organisms = [organism1, organism2];

describe('Population', function () {
  it('gets unique ids', function () {
    let p1 = new Population(organisms);
    let p2 = new Population(organisms);
    chai.expect(p1).to.have.property('id');
    chai.expect(p1.id).to.not.equal(p2.id);
  }),
  it('has a set of organisms', function () {
    let o1 = new Population(organisms);
    chai.expect(o1).to.have.property('organisms');
  }),
  it('can create a new population', function () {
    // Creating a new population requires a few assumptions and a few parameters:
    // - # of organisms per birth
    // - which organisms mate with which organisms?
    // - age?  # of births per year?
    //
    // Does "createGeneration" mean just assume all organisms in the set are of mating age, select pairs and generate
    // a fixed # of offspring?  Ultimately the "simulation" mode would have some sort of time period that moves forward.
    // Depending on the granularity this will allow for simulating organism age, dying of age, mating age, gestation
    // periods, varying the # of offspring per birth.
    // 
    // Movement / environment / proximity of individuals and populations becomes a factor. Having a createGeneration
    // as defined in the previous paragraph could allow for studies such as the black/white moths in industrial England
    // or show the percentage of a recesive gene within a population over time.
    //
    // However the generatePopulation as defined becomes less useful over time once movement, time elaspsing, environment,
    // mate selection and other factors are introduced.  At that point time elapse, movement and mate selection become
    // much more predominant factors and individual tracking is needed.  Population becomes an organic outcome of the simulation.
    //
    // Will this intial definition help in any way progress towards this goal?
    // Can the study scenarios above be defined in time/movement/envrionment parameters?
    let p1 = new Population(organisms);
    let p2 = p1.createGeneration();
  });
});
