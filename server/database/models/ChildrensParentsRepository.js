const AbstractRepository = require("./AbstractRepository");

class ChildrensParentsRepository extends AbstractRepository {
  constructor() {
    // Call the constructor of the parent class (AbstractRepository)
    // and pass the table name "childrensParents" as configuration
    super({ table: "children" });
  }

  // The C of CRUD - Create operation

  async create(childrensParents) {
    // Execute the SQL INSERT query to add a new childrensParents to the "childrensParents" table
    const [result] = await this.database.query(
      `insert into ${this.table} (child_id, parent_id) values (?, ?)`,
      [childrensParents.child_id, childrensParents.parent_id]
    );

    // Return the ID of the newly inserted childrensParents
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific childrensParents by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the childrensParents
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all childrensParents from the "childrensParents" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of childrensParents
    return rows;
  }

  // The U of CRUD - Update operation
  async update(childrensParents) {
    // Execute the SQL UPDATE query to update a specific childrensParents
    const [result] = await this.database.query(
      `update ${this.table} set child_id = ?, parent_id = ? where id = ?`,
      [childrensParents.child_id, childrensParents.parent_id, childrensParents.id]
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

module.exports = ChildrensParentsRepository;
