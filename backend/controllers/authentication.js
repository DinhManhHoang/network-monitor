const Account = require('../models/account')
const UserGroup = require('../models/userGroup')
const Permission = require('../models/permission')

async function login(ctx) {
  try {
    const { username, password } = ctx.request.body
    const { group, permission } = ctx.query
    let accountQuery = Account.findOne({ username, password })
    if (group == 'true') {
      accountQuery = accountQuery.populate({
        path: 'role',
        populate: {
          path: 'permission',
          model: 'Permission',
        }
      })
    }
    if (permission == 'true') {
      accountQuery = accountQuery.populate('permission')
    }
    const account = await accountQuery
    if (account == null) {
      ctx.body = "Sai tài khoản hoặc mật khẩu"
    } else {
      ctx.body = account
    }
    return ctx.body
  } catch (e) {
    ctx.status = 500
  }
}

async function logout(ctx) {
  try {
    ctx.body = 'OK'
  } catch (e) {
    ctx.status = 500
  }
}

async function register(ctx) {
  try {
    const userGroups = await UserGroup.find({})
    let normalId = userGroups[0]._id
    for (let index = 0; index < userGroups.length; index++) {
      if (userGroups.groupname === 'Người dùng') normalId = userGroups[index]._id
    }
    const newPermission = new Permission()
    const savedPermission = await newPermission.save()
    const newAccount = new Account({ ...ctx.request.body, role: normalId, permission: savedPermission._id })
    const account = await newAccount.save()
    ctx.body = account
    return ctx.body
  } catch (e) {
    ctx.status = 500
  }
}

module.exports = {
  login,
  logout,
  register,
}
