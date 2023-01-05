import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'

export function unocssConfig() {
  const plugin = Unocss({
    presets: [presetUno(), presetAttributify(), presetIcons()],
  })
  return plugin
}
