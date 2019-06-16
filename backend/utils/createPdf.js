const sendEmail = async (toEmails, subject, content, html) => {
  const credentials = {
    user: 'devpython.dat@gmail.com',
    pass: 'dat182980',
    to: toEmails,
  };
  const send = await require('gmail-send')({
    user: credentials.user, // Your GMail account used to send emails
    pass: credentials.pass, // Application-specific password
    to: credentials.to,
    subject,
    text: content,
    // html: html
  });
  console.log('=======>>>> xem server co nhan chua', toEmails);
  const resss = await send({});
  return resss;
};

module.exports = sendEmail;
