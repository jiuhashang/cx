function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  const map = {
    projectStatus
  }
  Object.keys(map).forEach((key) => {
    Vue.filter(key, map[key])
  })
}

// 项目进度
function projectStatus(status) {
  if (status === 0) {
    return '待录入'
  } else if (status === 1) {
    return '待审核'
  } else if (status === 2) {
    return '审核驳回'
  } else if (status === 3) {
    return '审核通过'
  } else if (status === 4) {
    return '施工进行中'
  } else if (status === 5) {
    return '待审核'
  } else if (status === 6) {
    return '审核驳回'
  } else if (status === 7) {
    return '审核通过'
  } else if (status === 8) {
    return '并网信息待录入'
  } else if (status === 9) {
    return '并网信息待审核'
  } else if (status === 10) {
    return '并网信息驳回'
  } else if (status === 11) {
    return '并网信息审核通过'
  }
  return '未知项目进度'
}



export default plugin
