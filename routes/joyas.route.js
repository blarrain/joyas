import { Router } from "express";
import { joyasController } from "../src/controllers/joyas.controller.js";

const router = Router()

router.get('/', joyasController.getAllJoyas)

router.get('/filter', joyasController.getFilteredJoyas)

export default router