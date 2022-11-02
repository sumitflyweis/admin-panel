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
router.use("/admin", require("./admin"));
router.use("/banner", require("./bannerRoutes"));
router.use("/notification", require("./usersettingRoutes"));
router.use("/adminPanel", require("./adminPanel.routes"));

module.exports = router;
