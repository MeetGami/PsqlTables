// const { Client } = require('pg');

// const client = new Client({
//     user: 'yashgami',
//     host: 'localhost',
//     database: 'hrms',
//     password: '12345',
//     port: 5434,
// });

// let connected = false;

// const connectToDatabase = async () => {
//     try {
//         if (!connected) {
//             await client.connect();
//             console.log('Connected to the database');
//             connected = true;
//         }
//         return client;
//     } catch (error) {
//         console.error('Error connecting to the database:', error);
//         throw error;
//     }
// };

// const closeDatabaseConnection = async (client) => {
//     try {
//         if (connected) {
//             await client.end();
//             console.log('Disconnected from the database');
//             connected = false;
//         }
//     } catch (error) {
//         console.error('Error closing the database connection:', error);
//         throw error;
//     }
// };

// module.exports = { client, connectToDatabase, closeDatabaseConnection };

const { Client } = require('pg');

class Database {
    constructor() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'hrmsdemo',
            password: 'meet97gami',
            port: 5432,
        });
        this.connected = false;
    }

    async connectToDatabase() {
        try {
            if (!this.connected) {
                await this.client.connect();
                console.log('Connected to the database');
                this.connected = true;
            }
            return this.client;
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    async closeDatabaseConnection() {
        try {
            if (this.connected) {
                await this.client.end();
                console.log('Disconnected from the database');
                this.connected = false;
            }
        } catch (error) {
            console.error('Error closing the database connection:', error);
            throw error;
        }
    }
}

module.exports = Database;
