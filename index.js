const steamUser = require('steam-user');
const steamTotp = require('steam-totp');
const { exec } = require('child_process');
const keep_alive = require('./keep_alive.js');

var username = process.env.username;
var password = process.env.password;
var shared_secret = process.env.shared;

var games = [814380, 1245620, 230410, 553850, 381210, "Non-Steam Game Name"];  // Enter here AppIDs of the needed games and names of non-Steam games
var status = 1;  // 1 - online, 7 - invisible

user = new steamUser();
user.logOn({"accountName": username, "password": password, "twoFactorCode": steamTotp.generateAuthCode(shared_secret)});
user.on('loggedOn', () => {
    if (user.steamID != null) console.log(user.steamID + ' - Successfully logged on');
    user.setPersona(status);               
    user.gamesPlayed(games);

    // Launch non-Steam game
    exec('path_to_your_non_steam_game_executable', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error launching non-Steam game: ${error}`);
            return;
        }
        console.log(`Non-Steam game output: ${stdout}`);
    });
});
