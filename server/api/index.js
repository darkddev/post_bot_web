const express = require("express");
const multer = require('multer')
const path = require('path')
const { v4: uuidv4 } = require("uuid")

const imageStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = uuidv4();
    cb(null, fileName + path.extname(file.originalname))
  }
})
const imageUpload = multer({ storage: imageStorage })

const authenticate = require("../middleware/auth.js");
const ActorCtrl = require("../controllers/actor.js");
const AccountCtrl = require("../controllers/account.js");
const DiscordCtrl = require("../controllers/discord.js");
const DashboardCtrl = require("../controllers/dashboard.js");
const ProxyCtrl = require("../controllers/proxy.js");
const ManagerCtrl = require("../controllers/manager.js");
const CommentCtrl = require("../controllers/comment.js");
const HistoryCtrl = require("../controllers/history.js");
const ScheduleCtrl = require("../controllers/schedule.js");
const checkManager = require("../middleware/manager.js");

const router = express.Router();

router.route("/proxy")
  .all(authenticate)
  .get(ProxyCtrl.handleLoadProxies)
  .post(ProxyCtrl.handleAddProxies)
  .put(ProxyCtrl.handleChangeProxyStatus)
  .delete(ProxyCtrl.handleClearProxies);

router.route("/proxy/:id")
  .all(authenticate)
  .put(ProxyCtrl.handleSetProxyStatus)
  .delete(ProxyCtrl.handleDeleteProxy);


router.route("/discord")
  .all(authenticate, checkManager)
  .get(DiscordCtrl.handleLoadDiscords)
  .post(DiscordCtrl.handleCreateDiscord)
  .delete(DiscordCtrl.handleDeleteDiscord)

router.route("/discord/:id")
  .all(authenticate, checkManager)
  .post(DiscordCtrl.handleAppendActor)
  .put(DiscordCtrl.handleUpdateDiscord)
  .delete(DiscordCtrl.handleRemoveActor)

// router.route("/setting")
//   .all(authenticate)
//   .get(SettingCtrl.handleLoadSetting)
//   .post(SettingCtrl.handleUpdateSetting)

router.route("/manager")
  .all(authenticate, checkManager)
  .get(ManagerCtrl.handleLoadManagers)
  .post(ManagerCtrl.handleCreateManager)
  .put(ManagerCtrl.handleResetPassword)
  .delete(ManagerCtrl.handleDeleteManager);
  
router.route("/manager/:id")
  .all(authenticate, checkManager)
  .put(ManagerCtrl.handleUpdateManager)
  .post(ManagerCtrl.handleChangeStatus);

router.route("/auth")
  .post(ManagerCtrl.handleLoginManager)
  .put(ManagerCtrl.handleChangePassword)
  .get(authenticate, ManagerCtrl.handleReloadManager)

router.route("/stats")
  .all(authenticate)
  .get(DashboardCtrl.handleGetStats)

router
  .route("/all/:platform")
  .all(authenticate)
  .post(AccountCtrl.handleAllStart)
  .put(AccountCtrl.handleAllStop)

router
  .route("/all")
  .all(authenticate)
  .get(ActorCtrl.handleLoadAllModels)

router
  .route("/actor")
  .all(authenticate)
  .get(ActorCtrl.handleLoadActors)
  .post(ActorCtrl.handleCreateActor)

router
  .route("/actor/:actorId")
  .all(authenticate)
  .put(ActorCtrl.handleUpdateActor)
  .post(ActorCtrl.handleUpdateProfile)
  .delete(ActorCtrl.handleDeleteActor);

router
  .route("/contents/:actorId")
  .all(authenticate)
  .get(ActorCtrl.handleGetContent)
  .post(ActorCtrl.handleAppendContent)
  .put(ActorCtrl.handleSyncContents)
  .delete(ActorCtrl.handleClearContents);

router
  .route("/content/:actorId/:contentId")
  .all(authenticate)
  .put(ActorCtrl.handleUpdateContent)
  .delete(ActorCtrl.handleDeleteContent);

router
  .route("/account/:platform")
  .all(authenticate)
  .get(AccountCtrl.handleLoadAccounts)
  .put(AccountCtrl.handleUpdateStatus)
  .post(AccountCtrl.handleCreateAccount);

router
  .route("/account/:platform/:id")
  .all(authenticate)
  .put(AccountCtrl.handleUpdateAccount)
  .post(AccountCtrl.handleUpdateParams)
  .delete(AccountCtrl.handleDeleteAccount);

router
  .route("/history/:platform/:id")
  .all(authenticate)
  .get(AccountCtrl.handleLoadHistory)
  .post(AccountCtrl.handleClearError)
  .delete(AccountCtrl.handleClearHistory);


router
  .route("/comment")
  .all(authenticate)
  .get(CommentCtrl.handleLoadComments)
  .post(CommentCtrl.handleCreateComment)
  .delete(CommentCtrl.handleClearComments);

router
  .route("/comment/:id")
  .all(authenticate)
  .delete(CommentCtrl.handleDeleteComment);

router
  .route("/history/:accountId")
  .all(authenticate)
  .get(HistoryCtrl.handleLoadHistories);

router.route("/schedule")
  .all(authenticate)
  .get(ScheduleCtrl.handleLoadSchedules)
  .post(ScheduleCtrl.handleCreateSchedule)

router.route("/schedule/:id")
  .all(authenticate)
  .put(ScheduleCtrl.handleChangeSchedule)
  .delete(ScheduleCtrl.handleDeleteSchedule)

router.route("/upload")
  .post(imageUpload.single('file'), (req, res) => { res.json({ file: req.file.filename }) })

module.exports = router;
