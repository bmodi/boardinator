import Organism from '../scripts/organism.js';

import '../modules/chart.js/dist/Chart.bundle.min.js';

let populationGenes = [];
let populationCount = [];
let backgroundColours = [];

export function createOffspring() {
    let genes_a1 = document.getElementById("genes_a1").value.split(',');
    let genes_a2 = document.getElementById("genes_a2").value.split(',');
    let genes_b1 = document.getElementById("genes_b1").value.split(',');
    let genes_b2 = document.getElementById("genes_b2").value.split(',');
    let number_of_offspring = document.getElementById("number_of_offspring").value;

    let maleOrganism = new Organism( [
        {chromosomeFromMaleParent: genes_a1, chromosomeFromFemaleParent: genes_a2}
      ] );
      
    let femaleOrganism = new Organism( [
        {chromosomeFromMaleParent: genes_b1, chromosomeFromFemaleParent: genes_b2}
    ] );    

    let offspring = maleOrganism.reproduce(femaleOrganism, number_of_offspring);

    addOffspringToTable(maleOrganism, femaleOrganism, offspring);
    updatePopulationChart(offspring);
}

function addOffspringToTable(maleOrganism, femaleOrganism, offspring) {
    let table = document.getElementById("population").getElementsByTagName('tbody')[0];
    let row = table.insertRow(0);
    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    // Add some text to the new cells:
    cell1.innerHTML = maleOrganism.toString();
    cell2.innerHTML = femaleOrganism.toString();
    cell3.innerHTML = offspring.join();
}

function updatePopulationChart(offspring) {
    for( let i=0; i<offspring.length; i++) {
        let genes = offspring[i].getGenes();
        let pos = populationGenes.indexOf( genes );
        if ( pos<0 ) {
            populationGenes.push(genes);
            populationCount.push(1);
            backgroundColours.push( getRandomColorHex() );
        } else {
            populationCount[pos]++;
        }
    }

    let ctx = document.getElementById('myChart').getContext('2d');
    let newChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: populationGenes,
            datasets: [{
                label: '',
                data: populationCount,
                backgroundColor: backgroundColours,
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Population by Genes'
            },
            legend: {
                display: false
            },
            events: [],
            scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
                }]
            }
        }
    });
    return newChart;
}

function getRandomColorHex() {
    var hex = "0123456789ABCDEF",
        color = "#";
    for (var i = 1; i <= 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
}
