const csvToJSON = require('csvtojson');

const fs = require('fs');

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjkzZjE4YTI0LTA4MzYtNDBhZC04MWRhLWFhZjU4MjkwZTFmNCIsImlhdCI6MTY4MTA3MDM0NSwic3ViIjoiZGV2ZWxvcGVyL2Y0NzQ1NWFiLWZiNzctMDNmMy1jMThkLWRkYjE4MTU3NGYzOSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjIxNy40NC4xNS4yNiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.LpufTD0yWmnzW2A19MAXTlG5UTEpbrlZmRLZNCdiol0HpScpsqgcyo7D5J94Bd6pPO8tOcmoxnt82hyn891CeQ';
const url = 'https://api.clashofclans.com/v1/';

async function clanInfo(tag = '#29U8UJCUO') {
    const newTag = tag.slice(1);
    const res = await fetch(url+`clans/%23${newTag}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+token}
    });
    const resJSON = await res.json();
    console.log(resJSON);
}

async function clanCapital(tag = '#29U8UJCUO') {
    const newTag = tag.slice(1);
    const res = await fetch(url+`clans/%23${newTag}/capitalraidseasons`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+token}
    });
    const resJSON = await res.json();
    console.log(resJSON.items[0].defenseLog);
}

async function averageClanCapitalDefenses(tag = '#29U8UJCUO') {
    const newTag = tag.slice(1);
    const res = await fetch(url+`clans/%23${newTag}/capitalraidseasons`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+token}
    });
    const resJSON = await res.json();

    const defences = resJSON.items[0].defenseLog;

    let total = 0;
    let num = 0;
    for (const def of defences) {
        if (def.districtsDestroyed === def.districtCount) {
            total += def.attackCount;
            num += 1;
        }
    }

    return total / num;
}

async function clanList() {
    const query = '?minMembers=30&limit=60'
    const res = await fetch(url+'clans' + query, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+ token}
    });
    const resJSON = await res.json();
    
    const tags = resJSON.items.map((item) => {
        return item.tag;
    });

    return tags;
}

async function clanCapitalLevel(tag) {
    const newTag = tag.slice(1);
    const res = await fetch(url+`clans/%23${newTag}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+token}
    });
    const resJSON = await res.json();

    const capitalHallLevel = resJSON.clanCapital.capitalHallLevel;
    return capitalHallLevel;
}

async function calculate() {
    const x = await clanList();
    let result = [];

    for (const clanTag of x) {
        const chLevel = await clanCapitalLevel(clanTag);
        if (await chLevel === 8) {
            console.log(clanTag);
            result.push(await averageClanCapitalDefenses(clanTag));
        }
    }

    console.log(result);
}

// averageClanCapitalDefenses('#G2VUJUPJ');
async function tests() {
    // const ourInfo = clanInfo('#29U8UJCUO');
    // const ourRaids = clanCapital('#29U8UJCUO');
    // averageClanCapitalDefenses();

    // calculate();
    // console.log(await averageClanCapitalDefenses());
}
// tests();




// ******************** CLAN CAPITAL ATTACKS AUTOMATION ********************
class memberAttacks {
    constructor(name, tag, totalAttacks, capitalGold) {
        this.name = name;
        this.tag = tag;
        this.totalAttacks = totalAttacks;
        this.capitalGold = capitalGold;
    }
}

async function listClanCapitalAttacks(tag = '#29U8UJCUO') {
    const newTag = tag.slice(1);
    const res = await fetch(url+`clans/%23${newTag}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+token}
    });
    const resJSON = await res.json();
    const members = resJSON.memberList;

    let raidDate;
    let playersOutput = [];
    for (const member of members) {
        const info = await clanCapitalAttacks(member, tag);
        const user = info.users;
        raidDate = info.date;
        playersOutput.push(user);
    }


    return { players: playersOutput, date: raidDate };
}

async function clanCapitalAttacks (playerObj, tag = '#29U8UJCUO') {
    // Getting clan capital raids
    const newTag = tag.slice(1);
    const res = await fetch(url+`clans/%23${newTag}/capitalraidseasons`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+ token}
    });
    const resJSON = await res.json();

    // Getting the useful parts of a player
    let user = new memberAttacks(playerObj.name, playerObj.tag, 0, 0);

    for (const member of resJSON.items[0].members) {
        if (member.tag === user.tag) {
            user.totalAttacks += member.attacks
            user.capitalGold += member.capitalResourcesLooted
        }
    }

    // Format the date
    const loadDate = resJSON.items[0].endTime;
    const day = loadDate.slice(6, 8);
    const month = loadDate.slice(4, 6);
    const year = loadDate.slice(0, 4);
    const raidDate = `${day}/${month}/${year}`;

    return { users: user, date: raidDate };
}

async function reloadRaidAttacks() {
    let x = await loadRaidAttacksData();
    let y = await jsonToCSV(x);

    fs.writeFile('data/raidAttacks.csv', y, function (err) {
        if (err) throw err;
    });
}

async function loadRaidAttacksData() {
    const csvFilePath = './data/raidAttacks.csv';
    const json = await csvToJSON().fromFile(csvFilePath);
    return json;
}

async function jsonToCSV(data) {
    // From StackOverflow: https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable [Accessed 06/04/2023]
    const items = data;
    const replacer = (key, value) => {
        // Define what to do with empty values here
        return (key, value);
    }
    const header = Object.keys(items[0])
    header[4] = ''
    const csv = [
    header.join(','), // header row first
    ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n')

    return csv;
}

async function appendRaidAttacksData() {
    // Load current JSON data
    const csvFilePath = './data/raidAttacks.csv';
    const currentJSON = await csvToJSON().fromFile(csvFilePath);
    // console.log(currentJSON);

    // Load the current week's JSON
    const capitalAttacks = await listClanCapitalAttacks();
    const recentJSON = capitalAttacks.players;
    const date = capitalAttacks.date;
    
    let ranAlready = true;
    // Add a new date column to currentJSON
    if (currentJSON[0][`${date} Attacks`] === undefined) {
        ranAlready = false;
        for (const row of currentJSON) {
            row[`${date} Attacks`] = '';
        }
    }
    if (currentJSON[0][`${date} Gold`] === undefined) {
        ranAlready = false;
        for (const row of currentJSON) {
            row[`${date} Gold`] = '';
        }
    }

    // Go through recentJSON, and add attacks and gold to each array
    let newJSON = [];
    for (const raidStat of recentJSON) {
        // Search the current clan members for the tag
        let match = currentJSON.filter((e) => {
            return e.Tag === raidStat.tag;
        });

        // console.log(match);

        let newUserData;

        // If there are no clan members with this tag, add a row
        if (match.length === 0) {
            newUserData = {...currentJSON[0]};
            for (key in newUserData) {
                newUserData[key] = '';
            }

            newUserData.Username = raidStat.name;
            newUserData.Tag = raidStat.tag;

            newUserData.Attacks = Number(raidStat.totalAttacks);
            newUserData.Gold = Number(raidStat.capitalGold);

            newUserData[`${date} Attacks`] = Number(raidStat.totalAttacks);
            newUserData[`${date} Gold`] = Number(raidStat.capitalGold);
        }

        // If the clan member is already in the spreadsheet
        else {
            newUserData = {...match[0]};

            if (ranAlready) {
                // Update information
                const prevAttacks = Number(newUserData[`${date} Attacks`]);
                const prevGold = Number(newUserData[`${date} Gold`]);

                // Should fix so it calculates the lifetime total for robustness
                newUserData.Attacks = Number(newUserData.Attacks) - prevAttacks + Number(raidStat.totalAttacks);
                newUserData.Gold = Number(newUserData.Gold) - prevGold + Number(raidStat.capitalGold);
                newUserData[`${date} Attacks`] = Number(raidStat.totalAttacks);
                newUserData[`${date} Gold`] = Number(raidStat.capitalGold);
            } else {
                newUserData.Attacks = Number(newUserData.Attacks) + Number(raidStat.totalAttacks);
                newUserData.Gold = Number(newUserData.Gold) + Number(raidStat.capitalGold);
                newUserData[`${date} Attacks`] = Number(raidStat.totalAttacks);
                newUserData[`${date} Gold`] = Number(raidStat.capitalGold);
            }
        }

        newJSON.push(newUserData);
    }

    // Add the newJSON to the spreadsheet
    let newData = await jsonToCSV(newJSON);

    fs.writeFile('data/raidAttacks.csv', newData, function (err) {
        if (err) throw err;
    });

    fs.writeFile('data/raidAttacks.json', JSON.stringify(newJSON), function (err) {
        if (err) throw err;
    });
}

async function updateWars (tag = '#29U8UJCUO') {
    const newTag = tag.slice(1);
    const res = await fetch(url+`clans/%23${newTag}/warlog`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+ token}
    });
    const resJSON = await res.json();

    fs.writeFile('data/clanWars.json', JSON.stringify(resJSON), function (err) {
        if (err) throw err;
    });

    const resp = await fetch(url+`clans/%23${newTag}/currentwar`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer '+ token}
    });
    const respJSON = await resp.json();

    fs.writeFile('data/currentWar.json', JSON.stringify(respJSON), function (err) {
        if (err) throw err;
    });
}

async function test3() {
    await appendRaidAttacksData();
    await updateWars();
}
test3();