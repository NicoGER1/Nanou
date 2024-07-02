const AbstractSeeder = require("./AbstractSeeder");

class ChildrensSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "childrens", truncate: true });
  }

  run() {
    for (let i = 0; i < 4; i += 1) {
      const fakeChildren = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        date_of_birth: this.faker.date.past({ years: 10 }),
        alimentation: this.faker.helpers.arrayElement([
          "normal",
          "vgetarian",
          "vegan",
        ]),

        refName: `childrens_${i}`,
      };

      this.insert(fakeChildren);
    }
    return Promise.all(this.promises);
  }
}

module.exports = ChildrensSeeder;
