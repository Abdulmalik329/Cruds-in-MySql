const db = require("../config/db.config");

// post admin
const createAdmin = (req, res) => {
  const { full_name, email, password, phone_number, is_active = false, is_creator = false } = req.body;
  db.query(
    `INSERT INTO admin (full_name, email, password, phone_number, is_active, is_creator) VALUES (?, ?, ?, ?, ?, ?)`,
    [full_name, email, password, phone_number, is_active, is_creator],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          message: error.message,
          message: "Error adding new admin",
          error: "Internal Server Error",
        });
      }
      res.status(201).json({
        statusCode: 201,
        message: "New admin added",
        id: results.insertId,
      });
    }
  );
};
// get admin
const getAdmin = (req, res) => {
  const getQuery = `SELECT * FROM admin`;
  db.query(getQuery, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting  admin",
        error: "Internal Server Error",
      });
    }
    res.status(200).json({
      statusCode: 200,
      message: "admin retrieved successfully",
      data: result,
    });
  });
};

//findByName
const findByName = (req, res) =>{
  const {full_name} = req.query;
  const searchPattern = `%${full_name}%`;
  
  const findByNameQuery = `SELECT * FROM admin WHERE full_name LIKE ?`;
  db.query(findByNameQuery, 
    [searchPattern], 
    (error, result) => {
    if (error) {
      return res.status(500).json({
        message: error.message,
      });
    }

    res.json({
      statusCode: 200,
      message: "a find by full_name retrieved successfully",
      data: result[0],
    });
  });
};


// get one admin
const getOneAdmin = (req, res) => {
  const id = req.params.id;
  const getOneQuery = `SELECT * FROM admin WHERE id = ?`;
  db.query(getOneQuery, [id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error getting one admin",
        error: "Internal Server Error",
      });
    }

    if (!result.length) {
      return res.status(404).json({
        message: "A admin not found",
      });
    }

    res.json({
      statusCode: 200,
      message: "a admin retrieved successfully",
      data: result[0],
    });
  });
};

// update admin
const updateadmin = (req, res) => {
  const id = req.params.id;
  const { full_name, email, password, phone_number } = req.body;

  const updateQuery = `UPDATE admin SET full_name = ?, email = ?, password = ?, phone_number = ? WHERE id = ?`;

  db.query(updateQuery, [full_name, email, password, phone_number, id], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        message: "Error updating an admin",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "an admin updated successfully",
      data: result.affectedRows,
    });
  });
};

// delete admin
const deleteAdmin = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM admin where id = ?`;
  db.query(deleteQuery, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        message: "Error deleting one admin",
        error: "Internal Server Error",
      });
    }

    res.json({
      statusCode: 200,
      message: "a admin deleted successfully",
      data: result.affectedRows,
    });
  });
};


module.exports = {
  createAdmin,
  getAdmin,
  findByName,
  getOneAdmin,
  deleteAdmin,
  updateadmin,
};
