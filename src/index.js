const path = require('path')
const homedir = require('os').homedir();
const archiver = require('hypercore-archiver')
const swarm = require('hypercore-archiver/swarm')
const bswarm = require('bencevans-swarm')
const ar = archiver(path.resolve(homedir, '.homecore'))
const sw = swarm(ar);
const bsw = bswarm(ar)

(process.env.CORES || '')
    .split(',')
    .filter((feedKey) => {
        return typeof feedKey === 'string' && feedKey.length === 64
    })
    .forEach(feedKey => {
    console.log('feedKey: ', feedKey)
    ar.add(Buffer.from(feedKey, 'hex'))
})

ar.on('sync', function (feed) {
    console.log('feed is synced', feed.key)
})
