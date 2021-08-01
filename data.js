const fs = require("fs")
let Series = ['StrangerThings', 'DeathNote', 'Friends','Elite','Riverdale']


const getEpisodes = (season, series) => {
    let episode = []
    const Ep = fs.readdirSync(`D:/Video File/Series/${series}/${season}`)
    for (i of Ep) {
        episode.push({
            'name': `${i}`,
            'series': `${series}`,
            'season': `${season}`,
            'link':`D:/Video File/Series/${series}/${season}/${i}`
        })
    }
    return episode
}

const getSeasons = (str) => {
    const season = fs.readdirSync(`D:/Video File/Series/${str}`)
    for (let i of season) {
        return getEpisodes(i, str)

    }
}

let arr = [] 
for (let i = 0; i < Series.length; i++) {
    arr.push(
   getSeasons(Series[i]))
}
console.log(arr)
module.exports = arr;
