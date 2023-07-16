import mongoose  from 'mongoose';

const Connection = async (username = process.env.DB_USERNAME, password = process.env.DB_PASSWORD) => {
    const URL = `mongodb+srv://${username}:${password}@docflow.mxnkz3a.mongodb.net/?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;