/**
 * JS 时间格式化参数
 * 参数：格式化字符串如：'yyyy-MM-dd HH:mm:ss'
 * 结果：如2017-09-15 10:09:00
 */
export default function (date, fmt) {
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "H+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S": date.getMilliseconds()
  };
  let year = date.getFullYear().toString();
  year = year.length >= 4 ? year : '0000'.substr(0, 4 - year.length) + year;

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (year + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}