const User = require("../models/User");

const checkCooldown = async (

    req,

    res,

    next

) => {

    try {

        const user = await User.findById(

            req.user.id

        );

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found"

            });

        }

        if (

            user.cooldownActive &&

            user.cooldownEnd

        ) {

            const now = new Date();

            if (

                user.cooldownEnd > now

            ) {

                return res.status(403).json({

                    success: false,

                    cooldown: true,

                    message: "Recovery cooldown is active.",

                    cooldownEnd: user.cooldownEnd

                });

            }

            // Cooldown expired

            user.cooldownActive = false;

            user.cooldownEnd = null;

            user.sessionLosses = 0;

            await user.save();

        }

        next();

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

module.exports = checkCooldown;