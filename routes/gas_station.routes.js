const {
  createGasStation,
  getGasStations,
  getOneGasStation,
  updateGasStation,
  deleteGasStation,
  // getOneGasStationByname,
  getOneGasStationBranchBynameGasStation,
} = require("../controllers/gas_station.controller");

const router = require("express").Router();

router.post("/", createGasStation);
router.get("/", getGasStations);
router.get("/find", getOneGasStationBranchBynameGasStation);
router.get("/:id", getOneGasStation);
// router.get("/:name", getOneGasStationByname);
router.patch("/:id", updateGasStation);
router.delete("/:id", deleteGasStation);

module.exports = router;
