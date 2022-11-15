const router = require("express").Router();

router.use("/auth", require("./auth.route"));
router.use("/user", require("./userRoutes"));
router.use("/kundli", require("./userKundli.routes"));
router.use("/chats", require("./chatRoutes"));
router.use("/discount", require("./discounts"));
router.use("/Conection", require("./conectionRoutes"));
router.use("/horoscope", require("./horoscopeRoutes"));
router.use("/message", require("./message.routes"));
router.use("/specification", require("./specificationRoutes"));
router.use("/admin", require("./astrologerPanel"));
router.use("/banner", require("./bannerRoutes"));
router.use("/support", require("./supportRoute"));
router.use("/adminpanel", require("./adminPanel.routes"));
// router.use("/notification", require("./usersettingRoutes"));
module.exports = router;
