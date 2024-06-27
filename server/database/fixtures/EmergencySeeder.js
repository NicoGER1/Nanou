const AbstractSeeder = require("./AbstractSeeder");

class EmergencySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "emergency", truncate: true });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeEmergency = {
        name: this.faker.company.name(),
        number: this.faker.phone.number(),
      };

      this.insert(fakeEmergency);
    }
  }
}

module.exports = EmergencySeeder;
