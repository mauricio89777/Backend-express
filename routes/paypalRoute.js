import express from "express";
import { createOrder, captureOrder } from "../services/paypalService.js";
import { pool, connectDB } from "../config/db.js";
const router = express.Router();

router.post("/create-order", async (req, res) => {
  const { total } = req.body;
  if (!total || isNaN(total)) return res.status(400).json({ error: "Total inválido" });

  try {
    const order = await createOrder(total);
    res.json(order);
  } catch (error) {
    console.error("Error creando orden:", error.response?.data || error.message);
    res.status(500).json({ error: "Error creando orden" });
  }
});

router.post("/capture-order", async (req, res) => {
  const { orderID, usuario_id, carrito } = req.body;
  if (!orderID || !usuario_id || !Array.isArray(carrito)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  try {
    const capture = await captureOrder(orderID);
    const total = parseFloat(capture.purchase_units[0].payments.captures[0].amount.value);
    const metodo = "paypal";
    console.log("Captura de PayPal:", capture);


    console.log("Insertando en pagos...");
    const [pago] = await pool.query(
      "INSERT INTO pagos (usuario_id, total, metodo_pago, estado) VALUES (?, ?, ?, 'completado')",
      [usuario_id, total, metodo]
    );

    console.log("Pago insertado con ID:", pago.insertId);
    const pago_id = pago.insertId;

    console.log("Insertando en pedidos...");
    const [pedido] = await pool.query(
      "INSERT INTO pedidos (usuario_id, pago_id) VALUES (?, ?)",
      [usuario_id, pago_id]
    );

    console.log("Pedido insertado con ID:", pedido.insertId);

    const pedido_id = pedido.insertId;

    console.log("Insertando en detalle_pedido...");
    for (const item of carrito) {
      await pool.query(
        "INSERT INTO detalle_pedido (pedido_id, libro_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)",
        [pedido_id, item.libro_id, item.cantidad, item.precio_unitario]
      );
    }

    res.json({ mensaje: "Pago registrado correctamente", pedido_id });
    console.log("Carrito recibido:", carrito);
  } catch (error) {
    console.error("Error capturando orden:", error.response?.data || error.message);
    res.status(500).json({ error: "Error al capturar pago" });
  }
});

export default router;
