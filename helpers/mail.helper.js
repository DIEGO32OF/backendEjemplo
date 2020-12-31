
'use strict'
const nodemailer = require('nodemailer');
let config = require('./../config/general.config')


function sendMail( dest, asunto, template, attachments, cc) {
    return new Promise((resolve, rejected) => {
        //console.log("sendMail", "dest:" + dest, "asunto:" + asunto, "template:" + template, "cc:" + cc);
       // cors(request, response, () => {

            let transporter = nodemailer.createTransport({
                host: config.mail_host,
                port: config.mail_port,
                secure: config.mail_secure,
                requireTLS: config.mail_tls, // only use if the server really does support TLS

                auth: {
                    user: config.mail_user,
                    pass: config.mail_password
                }
            });
            const mailOptions = {
                from: config.mail_from,
                to: dest,
                cc: [cc],
                subject: asunto,
                html: template,
                attachments: attachments,
            };

            // returning result
            return transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return rejected(error);
                }
                return resolve(info);
            });
      //  });
    });
}

module.exports = { sendMail }