const AbstractRepository = require("./AbstractRepository");

class ScheduleRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "schedule" as configuration
    super({ table: "schedule" });
  }

  // The C of CRUD - Create operation

  async create(schedule) {
    // Execute the SQL INSERT query to add a new schedule to the "schedule" table
    const [result] = await this.database.query(
      `insert into ${this.table} (end_hour, start_hour values (?, ?)`,
      [schedule.end_hour, schedule.start_hour]
    );

    // Return the ID of the newly inserted schedule
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific schedule by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the schedule
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all schedule from the "schedule" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of schedule
    return rows;
  }

  // The U of CRUD - Update operation
  async update(schedule) {
    // Execute the SQL UPDATE query to update a specific schedule
    const [result] = await this.database.query(
      `update ${this.table} set end_hour = ?, start_hour = ? where id = ?`,
      [schedule.end_hour, schedule.start_hour, schedule.id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  async delete(id) {
    // Execute the SQL DELETE query to delete a specific schedule
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return how many rows were affected
    return result.affectedRows;
  }
}

module.exports = ScheduleRepository;
