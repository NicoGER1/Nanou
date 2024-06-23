const AbstractSeeder = require("./AbstractSeeder");

class ChildrensSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "childrens", truncate: true });
  }

  // The run method - Populate the 'Children' table with fake data

  run() {
    // Generate and insert fake data into the 'Children' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake user data
      const fakeChildren = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        aadress: this.faker.location.adress(),
        email: this.faker.internet.email(),
        phoneNumber: this.faker.phone.phoneNumber(),
        // Generate a fake password using faker library
        refName: `user_${i}`, // Create a reference name for the children
      };

      // Insert the fakeUser data into the 'Children' table
      this.insert(fakeChildren);
    }
  }
}

// Export the UserSeeder class
module.exports = ChildrensSeeder;
