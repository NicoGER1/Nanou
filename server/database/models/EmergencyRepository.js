const AbstractRepository = require("./AbstractRepository");

class EmergencyRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "emergency" as configuration
    super({ table: "emergency" });
  }

  // The C of CRUD - Create operation

  async create(emergency) {
    // Execute the SQL INSERT query to add a new emergency to the "emergency" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, number) values (?, ?)`,
      [emergency.name]
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
  async update(emergency) {
    // Execute the SQL UPDATE query to update a specific emergency
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, number = ? where id = ?`,
      [emergency.name, emergency.number, emergency.id]
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

module.exports = EmergencyRepository;
