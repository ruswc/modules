import {clearFormField} from "./functions"
class Cost {

    constructor(options) {
        this.transportModel = options.transportModel
        this.costPerKg = options.costPerKg
        this.costPerKm = options.costPerKm

        Cost._count += 1
        Cost._name = 'jsbandcost'

    }

    saveInLocalStorage() {
        localStorage.setItem(Cost._name + Cost._count, JSON.stringify(this));
    }

}

// static property
Cost._count = 0;

var keysCost = Object.keys(localStorage),
    allTransportIndexes = keysCost.filter(val => val.indexOf('jsbandcost') !== -1),
    indexes = allTransportIndexes.map(x => +(x.replace('jsbandcost', ''))),
    maxIndex = Math.max(...indexes);

if (indexes.length > 0) {
    Cost._count = maxIndex + 1;
}

// render list
function renderList() {
    const keys = Object.keys(localStorage),
        allTransportIndexes = keys.filter(val => val.indexOf('jsbandcost') !== -1),
        listContainer = document.getElementById('costlist');

    // clean container
    listContainer.innerHTML = "";

    for (var i = 0, length = allTransportIndexes.length; i < length; i++) {
        const plate = document.createElement('div');
        plate.classList.add('plate');
        var obj = JSON.parse(localStorage.getItem(allTransportIndexes[i]));
        for (key in obj) {
            if (key !== "unique") {
                plate.innerHTML += `<p><strong>${key}:</strong> ${obj[key]}</p>`;
            }
        }

        listContainer.append(plate);
    }

}

renderList()

window.saveCost = function saveCost() {

    const cost = new Cost({
        transportModel: transportmodel.value,
        costPerKg: costbykg.value,
        costPerKm: costbykm.value
    });

    cost.saveInLocalStorage();

    var elements = document.getElementById("costform").elements;
    clearFormField(elements);

    renderList();
}
