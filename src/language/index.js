import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    //默认语言
    locale: 'ch',
    messages: {
        ch: require("./ch.js"),
        en: require("./en.js"),
    },
})

export default i18n;