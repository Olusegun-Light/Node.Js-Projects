const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
// console.log(process.env);

// Set up server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
