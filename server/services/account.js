const { Platform } = require("../config/const");
const AccountModel = require("../models/account");

const loadAccounts = (platform, { page, pageSize }) =>
  Promise.all([
    AccountModel.find({ platform })
      .sort("number")
      .skip((parseInt(page) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize))
      .populate("actor", "name"),
    AccountModel.countDocuments({ platform })
  ])


const createAccount = (
  platform,
  actor,
  { alias, email, password, discord, description }
) =>
  AccountModel.create({
    platform,
    actor: actor._id,
    number: actor.number,
    alias,
    email,
    password,
    discord,
    description,
    params: platform == "F2F"
      ? {
        commentInterval: 10,
        notifyInterval: 10,
        postOffsets: [1, 21, 51],
        recent: false,
        uploaded: false,
        debug: false,
      } : undefined
  });

const updateAccount = (
  id,
  actor,
  { alias, email, password, discord, description }
) =>
  AccountModel.findByIdAndUpdate(id, {
    $set: {
      actor: actor._id,
      number: actor.number,
      alias,
      email,
      password,
      discord,
      description,
    },
  });

const setStatus = (id, status) =>
  AccountModel.findByIdAndUpdate(id, { $set: { status } });

const clearError = (id) => AccountModel.findByIdAndUpdate(id, { $set: { lastError: "" } })

const deleteAccount = (id) =>
  AccountModel.findByIdAndDelete(id);

const findById = (id) =>
  AccountModel.findById(id);

const getCount = () =>
  Promise.all([
    AccountModel.countDocuments({ platform: Platform.F2F })
  ]);

const updateParams = async (accountId, { commentInterval, notifyInterval, debug, postOffsets }) => {
  const res = await AccountModel.findByIdAndUpdate(accountId, {
    $set: {
      "params.commentInterval": commentInterval,
      "params.notifyInterval": notifyInterval,
      "params.debug": debug,
      "params.postOffsets": postOffsets,
    }
  });
  return res;
}

const syncContents = (actorId) =>
  AccountModel.updateMany({ actor: actorId }, { $set: { "params.uploaded": false, "params.recent": false } })

const setAllStatus = (platform, status) =>
  AccountModel.updateMany({ platform }, { $set: { status } })

const findByActor = (platform, actorId) =>
  AccountModel.findOne({ platform, actor: actorId });

const AccountService = {
  loadAccounts,
  createAccount,
  updateAccount,
  setStatus,
  deleteAccount,
  findById,
  findByActor,
  getCount,
  updateParams,
  syncContents,
  clearError,
  setAllStatus
};

module.exports = AccountService;
