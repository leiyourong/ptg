function getA (num) {
  if (num < 36000) {
    return num * 0.03
  }

  if (num < 144000) {
    return num * 0.1 - 2520
  }

  if (num < 300000) {
    return num * 0.2 - 16920
  }

  if (num < 480000) {
    return num * 0.25 - 31920
  }
}

function getOffset(m) {
  return 4903
}

var count = 0
var already = 0
var nums = 0
var all = 0
for (var i = 1; i <= 12; i++) {
 var num = (i === 2 || i === 4) ? (30000 * (1 + 9.5 / 12 * 3)) : 30000
 var offset = getOffset(i)
 nums += (num - offset - 5000)
 var b = getA(nums)
 var c = b - already
 already = b
 var xx = num - offset - c
 all += xx
 console.log(`${i}: ${c} | ${b} | ${nums} | ${num - offset - c} | ${all}`  )
} // 181618.66 4724

