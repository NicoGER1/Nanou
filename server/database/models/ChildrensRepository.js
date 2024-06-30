const AbstractRepository = require("./AbstractRepository");

class ChildrensRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "children" as configuration
    super({ table: "childrens" });
  }

  // The C of CRUD - Create operation

  async create(childrens) {
    // Execute the SQL INSERT query to add a new children to the "children" table
    const [result] = await this.database.query(
      `insert into ${this.table} (avatar, firstname, lastname, date_of_birth, alimentation) values (?, ?, ?, ?, ?)`,
      [
        childrens.avatar,
        childrens.firstname,
        childrens.lastname,
        childrens.date_of_birth,
        childrens.alimentation,
      ]
    );

    // Return the ID of the newly inserted children
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific children by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the children
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all children from the "children" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of children
    return rows;
  }

  // The U of CRUD - Update operation
  async update(childrens) {
    // Execute the SQL UPDATE query to update a specific children
    const [result] = await this.database.query(
      `update ${this.table} set avatar = ?, firstname = ?, lastname = ?, date_of_birth = ?, alimentation = ?, where id = ?`,
      [
        childrens.avatar,
        childrens.firstname,
        childrens.lastname,
        childrens.date_of_birth,
        childrens.alimentation,
        childrens.id,
      ]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to delete a specific parents
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = ChildrensRepository;
