import Vue from 'vue/dist/vue.js'

let links = localStorage.getItem('links')
console.log(links)
try {
    links = JSON.parse(links)

    if(!links) {
        throw `links in null or empty`
    }
} catch(e) {
    console.warn(e)
    console.warn('links from local storage not found, resetting to defaults: ')

    links = [
        {
            href: `https://www.reddit.com/`,
            title: `reddit`,
            big: true,
        },
        {
            href: `https://twitter.com/`,
            title: `twitter`,
            big: true,
        },
        {
            href: `https://youtube.com/`,
            title: `youtube`,
            big: true,
        },
        {
            href: `https://store.steampowered.com/`,
            title: `steam store`,
        },
        {
            href: `https://www.reddit.com/r/all/`,
            title: `/r/all`,
            big: true,
        },
        {
            href: `https://www.wanikani.com/`,
            title: `wanikani`,
        },
        {
            href: `https://jisho.org/`,
            title: `jisho`,
        },
        {
            href: `https://monolith.cesque.dev/ghost`,
            title: `ghost`
        },
    ]

    localStorage.setItem('links', JSON.stringify(links))
}

for(let link of links) {
    link.dragged = false
}

let app = new Vue({
    el: '.app',
    data: function() {
        return {
            columns: 6,
            colors: [
                `#1abc9c`,
                `#2ecc71`,
                `#3498db`,
                `#8e44ad`,
                `#f1c40f`,
                `#e67e22`,
                `#e74c3c`,
                `#c0392b`,
            ],
            darkColors: [
                `#2b5775`,
                `#388574`,
                `#42558f`,
                `#503973`,
                `#9c4a3a`,
                `#a64946`,
                `#8a3f5a`,
                `#6b3056`,
            ],
            links: links,

            isSettingsVisible: false,
            dropTargetIndex: null,
            isDragging: false,
        }
    },
    watch: {
        links: function(newList, oldList) {
            // this.saveSettings()
        }
    },
    computed: {
        rows: function() {
            return Math.ceil(this.links.length / this.columns)
        },
        containerStyle: function() {
            return {
                'grid-template-columns': `1fr `.repeat(this.columns).trim(),
            }
        },
        length: function() {
            return this.links.map(link => link.big ? 2 : 1).reduce((p, c) => p + c, 0)
        },
        empty: function() {
            return this.columns - (this.length % this.columns)
        },
        randomColor: function() {
            return this.colors[Math.floor(Math.random() * this.colors.length)]
        },
        settingsLinks: function() {
            let result = []

            for(let i = 0; i < this.links.length; i++) {
                result.push({
                    type: 'drop-target',
                    index: i,
                })

                result.push({
                    type: 'link',
                    link: this.links[i],
                    index: i,
                })
            }

            result.push({
                type: 'drop-target',
                index: this.links.length,
            })

            return result
        }
    },
    methods: {
        style: function(link, index) {
            let hash = this.hash(link.href)

            // let colorIndex = this.colors[hash % this.colors.length]
            let colorIndex = index % this.colors.length

            return {
                '--color': this.colors[colorIndex],
                '--shadow': this.darkColors[colorIndex],
            }
        },
        hash: function(string) {
            return string.split('').reduce((p, c) => {
                return p + c.charCodeAt(0) + 1
            }, 0)
        },

        openSettings() {
            this.isSettingsVisible = true
        },
        closeSettings(event, force) {
            if(force || event.target == event.currentTarget) {
                this.isSettingsVisible = false
            }
        },

        settingsDragStart: function(link) {
            link.dragged = true
            setTimeout(() => {
                this.isDragging = true
            }, 0)
        },
        settingsDragEnd: function(link) {
            link.dragged = false
            this.isDragging = false

            if(this.dropTargetIndex == null) return 

            let newLink = {
                ...link
            }

            link.delete = true

            let newLinks = this.links.slice()

            newLinks.splice(this.dropTargetIndex, 0, newLink)
            this.links = newLinks.filter(item => !item.delete)
            
            this.dropTargetIndex = null
        },
        settingsDragEnter: function(event, index) {
            event.preventDefault()
        },
        settingsDragOver: function(event, index) {
            this.dropTargetIndex = index
            event.dataTransfer.dropEffect = 'move'; 
            event.preventDefault()
        },
        settingsDragLeave: function(event, index) {
            this.dropTargetIndex = null
            event.preventDefault()
        },
        settingsDragDrop: function(event) {
            // this isn't working for some reason
        },

        saveSettings() {
            console.log('saving settings');
            localStorage.setItem('links', JSON.stringify(this.links))
        },

        addBlock() {
            this.links.unshift({
                text: '',
                href: '',
                big: false,
                dragged: false,
            })
        },
        deleteBlock(index) {
            this.links.splice(index, 1);
        }
    },
    created: function() {
        console.log('initialised!')
    },
    mounted: function() {
        twemoji.parse(document.body)
    },
})