import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  UpdateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user you logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user you logged in you can delete your account");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin you logged in you can delete all account");
// });

//UPDATE
router.put("/:id", verifyUser, UpdateUser);
//DELETE
router.delete("/:id", verifyUser, deleteUser);
//GET
router.get("/:id", verifyUser, getUser);
//GETALL
router.get("/", verifyAdmin, getUsers);

export default router;
