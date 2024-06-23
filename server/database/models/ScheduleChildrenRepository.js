const AbstractRepository = require("./AbstractRepository");

class ScheduleChildrenRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "scheduleChildren" as configuration
    super({ table: "scheduleChildren" });
  }

  // The C of CRUD - Create operation

  async create(scheduleChildren) {
    // Execute the SQL INSERT query to add a new scheduleChildren to the "scheduleChildren" table
    const [result] = await this.database.query(
      `insert into ${this.table} (child_id, schedule_id, date) values (?, ?)`,
      [scheduleChildren.child_id, scheduleChildren.schedule_id, scheduleChildren.date]
    );

    // Return the ID of the newly inserted scheduleChildren
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific scheduleChildren by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the scheduleChildren
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all scheduleChildren from the "scheduleChildren" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of scheduleChildren
    return rows;
  }

  // The U of CRUD - Update operation
  async update(scheduleChildren) {
    // Execute the SQL UPDATE query to update a specific scheduleChildren
    const [result] = await this.database.query(
      `update ${this.table} set child_id = ?, schedule_id = ?, date = ? where id = ?`,
      [scheduleChildren.child_id, scheduleChildren.schedule_id, scheduleChildren.date, scheduleChildren.id]
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

module.exports = ScheduleChildrenRepository;
