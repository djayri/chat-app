const mongoose = require("mongoose");

const connect = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    console.log(`connecting to mongodb....`);
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`connected to MongDB, host:${conn.connection.host}`);
  } catch (error) {
    console.error(`Failed to connect to MongoDB, error:${error.message}`);
    process.exit(1);
  }
};

module.exports = connect;
