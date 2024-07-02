const AbstractSeeder = require("./AbstractSeeder");
const ChildrensSeeder = require("./ChildrensSeeder");
const ParentsSeeder = require("./ParentsSeeder");

class ChildrensParentsSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "childrens_parents",
      truncate: true,
      dependencies: [ChildrensSeeder, ParentsSeeder],
    });
    this.relations = ["father", "mother", "guardian", "grandparent"];
  }

  run() {
    for (let i = 0; i < 4; i += 1) {
      const fakeRelation = {
        child_ID: this.getRef(`childrens_${Math.floor(Math.random() * 4)}`)
          .insertId,
        parent_ID: this.getRef(`parents_${Math.floor(Math.random() * 4)}`)
          .insertId,
        relation: this.faker.helpers.arrayElement(this.relations),
      };
      this.insert(fakeRelation);
    }
    return Promise.all(this.promises);
  }
}

module.exports = ChildrensParentsSeeder;
