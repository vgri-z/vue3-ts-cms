import { App } from 'vue'

// 引用基本的组件的样式
import 'element-plus/theme-chalk/base.css'
import { ElButton, ElCalendar, ElRadio, ElForm } from 'element-plus'
const elComponents = [ElButton, ElCalendar, ElRadio, ElForm]

export default function (app: App): void {
  for (const cpn of elComponents) {
    console.log(cpn)
    app.component(cpn.name, cpn)
  }
}
