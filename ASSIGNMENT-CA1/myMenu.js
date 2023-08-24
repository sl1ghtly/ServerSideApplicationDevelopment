import chalk from 'chalk';

function welcomeMenu() {
    // basic welcome menu
    console.log();
    console.log(chalk.cyanBright("Welcome to Eryk's Node Pointiare Game: "));
    console.log(chalk.blueBright("(1) Play Pointiare. "));
    console.log(chalk.blueBright("(2) Administrate Game. "));
    console.log(chalk.blueBright("(3) Show Top Five Scores. "));
    console.log(chalk.redBright("(0) EXIT THE GAME. "));
}

function adminMenu() {
    // function to post game menu
    console.log();
    console.log(chalk.cyanBright("Administrate the Pointiare Game: "));
    console.log(chalk.redBright("(1) Add a Question. "));
    console.log(chalk.redBright("(2) Delete a Question. "));
    console.log(chalk.redBright("(3) Edit Question. "));
    console.log(chalk.redBright("(4) View Question. "));
    console.log(chalk.redBright("(0) EXIT ADMIN MODE. "));
}

export { welcomeMenu, adminMenu };