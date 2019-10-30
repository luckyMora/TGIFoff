let tableid = document.getElementById("dusack");
let members = data.results[0].members;
let AnzahltR = 0;
let AnzahltD = 0;
let AnzahltI = 0;
let allVR = 0;
let allVD = 0;
let allVI = 0;

for (var i = 0; i < members.length; i++) {
    if (members[i].party === "R") {
        AnzahltR++;

    } else if (members[i].party === "D") {
        AnzahltD++
    } else {
        AnzahltI++;

    }


    if (members[i].party === "R" && members[i].votes_with_party_pct >= 0) {
        allVR += members[i].votes_with_party_pct;
    } else if (members[i].party === "D" && members[i].votes_with_party_pct >= 0) {
        allVD += members[i].votes_with_party_pct;
    } else if (members[i].votes_with_party_pct >= 0) {
        allVI += members[i].votes_with_party_pct;
    }

}
console.log(allVI);
let totalV = (allVD + allVI + allVR) / members.length;
for (var i = 0; i < 4; i++) {
    let rows = document.createElement("tr");
    tableid.appendChild(rows);
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");

    if (i === 0) {
        cell1.innerHTML = "Republicans";
        cell2.innerHTML = AnzahltR;
        cell3.innerHTML = Number.parseFloat(allVR / AnzahltR).toFixed(2);
    }

    if (i === 1) {
        cell1.innerHTML = "Democrates";
        cell2.innerHTML = AnzahltD;
        cell3.innerHTML = Number.parseFloat(allVD / AnzahltD).toFixed(2);
    }
    if (i === 2) {
        cell1.innerHTML = "Independent";
        cell2.innerHTML = AnzahltI;
        if (AnzahltI === 0) {
            cell3.innerHTML = 0;

        } else {
            cell3.innerHTML = Number.parseFloat(allVI / AnzahltI).toFixed(2);

        }
    }
    if (i === 3) {
        cell1.innerHTML = "Total";
        cell2.innerHTML = members.length;
        cell3.innerHTML = Number.parseFloat(totalV).toFixed(2);

    }
    rows.appendChild(cell1);
    rows.appendChild(cell2);
    rows.appendChild(cell3);
}

var arraymissed = [];
for (var i = 0; i < members.length; i++) {
    let middlename = "";
    if (members[i].middle_name === null) {} else {
        middlename = members[i].middle_name;
    }
    let name = members[i].first_name + " " + middlename + " " + members[i].last_name;
    if (members[i].votes_with_party_pct > 0) {



        arraymissed.push({
            fullname: name,
            absolute_missed_votes: members[i].missed_votes,
            relative_missed_votes: members[i].missed_votes_pct,
            loyal_ptc: members[i].votes_with_party_pct,
            votes_w_party: (members[i].total_votes - members[i].missed_votes) / members[i].votes_with_party_pct,
        })
    } else {}
}
console.log(arraymissed);

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
sortByKey(arraymissed, "relative_missed_votes");
console.log(arraymissed);

function createPerTable(domtableid, key1, key2) {
    let tableid = document.getElementById(domtableid);
    for (var i = 0; i < arraymissed.length / 10; i++) {
        let row = document.createElement("tr")

        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        let cell3 = document.createElement("td");
        cell1.innerHTML = arraymissed[i].fullname;
        cell2.innerHTML = arraymissed[i][key1];
        cell3.innerHTML = arraymissed[i][key2];

        tableid.appendChild(row);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
    }

}

if (document.title == "Attendance House") {
    createPerTable("missedtable", "absolute_missed_votes", "relative_missed_votes");
}
if (document.title == "Loyalty House") {
    createPerTable("miep", "votes_w_party", "loyal_ptc");
}
if (document.title == "Attendance Senate") {
    createPerTable("missedtable", "absolute_missed_votes", "relative_missed_votes");
}
if (document.title == "Loyalty Senate") {
    createPerTable("miep", "votes_w_party", "loyal_ptc");
}

function sortByKey2(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}
sortByKey2(arraymissed, "relative_missed_votes");



if (document.title == "Attendance House") {
    createPerTable("attendancetable", "absolute_missed_votes", "relative_missed_votes");
}
if (document.title == "Attendance Senate") {
    createPerTable("attendancetable", "absolute_missed_votes", "relative_missed_votes");
}
if (document.title == "Loyalty House") {
    createPerTable("moep", "votes_w_party", "loyal_ptc");
}
if (document.title == "Loyalty Senate") {
    createPerTable("moep", "votes_w_party", "loyal_ptc");
}