const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/** 
 * 时间戳转化为年 月 日 时 分 秒 
 * number: 传入时间戳 
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 
*/
function timestampToDayString(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  var returnArr = []

  var date = new Date(number * 1000)
  returnArr.push(date.getFullYear())
  returnArr.push(formatNumber(date.getMonth() + 1))
  returnArr.push(formatNumber(date.getDate()))

  returnArr.push(formatNumber(date.getHours()))
  returnArr.push(formatNumber(date.getMinutes()))
  returnArr.push(formatNumber(date.getSeconds()))

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}

/**
 * 分类转换
 */
const traverse = function (array) {
  let m = [];
  array.forEach(item => {
    if (item.parent_id === 0 && item.children.length === 0) {
      let t = {
        value: item.id,
        label: item.name,
        type: item.type
      };
      m.push(t)
    }
    if (item.children.length > 0) {
      let c = {
        value: item.id,
        label: item.name,
        type: item.type,
        children: []
      }
      item.children.forEach(value => {
        let k = {
          value: value.id,
          label: value.name,
          type: value.type
        }
        c.children.push(k)
      })
      m.push(c)
    }
  })

  return m
}

/**
 * 判断空对象
 */
function isEmptyObject(e) {

  var t;

  for (t in e)

    return !1;

  return !0

}

/**
 * 形成一棵树
 */
const convertTree = function(tree) {
  const result = [];
  tree.forEach(item => {
    // 解构赋值并重命名
    let { id: value, name: label, all_children: children } = item
    // 如果有子节点，递归
    if (children) {
      children = this.convertTree(children)
    }
    result.push({ value, label, children })
  });
  return result
}



module.exports = {
  formatTime: formatTime,
  timestampToDayString: timestampToDayString,
  traverse: traverse,
  isEmptyObject: isEmptyObject,
  convertTree: convertTree
}
