import { defineConfig, presetIcons, presetWind4 } from 'unocss'
import extractorPug from '@unocss/extractor-pug'

export default defineConfig({
  presets: [presetIcons(), presetWind4()],
  extractors: [extractorPug()],
})
