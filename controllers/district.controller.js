const db = require("../config/db.config");

// Create
const createDistrict = (req, res) => {
  const { name } = req.body;
  db.query(
    `INSERT INTO district (name) VALUES (?)`,
    [name],
    (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .json({ message: "Error adding new Gas Station" });
      }
      res.status(201).json({
        statusCode: 201,
        message: "New district added",
        id: results.insertId,
      });
    }
  );
};

// Get all
const getDistrict = (req, res) => {
  db.query(`SELECT * FROM district`, (error, result) => {
    if (error)
      return res.status(500).json({ message: "Error retrieving Gas Stations" });
    res.json({
      statusCode: 200,
      message: "District retrieved successfully",
      data: result,
    });
  });
};

// Get one
const getOneDistrict = (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM district WHERE id = ?`, [id], (error, result) => {
    if (error)
      return res.status(500).json({ message: "Error retrieving Gas Station" });
    if (!result.length)
      return res.status(404).json({ message: "Gas Station not found" });
    res.json({
      statusCode: 200,
      message: "District retrieved successfully",
      data: result[0],
    });
  });
};

//get by name
const getOneDistrictByname = (req, res) => {
  const {name} = req.query;
  db.query(
    `SELECT * FROM district WHERE name = ?`,
    [name],
    (error, result) => {
      if (error)
        return res
          .status(500)
          .json({ message: "Error retrieving district" });
      if (!result.length)
        return res
          .status(404)
          .json({ message: "District not found" });
      res.json({
        statusCode: 200,
        message: "District retrieved successfully",
        data: result[0],
      });
    }
  );
};


// Update
const updateDistrict = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query(
    `UPDATE district SET name = ? WHERE id = ?`,
    [name, id],
    (error, result) => {
      if (error)
        return res.status(500).json({ message: "Error updating District" });
      res.json({
        statusCode: 200,
        message: "District updated successfully",
        affected: result.affectedRows,
      });
    }
  );
};

// Delete
const deleteDistrict = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM district WHERE id = ?`, [id], (error, result) => {
    if (error)
      return res.status(500).json({ message: "Error deleting Discript" });
    res.json({
      statusCode: 200,
      message: "District deleted successfully",
      affected: result.affectedRows,
    });
  });
};

module.exports = {
  createDistrict,
  getDistrict,
  getOneDistrict,
  updateDistrict,
  deleteDistrict,
  getOneDistrictByname,
};
