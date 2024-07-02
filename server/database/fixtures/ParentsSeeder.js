const AbstractSeeder = require("./AbstractSeeder");

class ParentsSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "parents", truncate: true });
  }

  run() {
    for (let i = 0; i < 4; i += 1) {
      const fakeParent = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        address: this.faker.location.streetAddress(),
        email: this.faker.internet.email(),
        phoneNumber: this.faker.phone.number(),

        refName: `parents_${i}`,
      };
      this.insert(fakeParent);
    }
    return Promise.all(this.promises);
  }
}

module.exports = ParentsSeeder;
