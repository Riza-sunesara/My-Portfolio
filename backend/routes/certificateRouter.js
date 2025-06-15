import express from "express";
import {
  addNewCertificate,
  deleteCertificate,
  getAllCertificates,
} from "../controller/certificateController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewCertificate);
router.delete("/delete/:id", isAuthenticated, deleteCertificate);
router.get("/getall", getAllCertificates);

export default router;
