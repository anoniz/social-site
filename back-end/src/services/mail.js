const transporter = require('../services/mail/mail');


const sendVerificationEmail = async({name,host,email,token}) => {
    var mailOptions = { 
        from: 'no-reply@social-site.com',
        to: email, 
        subject: 'Account Verification Link',
        text: 'Hello '+ name +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/confirmation\/' + token + '\n\nThank You!\n'
    }
    return transporter.sendMail(mailOptions).then(result => {
        return {result};
     }).catch(err => {
        console.log(err);
        return {error:err};
     }) 
}

module.exports = {
    sendVerificationEmail
}