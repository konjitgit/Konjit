const mongoose = require("mongoose");
const connectDatabase = async () => {
  try {
    const connection = await mongoose
      .connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((data) => {
        console.log(`mongod connected with server: ${data.connection.host}`);
      });
  } catch {
    throw new Error("Unable to Connect To Database");
  }
};

module.exports = connectDatabase;
