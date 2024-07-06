const AbstractRepository = require("./AbstractRepository");

class EventsRepository extends AbstractRepository {
  constructor() {
    super({ table: "events" });
  }

  async create(event) {
    
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, start, end, allDay) VALUES (?, ?, ?, ?)`,
      [event.title, event.start, event.end, event.allDay]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async update(event) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, start = ?, end = ?, allDay = ? WHERE id = ?`,
      [event.title, event.start, event.end, event.allDay, event.id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = EventsRepository;
