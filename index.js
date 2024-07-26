const steamUser = require('steam-user');
const steamTotp = require('steam-totp');
const { exec } = require('child_process');
const keep_alive = require('./keep_alive.js');

var username = process.env.username;
var password = process.env.password;
var shared_secret = process.env.shared;

var games = [814380, 1245620, 230410, 553850, 381210,72850];  // Enter the AppIDs of the needed games
var nonSteamGame = "Touching Nick";  // Non-Steam game name
var status = 1;  // 1 - online, 7 - invisible

user = new steamUser();
user.logOn({"accountName": username, "password": password, "twoFactorCode": steamTotp.generateAuthCode(shared_secret)});
user.on('loggedOn', () => {
    if (user.steamID != null) console.log(user.steamID + ' - Successfully logged on');
    user.setPersona(status);               
    user.gamesPlayed([nonSteamGame, ...games]);  // Show the non-Steam game first, then the other games

    // Launch non-Steam game (if needed)
    exec('path_to_your_non_steam_game_executable', (error, stdout, stderr) => {
        if (error) {
            console.error(Error launching non-Steam game: ${error});
            return;
        }
        console.log(Non-Steam game output: ${stdout});
    });
});
