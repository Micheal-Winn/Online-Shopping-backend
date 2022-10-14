const nodemailer = require('nodemailer')
const {config} = require("../config/config");

const sendEmail = async (option)=>
{
    const emailTransporter = nodemailer.createTransport({
        service : config.SMP_SERVICE,
        auth:{
            user:config.SMP_MAIL,
            pass:config.SMP_PASS
        }
    });
    const mailDetails = {
        from : config.SMP_MAIL,
        to:option.email,
        subject:option.subject,
        text :option.message
    }
    await emailTransporter.sendMail(mailDetails)
}

module.exports = sendEmail