const {
  createUser,
  getUser,
  findByName,
  getOneUser,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");

const {
  registerSchema,
  loginSchema,
} = require("../validation/user.validation")

const router = require("express").Router();

router.post("/", createUser);
router.get("/", getUser);
router.get("/find", findByName);
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);  
  
module.exports = router;
