const steamUser = require('steam-user');
const steamTotp = require('steam-totp');
const keep_alive = require('./keep_alive.js');

var username = process.env.username;
var password = process.env.password;
var shared_secret = process.env.shared;

var games = [814380, 1245620, 230410, 553850, 381210];  // AppIDs of the games you want to play
var status = 1;  // 1 - online, 7 - invisible
var customStatus = "Playing with Sui the Raccoon";  // Custom status message

user = new steamUser();
user.logOn({"accountName": username, "password": password, "twoFactorCode": steamTotp.generateAuthCode(shared_secret)});
user.on('loggedOn', () => {
    if (user.steamID != null) console.log(user.steamID + ' - Successfully logged on');
    user.setPersona(status, customStatus);  // Set persona with custom status
    user.gamesPlayed(games);  // Set games being played
});
