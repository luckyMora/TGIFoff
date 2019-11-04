let members = [];
let getStates = document.getElementsByClassName("CheckState");
let tableid = document.getElementById("senateD");
let leererStr = "";
if (document.title === "Senate") {
    leererStr = "senate"
} else {
    leererStr = "house"
}
fetch(`https://api.propublica.org/congress/v1/115/${leererStr}/members.json`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "g7VlN7ypGQ2lu7EH6e5u3AQkq8NGFSavDnc1jlxE"
        }
    })
    .then(resp => resp.json()) // Transform the data into json
    .then(function (data) {
        console.log(data);

        //createTable([], [], members);

        data.results[0].members.forEach(function (element) {
            members.push(element);
        });
        filterStates();
        eventStates();
        getvalue();

    });



function createTable(filterArr, filterArr2) {
    for (var x = 0; x < members.length; x++) {
        if (filterArr.length === 0 && filterArr2.length === 0) {
            createTable2(x);
        }
        if (
            filterArr.length > 0 &&
            filterArr2.length === 0 &&
            filterArr.includes(members[x].party)
        ) {
            createTable2(x);
        }
        if (
            filterArr.length === 0 &&
            filterArr2.length > 0 &&
            filterArr2.includes(members[x].state)
        ) {
            createTable2(x);
        }
        if (
            filterArr.length > 0 &&
            filterArr2.length > 0 &&
            filterArr.includes(members[x].party) &&
            filterArr2.includes(members[x].state)
        ) {
            createTable2(x);
        }
    }
}

function createTable2(i) {
    let rows = document.createElement("tr");
    tableid.appendChild(rows);
    let middl = " ";
    if (members[i].middle_name === null) {
        middl = "";
    } else {
        middl = members[i].middle_name;
    }
    let data2 = document.createElement("td");
    let name =
        members[i].first_name.charAt(0) + ". " + middl + " " + members[i].last_name;
    data2.innerHTML = name;
    rows.appendChild(data2);
    let data3 = document.createElement("td");
    data3.innerHTML = members[i].party;
    rows.appendChild(data3);
    let data4 = document.createElement("td");
    data4.innerHTML = members[i].seniority;
    rows.appendChild(data4);
    let data5 = document.createElement("td");
    data5.innerHTML = members[i].state;
    rows.appendChild(data5);
    let data6 = document.createElement("td");
    data6.innerHTML = members[i].votes_with_party_pct;
    rows.appendChild(data6);
}

let democrats = document.getElementById("CheckDem");
let republicans = document.getElementById("CheckRep");
let independents = document.getElementById("CheckInd");

function event() {
    democrats.addEventListener("change", function () {
        getvalue();
    });

    republicans.addEventListener("change", function () {
        getvalue();
    });

    independents.addEventListener("change", function () {
        getvalue();
    });
}

function getvalue() {
    tableid.innerHTML = "";

    let Vergleichnarr = [];
    let ArrStates = [];
    let Cher = Array.from(getStates);
    Cher.forEach(function (element) {
        if (element.checked) {
            ArrStates.push(element.value);
        }
    });

    if (democrats.checked) {
        Vergleichnarr.push("D");
    }
    if (republicans.checked) {
        Vergleichnarr.push("R");
    }
    if (independents.checked) {
        Vergleichnarr.push("I");
    }
    console.log(ArrStates);
    console.log(Vergleichnarr);
    createTable(Vergleichnarr, ArrStates);
}

event();

function filterStates() {
    var stateArr = [];

    for (var i = 0; i < members.length; i++) {
        if (stateArr.length === 0) {
            stateArr.push(members[i].state);
        } else if (stateArr.includes(members[i].state)) {} else {
            stateArr.push(members[i].state);
            stateArr.sort();
        }
    }

    for (var i = 0; i < stateArr.length; i++) {
        let papa = document.getElementById("papa");
        let liste = document.createElement("li");
        let checkboxes = document.createElement("input");
        checkboxes.type = "checkbox";
        checkboxes.className = "CheckState";
        checkboxes.value = stateArr[i];
        liste.innerHTML = stateArr[i];
        papa.appendChild(liste);
        liste.appendChild(checkboxes);
    }
}


console.log(getStates);

function eventStates() {
    console.log("hey na");
    let wer = Array.from(getStates);
    wer.forEach(function (er) {
        er.addEventListener("change", function () {
            getvalue();
        });
    });
}