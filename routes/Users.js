const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  deleteUser,
  editUser,
  editUserRole,
  changePassword,
} = require("../controllers/UsersController");
const { verifyAuth, verifyAdmin } = require("../middlewares/auth/VerifyAuth");

router.route("/").get(verifyAdmin, getAllUsers);
router.put("/:id/role", verifyAdmin, editUserRole);
router
  .route("/:id")
  .get(verifyAuth, getUserById)
  .delete(verifyAuth, deleteUser)
  .put(verifyAuth, editUser);
router.put("/:id/change-password", verifyAuth, changePassword);

module.exports = router;
