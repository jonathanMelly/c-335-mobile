// .vitepress/theme/index.js
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import PdfDownload from './PdfDownload.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-before': () => h(PdfDownload),
      'doc-footer-before': () => h(PdfDownload)
    })
  }
  // override the Layout with a wrapper component that
  // injects the slots
  //Layout: PdfLayout
}