class Transport {

    static _randVal(min, max) {
        let rand1 = min + Math.random() * (max + 1 - min);
        let rand2 = min + Math.random() * (max + 1 - min);
        return 'jsbanddelivery' + Math.floor(rand1) + Math.floor(rand2);
    }

    constructor(options, unique = Transport._randVal(0, 200000)) {
        this.unique = unique
        this.id = options.id
        this.model = options.model
        this.producedYear = options.producedYear
        this.capacity = options.capacity
        this.averageSpeed = options.averageSpeed
        Transport._count += 1
        Transport._name = 'jsbandtransport'
    }

    get getObj() {
        return JSON.stringify(this);
    }

    saveInLocalStorage() {

        var stor = Object.values(localStorage);
        var result = stor.find(x => (x.indexOf(this.id) !== -1));
        if (result) {
            console.warn('This object already exist');
        } else {
            localStorage.setItem(Transport._name + Transport._count, JSON.stringify(this));
        }

    }

    showCapacityInPounds() {
        return (this.capacity * 2.20462262) + 'lb'
    }

    showAverageSpeed() {
        return this.averageSpeed
    }

    varName() {
        return this
    }
}

// static property
Transport._count = 0;

var keys = Object.keys(localStorage),
    allTransportIndexes = keys.filter(val => val.indexOf('jsbandtransport') !== -1),
    indexes = allTransportIndexes.map(x => +(x.replace('jsbandtransport', ''))),
    maxIndex = Math.max(...indexes);

if (indexes.length > 0) {
    Transport._count = maxIndex + 1;
}

class Ship extends Transport {
    constructor(options) {
        super(options)
        this.snName = options.snName
        this.countOfTeam = options.countOfTeam
    }

    showAverageSpeed() {
        return super.showAverageSpeed() + 'nm'
    }
}

class Truck extends Transport {
    constructor(options) {
        super(options)
        this.licensePlate = options.licensePlate
        this.typeOfGas = options.typeOfGas
    }

    showAverageSpeed() {
        return super.showAverageSpeed() + 'km'
    }
}

const DEFAULT_SHIP = new Ship({
    id: '456-452-412',
    model: 'Middle',
    name: 'Kyiv',
    producedYear: '2019',
    capacity: '400000',
    averageSpeed: '40',
    countOfTeam: '250'
});
DEFAULT_SHIP.saveInLocalStorage();

const DEFAULT_TRUCK = new Truck({
    id: '321-542-860',
    model: 'KFO 354',
    licensePlate: 'AA 6324 II',
    producedYear: '2018',
    capacity: '50000',
    averageSpeed: '130',
    typeOfGas: 'gasoline'
});
DEFAULT_TRUCK.saveInLocalStorage();

// render list
function renderList() {
    const keys = Object.keys(localStorage),
        allTransportIndexes = keys.filter(val => val.indexOf('jsbandtransport') !== -1),
        container = document.getElementById('listoftransport');

    // clean container
    container.innerHTML = "";

    for (var i = 0, length = allTransportIndexes.length; i < length; i++) {
        const plate = document.createElement('div');
        plate.classList.add('plate');
        var obj = JSON.parse(localStorage.getItem(allTransportIndexes[i]));
        for (key in obj) {
            if (key !== "unique") {
                plate.innerHTML += `<p><strong>${key}:</strong> ${obj[key]}</p>`;
            }
        }
        container.append(plate);
    }

}

renderList()

// clear form's field
function clearFormField(elements) {
    for (var i = 0, length = elements.length; i < length; i++) {
        if (elements[i].type === "text" || elements[i].type === "select-one") {
            elements[i].value = "";
        }
    }
}

// new ship creation
window.saveShip = function saveShip() {

    const jsbanddelivery = new Ship({
        id: idofship.value,
        model: shipmodel.value,
        name: serialnumber.value,
        producedYear: shipproducedyear.value,
        capacity: shipcapacity.value,
        averageSpeed: shipavgspeed.value,
        countOfTeam: countofteam.value
    });

    console.log(`%c Average Speed of ${jsbanddelivery.model}`, 'color:skyblue;font-weight:bold;font-size:15px');
    console.log(`%c ${jsbanddelivery.showAverageSpeed()}`, 'color:skyblue;font-weight:bold;font-size:12px');
    console.log(`%c Capacity in Pounds of ${jsbanddelivery.model}`, 'color:skyblue;font-weight:bold;font-size:15px');
    console.log(`%c ${jsbanddelivery.showCapacityInPounds()}`, 'color:skyblue;font-weight:bold;font-size:12px');

    jsbanddelivery.saveInLocalStorage();

    var elements = document.getElementById("shipform").elements;
    clearFormField(elements);

    renderList();
}

// new truck creation
window.saveTruck = function saveTruck() {

    const jsbanddelivery = new Truck({
        id: truckid.value,
        model: truckmodel.value,
        licensePlate: licenseplate.value,
        producedYear: truckproducedyear.value,
        capacity: truckcapacity.value,
        averageSpeed: truckavgspeed.value,
        typeOfGas: typeofgas.value
    });

    console.log(`%c Average Speed of ${jsbanddelivery.model}`, 'color:purple;font-weight:bold;font-size:15px');
    console.log(`%c ${jsbanddelivery.showAverageSpeed()}`, 'color:purple;font-weight:bold;font-size:12px');
    console.log(`%c Capacity in Pounds of ${jsbanddelivery.model}`, 'color:purple;font-weight:bold;font-size:15px');
    console.log(`%c ${jsbanddelivery.showCapacityInPounds()}`, 'color:purple;font-weight:bold;font-size:12px');

    jsbanddelivery.saveInLocalStorage();

    var elements = document.getElementById("truckform").elements;
    clearFormField(elements);

    renderList();
}


