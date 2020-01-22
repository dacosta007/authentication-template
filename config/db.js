const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await new mongoose.connect(process.env.LOCAL_MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected successfully at: ${conn.connection.host}`);

  } catch (err) {
    console.error(err);
    // exit the app with error
    process.exit(1);
  }
};

module.exports = connectDB;