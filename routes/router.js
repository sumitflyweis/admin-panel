const router = require("express").Router();

router.use("/auth", require("./auth.route"));

router.use("/kundli", require("./userKundli.routes"));
router.use("/chats", require("./chatRoutes"));
router.use("/user", require("./userdetailsRoutes"));
router.use("/discount", require("./discounts"));
router.use("/Conection", require("./conectionRoutes"));
router.use("/horoscope", require("./horoscopeRoutes"));
router.use("/message", require("./message.routes"));
router.use("/specification", require("./specificationRoutes"));
router.use("/", require("./admin"));
router.use("/order", require("./admin-panel-routes/order.routes"));
router.use("/inventory", require("./admin-panel-routes/inventory.routes"));
router.use("/banner", require("./bannerRoutes"));
router.use("/dis-count", require("./admin-panel-routes/discount.route"));
router.use("/notification", require("./usersettingRoutes"));
router.use("/products", require("./admin-panel-routes/products.routes"));
router.use("/services", require("./admin-panel-routes/services.routes"));
router.use("/customers", require("./admin-panel-routes/customer.route"));
router.use(
  "/manage-category",
  require("./admin-panel-routes/manageCategory.routes")
);
module.exports = router;
