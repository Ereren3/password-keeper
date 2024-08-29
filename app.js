const {read, write} = require("./database/databaseFuncs");
const {data} = require("./model/password")

let appIsOnline = true;

do {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('What do you want to do \n1 Get passwords.\n2 Set password. \n3 Close', answer => {
        if (answer === 1) {
            readline.question('Please enter ID for password', id => {
                readline.question('Please enter password', password => {
                    write('userPassword', id, data(password))
                        .then(() => {
                            console.log("Password set process is successful!");
                        })
                        .catch((error) => {
                            console.error('Write failed:', error);
                        });
                })
            })
        } else if (answer === 2) {
            read().catch((error) => {
                console.log('Read failed:', error);
            });
        } else if (answer === 3) {
            appIsOnline = false;
        }
        readline.close();
    });
} while (appIsOnline === true)



