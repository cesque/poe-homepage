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
                    href: `https://www.reddit.com/r/pathofexile`,
                    title: `path of exile reddit`,
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
                    href: `https://www.pathofexile.com/forum/view-forum/news`,
                    title: `poe official forum: announcements`,
                },
                {
                    href: `https://www.craftofexile.com/`,
                    title: `craftofexile`,
                },
                {
                    href: `https://poedb.tw/`,
                    title: `poedb.tw`,
                },
                {
                    href: `https://www.youtube.com/watch?v=cUY6jgZ0zic&t=12s`,
                    title: `detonate dead build`,
                    big: true,
                },
                {
                    href: `https://www.pathofexile.com/forum/view-thread/2839382`,
                    title: `flicker strike build`,
                    big: true,
                },
                {
                    href: `https://poe-leveling.netlify.app/`,
                    title: `poe leveling guide`,
                },
                {
                    href: `https://www.pathofexile.com/trade/search/Ritual`,
                    title: `poe trade`,
                    big: true,
                },
                {
                    href: `https://www.pathofexile.com/trade/exchange/Ritual`,
                    title: `poe bulk trade`,
                },
                {
                    href: `http://siveran.github.io/calc.html`,
                    title: `vorici chromatic calculator`,
                },
                {
                    href: `https://poe.ninja/`,
                    title: `poe.ninja`,
                    big: true,
                },
                {
                    href: `https://filterblade.xyz/`,
                    title: `filterblade`,
                },
                {
                    href: `https://pathofexile.gamepedia.com/`,
                    title: `poe wiki`,
                },
                {
                    href: `https://www.poelab.com/`,
                    title: `poelab`,
                },
                {
                    href: `https://www.poelab.com/syndicate-cheatsheet/`,
                    title: `poelab syndicate cheatsheet`,
                },
                {
                    href: `https://wraeclast.com/wp-content/uploads/2020/09/reward_table.jpg`,
                    title: `heist rewards`,
                },
                {
                    href: `https://pathofexile.gamepedia.com/List_of_cluster_jewel_notable_passive_skills`,
                    title: `poe wiki list of cluster jewel notables`,
                },
                {
                    href: `https://poe-antiquary.xyz/`,
                    title: `poe antiquary (historic prices)`,
                },
                {
                    href: `https://www.reddit.com/r/pathofexile/comments/hbmims/guide_stepbystep_visual_guide_on_atlas/`,
                    title: `atlas progression guide`,
                },
                {
                    href: `https://poeprofit.com/`,
                    title: `poe profit`,
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