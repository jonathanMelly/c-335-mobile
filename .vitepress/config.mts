import {glob} from 'glob';
import * as path from 'path';
import fg from 'fast-glob'
import fs from 'node:fs/promises'
import {dirname} from 'node:path'
import {withMermaid} from "vitepress-plugin-mermaid";
import taskLists from 'markdown-it-task-lists'
import {full as emoji} from 'markdown-it-emoji'

process.env.VITE_EXTRA_EXTENSIONS = 'docx,zip,pptx'

// https://vitepress.dev/reference/site-config
export default withMermaid({
    lang: 'fr-CH',
    title: "ICT-335",
    description: "Programmation mobile",
    head: [
        ['link', {rel: "icon", href: "logo.svg"}],
    ],
    srcExclude: ['slides/images/**','slides/*.md'],

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: 'logo.svg',
        nav: [
            {text: 'Accueil', link: '/'},
            {text: 'Actuellement', link: '/echeances.html'},
            {text: 'Thématiques', link: '/thematiques/README.html'},
            {text: 'Supports', link: '/supports/README.html'},
            //{text: 'Activités', link: '/activites/'}
        ],
        outline: {label: "Sur cette page",level:[1,4]},
        docFooter: {prev: "Précédent", next: "Suivant"},
        returnToTopLabel: "Retourner au début",
        lastUpdated: {
            text: 'Dernière mise à jour',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'short'
            }
        },
        sidebar: {
            '/': [
                {
                    text: 'Thématiques',
                    collapsed:
                        false,
                    items:
                        glob.sync('thematiques/**/*.md', {ignore: '*/**README.md', posix: true})
                            .map(file => ({
                                text: `${path.basename(file).replace(".md", "")}`,
                                link: `/${file}`
                            })).reverse()
                }]
            , '/supports/': [
                {
                    text: 'Supports',
                    collapsed:
                        false,
                    items:
                        glob.sync('supports/**/*.md', {ignore: '*/**README.md', posix: true})
                            .map(file => ({
                                text: `${path.basename(file).replace(".md", "")}`,
                                link: `/${file}`
                            })).reverse()
                }]
            , '/activites/': [
                {
                    text: 'Activités',
                    collapsed:
                        true,
                    items:
                        glob.sync('activites/**/README.md', {posix: true})
                            .map(file => ({
                                text: `${file.split("/")[1]}`,
                                link: `/${file}`
                            })).reverse()
                }
            ],

        },
        search: {
            provider: 'local',
            options: {
                translations: {
                    button: {buttonText: "Rechercher", buttonAriaLabel: "Rechercher"},
                    modal: {
                        displayDetails: "Voir les détails",
                        footer: {selectText: "Valider", closeText: "Fermer", navigateText: "Pour naviguer"}
                    },
                }
            }
        },

        socialLinks: [
            {icon: 'github', link: 'https://github.com/jonathanMelly/msig24'}
        ]
    },
    base: "/c-335-mobile/",//for gh pages
    rewrites: {
        'README.md': 'index.md',
    },
    lastUpdated: true,
    markdown: {
        math: true,
        config: (md) => {
            md
                .use(taskLists)
                .use(emoji)
        }
    },
    async buildEnd({srcDir: src, outDir: dest}) {
        //Copy other assets...
        const files = await fg(['**/*', '!**/*.md'], {cwd: src, absolute: true})
        await Promise.all(
            files.map(async (file) => {
                const destFile = file.replace(src, dest)
                await fs.mkdir(dirname(destFile), {recursive: true})
                await fs.copyFile(file, destFile)
            })
        )
    },
    mermaid: {
        // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
    },
    /*ignoreDeadLinks: [
        /\.docx$/,
    ]*/
    /*vite: {
        //optimizeDeps: { include: ['dayjs','@braintree/sanitize-url','debug'] },
        resolve: {
            alias: {
                dayjs: 'dayjs/'
            },
        },
    },*/
});



