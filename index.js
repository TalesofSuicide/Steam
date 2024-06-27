const steamUser = require('steam-user');
const steamTotp = require('steam-totp');
const keep_alive = require('./keep_alive.js');

var username = process.env.username;
var password = process.env.password;
var shared_secret = process.env.shared;

var games = [814380, 1245620, 230410, 553850, 381210];  // Enter the AppIDs of the needed games
var nonSteamGame = "Playing with Sui the raccoon";  // Non-Steam game name
var status = 1;  // 1 - online, 7 - invisible

user = new steamUser();
user.logOn({"accountName": username, "password": password, "twoFactorCode": steamTotp.generateAuthCode(shared_secret)});
user.on('loggedOn', () => {
    if (user.steamID != null) console.log(user.steamID + ' - Successfully logged on');
    user.setPersona(status);               
    user.gamesPlayed([{ game_id: '0', game_extra_info: nonSteamGame }, ...games.map(game_id => ({ game_id }))]);  // Include the non-Steam game without the prefix
});
