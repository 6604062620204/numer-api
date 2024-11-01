import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL, // ใช้ environment variable ในการเชื่อมต่อฐานข้อมูล
    },
  },
});

/**
 * @swagger
 * /api/root:
 *   get:
 *     summary: ดึงข้อมูล root ทั้งหมด
 *     description: ดึงข้อมูล root ทั้งหมดจากฐานข้อมูล
 *     tags:
 *       - "Root"
 */
router.get("/root", async (req, res) => {
  try {
    const alldata = await prisma.root.findMany();
    console.log(alldata);
    res.json(alldata);
  } catch (error) {
    console.error("Error fetching root data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

/**
 * @swagger
 * /api/root:
 *   post:
 *     summary: สร้างข้อมูล root ใหม่
 *     description: สร้างข้อมูล root ใหม่ลงในฐานข้อมูล
 *     tags:
 *       - "Root"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               solution:
 *                 type: string
 *               xstart:
 *                 type: number
 *               xend:
 *                 type: number
 *               equation:
 *                 type: string
 *               error:
 *                 type: number
 *                 format: float
 *               result:
 *                 type: number
 *                 format: float
 *             required:
 *               - solution
 *               - xstart
 *               - equation
 *               - error
 *               - result
 *     responses:
 *       '200':
 *         description: สร้างข้อมูล root ใหม่สำเร็จ
 *       '500':
 *         description: มีข้อผิดพลาดในการสร้างข้อมูล root ใหม่
 */
router.post("/root", async (req, res) => {
  try {
    const { solution, xstart, xend, equation, error, result } = req.body;
    const newdataroot = await prisma.root.create({
      data: {
        solution,
        xstart: Number(xstart),
        xend: xend !== undefined ? Number(xend) : null,
        equation,
        error: parseFloat(error),
        result: parseFloat(result),
      },
    });
    res.json({ newdataroot });
  } catch (error) {
    console.error("Error creating new root entry:", error);
    res.status(500).json({ error: "An error occurred while creating data" });
  }
});

/**
 * @swagger
 * /api/root/{solution}:
 *   get:
 *     summary: ดึงข้อมูล root จาก solution
 *     description: ดึงข้อมูล root ที่ตรงกับ solution ที่กำหนด
 *     tags:
 *       - "Root"
 *     parameters:
 *       - in: path
 *         name: solution
 *         required: true
 *         schema:
 *           type: string
 *         description: ชื่อของ solution ที่ต้องการดึงข้อมูล
 *     responses:
 *       '200':
 *         description: ข้อมูล root ที่ตรงกับ solution ที่ระบุ
 *       '500':
 *         description: มีข้อผิดพลาดในการดึงข้อมูล root
 */
router.get("/root/:solution", async (req, res) => {
  try {
    const { solution } = req.params;
    const roots = await prisma.root.findMany({
      where: {
        solution,
      },
    });
    res.json(roots);
  } catch (error) {
    console.error("Error fetching data for solution:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

export default router;
