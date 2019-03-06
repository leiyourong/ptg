var result = []
for (let index = 0; index < 1000000; index++) {
  result.push(Math.random() * 1000000)
}
result.sort()
result = result[Math.floor(result.length / 2)]
postMessage(result)
