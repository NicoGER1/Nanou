const AbstractSeeder = require("./AbstractSeeder");

class ParentsSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "childrens", truncate: true });
  }

  // The run method - Populate the 'Children' table with fake data
}

// Export the UserSeeder class
module.exports = ParentsSeeder;
