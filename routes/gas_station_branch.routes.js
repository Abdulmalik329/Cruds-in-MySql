const {
  createGasStationBranch,
  getGasStationBranches,
  getOneGasStationBranch,
  updateGasStationBranch,
  deleteGasStationBranch,
  getFuelTypeBrench,
} = require("../controllers/gas_station_branch.controller");

const router = require("express").Router();

router.post("/", createGasStationBranch);
router.get("/", getGasStationBranches);
router.get("/find", getFuelTypeBrench);
router.get("/:id", getOneGasStationBranch);
router.patch("/:id", updateGasStationBranch);
router.delete("/:id", deleteGasStationBranch);



module.exports = router;
