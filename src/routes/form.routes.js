import { Router } from "express";
import { tandAData ,getTAndAData} from "../controllers/form.controllers.js";
const router =Router()
router.route("/add_data").post(tandAData)
router.route("/get_data").get(getTAndAData)

export default router;