
const UserSetting = require('../models/userSetting')

module.exports.UserSettings = async (req, res) => {
    let { UserId, ActiveNotification } = req.body;

    try {
        if (!(UserId && ActiveNotification)) {
            res.json({ message: "All fields are required", status: false });
        } else {

            const SettingUser = await  UserSetting.findOne({ UserId });
            if (! SettingUser) {
                const NewUserSetting = await UserSetting.create({ UserId, ActiveNotification });
                if (NewUserSetting) res.status(200)({ message: "UserSetting Updated", data: NewUserSetting, status: true, });
                res.status(400).json({ message: "Usersetting  not Updated", status: false });
            } else {
                const UpdateUserSetting = await UserSetting.findOneAndUpdate({ UserId }, { ActiveNotification });
                if (UpdateUserSetting) res.status(200).json({ message: "UserSetting Updated", data: UpdateUserSetting, status: true, });
                res.status(400).json({ message: "Usersetting  not Updated", status: false });
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message, status: false });
    }
};




