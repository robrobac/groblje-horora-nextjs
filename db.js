import mongoose from 'mongoose'

// Function to establish connection with MongoDB
const connect = async () => {
    try {
        // Attempting to connect to MongoDB using the provided URI
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // console.log('Database connected'); // Keep in Development
    } catch (err) {
        throw new Error('Error connecting to database', err);
    }
}

export default connect