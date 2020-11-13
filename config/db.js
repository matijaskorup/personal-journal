const mongoose = require('mongoose');
module.exports = async () => {
  try {
    let url = process.env.mongoDB;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    //console.log(`database connected on ${url}`);
  } catch (error) {
    // console.log(error);
  }
};
