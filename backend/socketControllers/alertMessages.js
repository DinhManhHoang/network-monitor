const BROADCAST = 'ALERT_MESSAGES_CHANGED'

const AlertMessage = require('../models/alertMessage')
const Account = require('../models/account')
const nodemailer = require("nodemailer")

async function findAll() {
  try {
    let alertMessagesQuery = AlertMessage.find({})
    alertMessagesQuery = alertMessagesQuery.populate('group')
    const alertMessages = await alertMessagesQuery
    return alertMessages
  } catch (e) {
    return []
  }
}

async function update(id, data) {
  try {
    const alertMessage = await AlertMessage.findByIdAndUpdate(
      id,
      data,
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      },
    )
    return alertMessage
  } catch (e) {
    return null
  }
}

async function find(id) {
  try {
    const account = await Account.findById(id)
    return account.email
  } catch (e) {
    return null
  }
}

async function sendEmail(toEmail, emailAlert) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'devpython.dat@gmail.com',
        pass: 'dat182980'
      }
    });

    const mailOptions = {
      from: 'devpython.dat@gmail.com',
      to: toEmail,
      subject: 'Cảnh báo C500-Dashboard',
      text: emailAlert,
    };

    info = await transporter.sendMail(mailOptions)
    return info.response
  } catch(e) {
    return e.message
  }
}

module.exports = function (socket, client) {

  const myInterval = setInterval(() => {
    findAll().then(alertMessages => {
      const notSent = alertMessages.filter(alertMessage => alertMessage.sent === '0')
      if (notSent.length > 0) socket.sockets.emit(BROADCAST, { data: notSent })
      notSent.forEach((alertMessage, key) => {
        const emailAlert = alertMessage.emailMes
        alertMessage.group.accounts.forEach(accountId => {
          find(accountId).then(email => {
            if (email === null) return
            if (email.includes('dinhmanhhoang')) {
              sendEmail(email, emailAlert)
              .then((res) => {
                console.log('Response: ', res)
              })
            }
          })
        })
        update(alertMessage._id, { sent: '1' }).then(
          console.log(`${key} done`)
        )
      })
    })
  }, 60000)

  client.on('disconnect', () => {
    clearInterval(myInterval)
  })
}
