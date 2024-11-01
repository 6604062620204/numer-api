import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET /linear - ดึงข้อมูล linear ทั้งหมด
router.get("/linear", async (req, res) => {
  try {
    const alldata = await prisma.linear.findMany();
    res.json(alldata);
  } catch (error) {
    console.error("Error fetching linear data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

// POST /linear - สร้างข้อมูล linear ใหม่
router.post("/linear", async (req, res) => {
  try {
    const { solution, matrixA, matrixB, equation } = req.body;
    const newdatalinear = await prisma.linear.create({
      data: {
        solution: solution,
        matrixA: matrixA,
        matrixB: matrixB,
        equation: equation,
      },
    });
    res.json({ newdatalinear });
  } catch (error) {
    console.error("Error creating new linear entry:", error);
    res.status(500).json({ error: "An error occurred while creating data" });
  }
});

// GET /linear/:solution - ดึงข้อมูล linear ที่ตรงกับ solution ที่ระบุ
router.get("/linear/:solution", async (req, res) => {
  try {
    const { solution } = req.params;
    const data = await prisma.linear.findMany({
      where: {
        solution: solution,
      },
    });
    res.json(data);
  } catch (error) {
    console.error("Error fetching data for solution:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

export default router;
