const fs = require('fs');
const csv = require('csv-parser');
const { convertArrayToCSV } = require('convert-array-to-csv');

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjgyOWEzMTk3LTFlZWEtNDlhYi04ODIxLWU5ZjcyYTRhODQwMSIsImlhdCI6MTY4MDcwMDMwMywic3ViIjoiZGV2ZWxvcGVyL2Y0NzQ1NWFiLWZiNzctMDNmMy1jMThkLWRkYjE4MTU3NGYzOSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjg4LjguMTkxLjExNyJdLCJ0eXBlIjoiY2xpZW50In1dfQ.fXbHxh-vUSFr-0fCSTKgH9EODGtosehyhVMiFnmSo_RH-brID-gC9zQmat6iJdbMqqIaoccZS3ZgWS_jhc7Mag';
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
    constructor(name, tag, totalAttacks) {
        this.name = name;
        this.tag = tag;
        this.totalAttacks = totalAttacks;
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

    let playersOutput = [];
    for (const member of members) {
        const user = await clanCapitalAttacks(member, tag);
        playersOutput.push(user);
    }

    return JSON.stringify(playersOutput);
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
    let user = new memberAttacks(playerObj.name, playerObj.tag, 0);

    for (const member of resJSON.items[0].members) {
        if (member.tag === user.tag) {
            user.totalAttacks += member.attacks
        }
    }

    return user;
}

async function tests2() {
    // console.log(await listClanCapitalAttacks());
    let x = await csvToJSON();
    console.log(x);
}
tests2();

async function csvToJSON() {
    results = [];
    fs.createReadStream('Clan Info/raidAttacks.csv')
      .pipe(csv())
      .on('data', (data) => {
        results.push(data)
      })
      .on('end', () => {
        return results;
        });
}