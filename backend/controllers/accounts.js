
const Account = require('../models/account')
const UserGroup = require('../models/userGroup')
const Permission = require('../models/permission')

async function find(ctx) {
  try {
    const id = ctx.params.id
    const { group, permission } = ctx.query
    let accountQuery = Account.findById(id)
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
    const { ...account } = await accountQuery
    const { password, ...result} = account._doc
    ctx.body = result
    return ctx.body
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

async function findAll(ctx) {
  try {
    const { group, permission } = ctx.query
    let accountsQuery = Account.find({})
    if (group == 'true') {
      accountsQuery = accountsQuery.populate({
        path: 'role',
        populate: {
          path: 'permission',
          model: 'Permission',
        }
      })
    }
    if (permission == 'true') {
      accountsQuery = accountsQuery.populate('permission')
    }
    const accounts = await accountsQuery
    ctx.body = accounts.map(_account => {
      const { ...account } = _account
      const { password, ...result} = account._doc
      return result
    })
    return ctx.body
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

async function create(ctx) {
  try {
    // Tìm nhóm tài khoản "Người dùng" để gán vào tài khoản
    // mặc định một tài khoản mới lập sẽ thuộc nhóm "Người dùng"
    const userGroups = await UserGroup.find({})
    let normalId = userGroups[0]._id
    for (let index = 0; index < userGroups.length; index++) {
      if (userGroups.groupname === 'Người dùng') normalId = userGroups[index]._id
    }
    // Tạo một quyền truy cập mới tương ứng với tài khoản
    const newPermission = new Permission()
    const savedPermission = await newPermission.save()
    // Tạo tài khoản dựa vào các chỉ số nhận được từ client
    // và các chỉ số vừa tạo mới
    const newAccount = new Account({
      ...ctx.request.body,
      permission: savedPermission._id,
      role: normalId,
    })
    // Lưu lại vào cơ sở dữ liệu
    const { ...account } = await newAccount.save()
    const { password, ...result} = account._doc
    // Trả lại kết quả tài khoản cho người dùng, không trả lại trường password
    ctx.body = result
    return ctx.body
  } catch (e) {
    ctx.status = 400
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const _account = await Account.findById(id)
    const deletedPermission = await Permission.findByIdAndRemove(_account.permission)
    const { ...account } = await _account.remove()
    const { password, ...result} = account._doc
    ctx.body = result
    return ctx.body
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const { ...account } = await Account.findByIdAndUpdate(
      id,
      ctx.request.body,
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      },
    )
    const { password, ...result} = account._doc
    ctx.body = result
    return result
  } catch (e) {
    ctx.status = 500
		ctx.error = e.messsage
  }
}

module.exports = {
  find,
  findAll,
  create,
  destroy,
  update,
}
