import { Router } from "express";
import authRoutes from "../modules/auth/auth.route.js";
import dashboardRoutes from "../modules/dashboard/dashboard.route.js";
import orderRoutes from "../modules/orders/order.route.js";
import menuItemRoutes from "../modules/menu-items/menu-item.route.js";
import offerRoutes from "../modules/offers/offer.routes.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/auth", authRoutes);

router.use(authMiddleware);
router.use("/dashboard", dashboardRoutes);
router.use("/orders", orderRoutes);
router.use("/menu-items", menuItemRoutes);
router.use("/offers", offerRoutes);

export default router;