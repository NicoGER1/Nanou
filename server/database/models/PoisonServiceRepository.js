const AbstractRepository = require("./AbstractRepository");

class poisonServiceRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "emergency" as configuration
    super({ table: "poison_service" });
  }

  // The C of CRUD - Create operation

  async create(poisonService) {
    // Execute the SQL INSERT query to add a new emergency to the "emergency" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, number) values (?, ?)`,
      [poisonService.name]
    );

    // Return the ID of the newly inserted emergency
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific emergency by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the emergency
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all emergency from the "emergency" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of emergency
    return rows;
  }

  // The U of CRUD - Update operation
  async update(poisonService) {
    // Execute the SQL UPDATE query to update a specific emergency
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, number = ? where id = ?`,
      [poisonService.name, poisonService.number, poisonService.id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to delete a specific emergency
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = poisonServiceRepository;
