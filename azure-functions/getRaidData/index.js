const { initializeApp } = require('firebase-admin/app');
const {firestore, credential} = require('firebase-admin')
const cred = JSON.parse(process.env["firebase"])

  initializeApp({
    credential: credential.cert(cred)
  })

class memberAttacks {
    constructor(name, tag, totalAttacks, capitalGold) {
        this.name = name;
        this.tag = tag;
        this.totalAttacks = totalAttacks;
        this.capitalGold = capitalGold;
    }
}

async function clanCapitalAttacks(playerObj, key, resJSON) {

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
    const raidDate = `${year}/${month}/${day}`;

    return { users: user, date: raidDate };
}

module.exports = async function (context, myTimer) {
    const keys = process.env['coc'].split(',')

    for (let key of keys) {
        try {
            let res = await fetch('https://api.clashofclans.com/v1/clans/%2329U8UJCUO', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + key }
            });
            let resJSON = await res.json();
            const members = resJSON.memberList;

            let raidDate;
            let playersOutput = [];

            // Getting clan capital raids
            res = await fetch('https://api.clashofclans.com/v1/clans/%2329U8UJCUO/capitalraidseasons', {
                method: 'GET',
                headers: { 'Authorization': 'Bearer ' + key }
            });
            resJSON = await res.json();

            for (const member of members) {
                const info = await clanCapitalAttacks(member, key, resJSON);
                const user = info.users;
                raidDate = info.date;
                playersOutput.push(user);
            }
            const db = firestore()
            const raidRef = db.collection('raids').doc(raidDate.replace(/\//g, "-"))
            let doc = await raidRef.get()
            if (!doc.exists) {
                await raidRef.set({date: new Date(raidDate)})
                const usersRef = raidRef.collection('users')
                for (const player of playersOutput) {
                    await usersRef.doc(player.tag).set({tag: player.tag, name: player.name, attacks: player.totalAttacks, gold: player.capitalGold})
                }
            }
            break
        } catch (error) {
        }
    }
};