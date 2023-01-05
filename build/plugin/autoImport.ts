import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export function autoImportConfig() {
  const plugin = Components({
    dts: false, //components.d.ts会自动生成 默认生成在src/
    dirs: ['src/components'],
    extensions: ['vue', 'tsx'],
    resolvers: [
      // $ant-design-prefix
      AntDesignVueResolver({
        importStyle: 'less',
        importLess: true,
      }),
    ],
  })

  return plugin
}
