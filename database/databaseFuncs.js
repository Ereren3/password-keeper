const admin = require('firebase-admin');
const serviceAccount = require('../password-keeper-bcc72-firebase-adminsdk-9oyqz-059d878c03.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://password-keeper-bcc72-default-rtdb.europe-west1.firebasedatabase.app/"
});

const db = admin.database();

// Write data to Firebase Realtime Database
async function write(path, name,password) {
    try {
        // Reference to the specified path in the database
        const ref = db.ref(`${path}`);

        // set data to the specified path
        await ref.child(name).set(password);

        // Log the generated key for the new data
        //console.log('Data written to Firebase with key:', );

        // Optionally, return the reference or key of the new data
        //return newRef.key;
    } catch (error) {
        // Log the error if the write operation fails
        console.error('Error writing data:', error);

        // Optionally, rethrow the error or return a failure response
        throw error;
    }
}

async function read() {
    // Reference to the 'password/google' path in the database

    const ref = db.ref('userPassword/');

    // Read the data at the reference once
    await ref.once('value', (snapshot) => {
        // The snapshot contains the data at the specified path
        const data = snapshot.val();

        if (data) {
            console.log('Data retrieved from Firebase:', data);
        } else {
            console.log('No data available');
        }
    }, (error) => {
        console.error('Error reading data:', error);
    });
}

module.exports = {
    write,
    read
};