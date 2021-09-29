const chalk = require('chalk'); //Styling console output(make errors red and so on)

/**
 * 
 * @param {*} event - contains data about event that ocuured, like error, info, warning
 * @param {*} tags - Each event has its tag to define is it error, warning or custom one 
 */
function styledServerMessage(event, tags) {
    if (tags.info) {
        console.info(chalk.gray(`Info: ${event.data}`));
    } else if (tags.system_info) {
        console.info(chalk.cyanBright(`Sysinfo: ${event.data}`));
    } else if(tags.error) {
        console.error(chalk.redBright(`Error: ${event.data}`));
    } else if(tags.warning) {
        console.warn(chalk.yellowBright(`Warning: ${event.data}`));
    } else {
        console.info(chalk.whiteBright(`${event.data}`));
    }
}

module.exports = {
    styledServerMessage
};