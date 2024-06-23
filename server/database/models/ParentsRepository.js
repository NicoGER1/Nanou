const AbstractRepository = require("./AbstractRepository");

class ParentsRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "parents" as configuration
    super({ table: "parents" });
  }

  // The C of CRUD - Create operation

  async create(parents) {
    // Execute the SQL INSERT query to add a new parents to the "parents" table
    const [result] = await this.database.query(
      `insert into ${this.table} (firstname, lastname, adress, email, phoneNumber) values (?, ?, ?, ?, ?)`,
      [parents.firstname, parents.lastname, parents.adress, parents.email, parents.phoneNumber]
    );

    // Return the ID of the newly inserted parents
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific parents by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the parents
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all parents from the "parents" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of parents
    return rows;
  }

  // The U of CRUD - Update operation
  async update(parents) {
    // Execute the SQL UPDATE query to update a specific parents
    const [result] = await this.database.query(
      `update ${this.table} set firstname = ?, lastname = ?, adress = ?, email = ?, phoneNumber = ? where id = ?`,
      [parents.firstname, parents.lastname, parents.adress, parents.email, parents.phoneNumber, parents.id]
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

module.exports = ParentsRepository;
