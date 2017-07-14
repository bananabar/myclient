function formatTime(date) {
  return date.substr(0, 10)
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function paixubytime(data) {
  for (var i = 0; i < data.length - 1; i++) {
    var longstr1 = data[i].CreateDate.replace("-", "");
    longstr1 = longstr1.replace(":", "")
    longstr1 = longstr1.replace("T", "")
    for (var j = i + 1; j < data.length; j++) {
      var longstr2 = data[i].CreateDate.replace("-", "");
      longstr2 = longstr2.replace(":", "")
      longstr2 = longstr2.replace("T", "")
      if (longstr1>longstr2) {
        var temp = data[i]
        data[i] = data[j]
        data[j] = temp
      }
    }
  }
  return data
}

module.exports = {
  formatTime: formatTime,
  paixubytime: paixubytime
}

