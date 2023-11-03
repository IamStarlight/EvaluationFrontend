const Mock = require('mockjs')

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    name: '@word ',
    students: '@integer',
    teacher:'@cname',
    content: '@sentence',
  }]
})

module.exports = [
  {
    url: '/course/teacher',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          // total: items.length,
          items: items
        }
      }
    }
  }
]
