const parse = require('csv-parse/lib/sync')
const stringify = require('csv/lib/sync').stringify
const fs = require('fs')
const glob = require('glob').sync

const files = glob('files/**/*.csv')
const data = []
for (const file of files) {
    const csv = parse(fs.readFileSync(file))
    const names = {}
    const result = {}
    for (const line of csv) {
        const [, key, text] = line
        const [, subId] = key.match(/_(\d+)$/) || []
        const matches = text.match(/关于.级怪物：(.*)$/)
        if (matches) {
            names[subId] = matches[1]
        }
        if (subId && subId.length === 2) {
            const group = subId[0]
            const name = names[group]
            if (name) {
                result[name] = result[name] || []
                result[name].push(text)
            }
        }
        if (subId && subId.length === 3) {
            const group = subId[1]
            const name = names[`00${group}`]
            if (name) {
                result[name] = result[name] || []
                result[name].push(text)
            }
        }
    }
    for (const k in result) {
        const v = result[k].join('\r\n')
        data.push([k, v])
    }
}

console.log('\uFEFF' + stringify(data))