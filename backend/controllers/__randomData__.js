
const Account = require('../models/account')
const AlertGroup = require('../models/alertGroup')
const AlertMessage = require('../models/alertMessage')
const City = require('../models/city')
const Log = require('../models/log')
const LogType = require('../models/logType')
const LogCounter = require('../models/logCounter')
const UserGroup = require('../models/userGroup')
const Permission = require('../models/permission')
const ObjectId = require('mongoose').Types.ObjectId

const faker = require('faker')

async function __random__UserGroup() {
  const userGroupName = ['Người dùng', 'Điều hành viên', 'Quản trị viên']
  const UserGroupMAX = userGroupName.length
  for (let count = 0; count < UserGroupMAX; count++) {
    const newPermission = new Permission()
    const savedPermission = await newPermission.save()
    const newUserGroupData = {
      groupname: userGroupName[count],
      permission: savedPermission._id,
    }
    const newUserGroup = new UserGroup(newUserGroupData)
    const savedUserGroup = await newUserGroup.save()
    console.log(`User Group: ${count + 1}/${UserGroupMAX}`)
  }
}

async function __random__AccountUser(AccountUserMAX) {
  const _userGroupId = await UserGroup.find({})
  const userGroupId = _userGroupId.map(userGroup => userGroup._id)
  for (let count = 0; count < AccountUserMAX; count++) {
    const newPermission = new Permission()
    const savedPermission = await newPermission.save()
    const newAccountData = {
      username: faker.internet.userName(),
      password: '1',
      name: {
        first: faker.name.firstName(),
        last: faker.name.lastName(),
      },
      dateOfBirth: faker.date.past(),
      address: faker.address.city(),
      email: faker.internet.email(),
      phone: `0${faker.random.number({ min: 1000000000, max: 9999999999 })}`,
      role: ObjectId(userGroupId[Math.floor(Math.random() * Math.floor(userGroupId.length))]),
      permission: savedPermission._id,
    }
    const newAccount = new Account({
      ...newAccountData,
    })
    const savedAccount = await newAccount.save()
    console.log(`Account: ${count + 1}/${AccountUserMAX}`)
  }
}

async function __random__City() {
  const citiesData = [{
    "ip" : [
      "116.108.139.43",
      "116.111.12.7",
      "180.93.143.250"
    ],
    "name" : "TP. Hồ Chí Minh",
    "coordinates" : {
        "x" : 10.762622,
        "y" : 106.660172
    },
    "location" : "Việt Nam",
  }, {
    "ip" : [
      "2001:ee0:4b45:3180:dc82:17d6:803c:6c0b",
      "113.23.33.220",
      "27.66.87.251"
    ],
    "name" : "Đà Nẵng",
    "coordinates" : {
        "x" : 16.047079,
        "y" : 108.20623
    },
    "location" : "Việt Nam",
  }, {
    ip: [
      "42.112.236.121",
      "171.241.200.105",
      "2402:800:6135:84bb:8163:8ccb:fafd:92bb"
    ],
    name: "Hà Nội",
    coordinates: {
        "x": 21.028511,
        "y": 105.804817
    },
    location: "Việt Nam",
  }, {
    ip: [
      "171.245.88.209",
      "103.216.114.149",
      "123.26.177.107"
    ],
    name: "Hải Phòng",
    coordinates: {
        "x": 20.849996,
        "y": 106.683330
    },
    location: "Việt Nam",
  }, {
    ip: [
      "115.77.112.26",
      "125.214.49.118",
      "1.53.45.96"
    ],
    name: "Cần Thơ",
    coordinates: {
        "x": 10.03711,
        "y": 105.78825
    },
    location: "Việt Nam",
  }]
  const CityMAX = citiesData.length
  for (let count = 0; count < CityMAX; count++) {
    const newCity = new City(citiesData[count])
    const savedCity = await newCity.save()
    console.log(`City: ${count + 1}/${CityMAX}`)
  }
}

async function __random__LogType() {
  const logTypeData = [{typename:'DNS'}, {typename:'Web'}, {typename:'Authentication'}]
  const logTypeMax = logTypeData.length
  for (let count = 0; count < logTypeMax; count++) {
    const newLogType = new LogType(logTypeData[count])
    const savedLogType= await newLogType.save()
    console.log(`Log Type: ${count + 1}/${logTypeMax}`)
  }
}

async function __random__Log(LogMAX) {

  function getLogType(number) {
    if (number === 50) {
      return 2
    }
    return number % 2
  }

  function getLogData(type) {
    if (type === 'DNS') {
      return {
        datetime: faker.date.recent(3),
        c_ip: faker.internet.ip(),
        c_port: faker.random.number(99999),
        query_name: 'ocsp.digicert.com',
        query_class: 'IN',
        query_type: 'AAAA',
        query_flags: '+',
      }
    }
    if (type === 'Web') {
      return {
        datetime: faker.date.recent(3),
        s_sitename: 'W3SVC1',
        s_computername: 'WIN2008R2-TEST',
        server_ip: faker.internet.ip(),
        cs_method: 'GET',
        cs_uri_stem: '/',
        cs_uri_query: '-',
        s_port: faker.random.number(99999),
        cs_username: '-',
        c_ip: faker.internet.ip(),
        cs_version: 'HTTP/1.1',
        cs_User_Agent: 'Apache-HttpClient/4.5.5+(Java/1.8.0_191)',
        cs_cookie: '-',
        cs_referer: '-',
        cs_host: faker.internet.ip(),
        sc_status: '200',
        sc_substatus: '0',
        sc_win32_status: '0',
        sc_bytes: '936',
        cs_bytes: '116',
        time_taken: '10',
      }
    }
    if (type === 'Authentication') {
      return {
        ip: faker.internet.ip(),
        email: faker.internet.email(),
        datetime: faker.date.recent(3),
        sessionType: (Math.floor(Math.random() * Math.floor(5)) % 4 === 0 ? 'Đăng xuất' : 'Đăng nhập'),
      }
    }
  }

  const enumDateRange = {
    '0': 1000,
    '1': 60 * 1000,
    '2': 60 * 60 * 1000,
    '3': 24 * 60 * 60 * 1000,
    '4': 7 * 24 * 60 * 60 * 1000,
    '5': 30 * 24 * 60 * 60 * 1000,
  };


  const _logTypeId = await LogType.find({})
  const logTypeId = _logTypeId.map(logType => ({id: logType._id, name: logType.typename}))
  const _cityId = await City.find({})
  const cityId = _cityId.map(city => city._id)

  let lastLogCount = []
  let curLogCount = []

  for (let count = 0; count < LogMAX; count++) {
    const type = logTypeId[getLogType(Math.floor(Math.random() * Math.floor(51)))]
    const data = getLogData(type.name)
    const newLogData = {
      ip: faker.internet.ip(),
      type: ObjectId(type.id),
      city: ObjectId(cityId[Math.floor(Math.random() * Math.floor(cityId.length))]),
      data: data,
    }
    const newLog = new Log(newLogData)
    const savedLog = await newLog.save()
    curLogCount.push({
      city: savedLog.city,
      type: savedLog.type,
      groupType: -1,
      startDate: savedLog.data.datetime,
      count: 1,
    })
    console.log(`Log: ${count + 1}/${LogMAX}`)
  }

  for (let dateRange in enumDateRange) {
    lastLogCount = []
    for (let i = 0; i < curLogCount.length; i++) {
      lastLogCount.push(curLogCount[i])
      console.log(`Phrase ${dateRange} - Init: ${i + 1}/${curLogCount.length}`)
    }
    curLogCount = []
    const dateRangeNum = enumDateRange[dateRange]
    for (let i = 0; i < lastLogCount.length; i++) {
      const startDate = new Date(Math.floor(lastLogCount[i].startDate.getTime() / dateRangeNum) * dateRangeNum)
      let founded = false
      for (let j = 0; j < curLogCount.length; j++) {
        if (
          (curLogCount[j].startDate.getTime() === startDate.getTime()) &&
          (curLogCount[j].city === lastLogCount[i].city) &&
          (curLogCount[j].type === lastLogCount[i].type)
        ) {
          founded = true
          curLogCount[j].count += lastLogCount[i].count
          break
        }
      }
      if (founded === false) {
        curLogCount.push({
          city: lastLogCount[i].city,
          type: lastLogCount[i].type,
          groupType: dateRange,
          startDate: startDate,
          count: lastLogCount[i].count,
        })
      }
      console.log(`Phrase ${dateRange} - Calc: ${i + 1}/${lastLogCount.length}`)
    }
    for (let i = 0; i < curLogCount.length; i++) {
      const newLogCounter = new LogCounter({
        city: curLogCount[i].city,
        type: curLogCount[i].type,
        groupType: curLogCount[i].groupType,
        startDate: curLogCount[i].startDate,
        count: curLogCount[i].count,
      })
      const savedLogCounter = await newLogCounter.save()
      console.log(`Phrase ${dateRange} - Saved: ${i + 1}/${curLogCount.length}`)
    }
  }

}

async function __random__AlertGroup() {
  const alertGroupName = ['Tấn công brute-force', 'Tấn công DDos', 'Tấn công DoS', 'Tấn công mã độc']
  const AlertGroupMAX = alertGroupName.length
  for (let count = 0; count < AlertGroupMAX; count++) {
    const newAlertGroupData = {
      groupname: alertGroupName[count],
      groupdesc: faker.lorem.sentence(),
      popupAlert: Math.floor(Math.random() * Math.floor(2)).toString(),
      emailAlert: Math.floor(Math.random() * Math.floor(2)).toString(),
      smsAlert: Math.floor(Math.random() * Math.floor(2)).toString(),
    }
    const newAlertGroup = new AlertGroup(newAlertGroupData)
    const savedAlertGroup = await newAlertGroup.save()
    console.log(`Alert Group: ${count + 1}/${AlertGroupMAX}`)
  }
}

async function __random__AlertMessage(AlertMessageMAX) {
  const _alertGroupId = await AlertGroup.find({})
  const alertGroupId = _alertGroupId.map(alertGroup => alertGroup._id)
  for (let count = 0; count < AlertMessageMAX; count++) {
    const newAlertMessageData = {
      popupMes: faker.lorem.sentence(),
      emailMes: faker.lorem.sentence(),
      smsMes: faker.lorem.sentence(),
      sent: Math.floor(Math.random() * Math.floor(2)).toString(),
      group: ObjectId(alertGroupId[Math.floor(Math.random() * Math.floor(alertGroupId.length))])
    }
    const newAlertMessage = new AlertMessage(newAlertMessageData)
    const savedAlertMessage = await newAlertMessage.save()
    console.log(`Alert Message: ${count + 1}/${AlertMessageMAX}`)
  }
}

async function __randomData__(ctx) {

  await __random__UserGroup()
  await __random__AccountUser(20)
  await __random__City()
  await __random__LogType()
  await __random__AlertGroup()
  await __random__AlertMessage(50)
  await __random__Log(50000)

}

module.exports = {
  __randomData__,
}
