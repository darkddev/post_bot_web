const { Platform, AdminRole } = require("../config/const");
const AccountService = require("../services/account");
const ActorService = require("../services/actor");
const DailyService = require("../services/daily");
const ScheduleService = require("../services/schedule");
const { ApiError, sendResult, sendError } = require("../utils/resp");

const handleLoadSchedules = async (req, res) => {
    try {
        const { platform, actor, page, pageSize } = req.query;
        const search = {};
        if (platform && platform != Platform.ALL)
            search.platform = platform
        if (actor)
            search.actor = actor
        const [schedules, schedulesCount] = await ScheduleService.loadSchedules(
            search,
            { page, pageSize: pageSize || "10" }
        )
        sendResult(res, { schedules, schedulesCount });
    } catch (error) {
        console.error(error);
        sendError(res, error);
    }
};

const handleCreateSchedule = async (req, res) => {
    try {
        const { actor, platform, scheduledAt, ...params } = req.body;
        const actorInst = await ActorService.findById(actor)
        if (!actorInst)
            throw new ApiError("Model does not exist");
        if (req.manager.role != AdminRole.MANAGER && actorInst.owner.toString() != req.manager._id.toString())
            throw new ApiError(`The model schedule is able to create only by owner.`)
        if (platform == Platform.ALL) {
            if (actorInst.accounts.length == 0)
                throw new ApiError(`Account for ${actorInst.name} does not exist.`);
            const schedule = await ScheduleService.createSchedule({ actor, owner: actorInst.owner, platform, scheduledAt, ...params })
            for (let account of actorInst.accounts) {
                await DailyService.createTask(account, schedule._id, scheduledAt);
            }
        } else {
            const account = await AccountService.findByActor(platform, actor)
            if (!account)
                throw new ApiError(`Account for ${platform} ${actorInst.name} does not exist.`)
            const schedule = await ScheduleService.createSchedule({ actor, owner: actorInst.owner, platform, scheduledAt, ...params })
            await DailyService.createTask(account._id, schedule._id, scheduledAt);
        }
        sendResult(res);
    } catch (error) {
        console.error(error);
        sendError(res, error);
    }
}

const handleChangeSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { scheduledAt, ...params } = req.body;
        await ScheduleService.changeSchedule(id, { scheduledAt, ...params });
        await DailyService.changeScheduledAt(id, scheduledAt);
        sendResult(res);
    } catch (error) {
        console.error(error);
        sendError(res, error);
    }
}

const handleDeleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        await DailyService.deleteBySchdule(id);
        await ScheduleService.deleteSchedule(id);
        sendResult(res);
    } catch (error) {
        console.error(error);
        sendError(res, error);
    }
}

const PostCtrl = {
    handleLoadSchedules,
    handleCreateSchedule,
    handleChangeSchedule,
    handleDeleteSchedule,
}

module.exports = PostCtrl