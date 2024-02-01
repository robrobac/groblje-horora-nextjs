import mongoose from 'mongoose'

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (err) {
        throw new Error('Error connecting to database', err);
    }
}

export default connect