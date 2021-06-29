import Vue from 'vue/dist/vue.js'

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
            links: [
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
        }
    },
    created: function() {
        console.log('initialised!')
    },
    mounted: function() {
        twemoji.parse(document.body)
    },
})