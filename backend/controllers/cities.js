const City = require('../models/city')

async function find(ctx) {
  try {
    const id = ctx.params.id
    const city = await City.findById(id)
    ctx.body = city
    return city
  } catch (e) {
    ctx.status = 500
  }
}

async function findAll(ctx) {
  try {
    const citys = await City.find({})
    ctx.body = citys
    return citys
  } catch (e) {
    ctx.status = 500
  }
}

async function create(ctx) {
  try {
    const newCity = new City(ctx.request.body)
    const savedCity = await newCity.save()
    ctx.body = savedCity
    return savedCity
  } catch (e) {
    ctx.status = 400
  }
}

async function destroy(ctx) {
  try {
    const id = ctx.params.id
    const city = await City.findById(id)
    const deletedCity = await city.remove()
    ctx.body = deletedCity
    return deletedCity
  } catch (e) {
    ctx.status = 500
  }
}

async function update(ctx) {
  try {
    const id = ctx.params.id
    const result = await City.findByIdAndUpdate(
      id,
      ctx.request.body,
      {
        runValidators: true,
        new: true,
        useFindAndModify: false,
      },
    )
    ctx.body = result
    return result
  } catch (e) {
    ctx.status = 500
  }
}

module.exports = {
  find,
  findAll,
  create,
  destroy,
  update,
}
