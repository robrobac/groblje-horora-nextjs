const { default: mongoose } = require('mongoose');

const connection = {}

export const dbConnect = async () => {
    try {
        if (connection.isConnected) {
            console.log('Already connected');
            return;
        }
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;
    } catch (err) {
        console.log(err);
        throw new Error('Error connecting to database', err);
    }
}