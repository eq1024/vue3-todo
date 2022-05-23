import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import edittodo from './components/edit_com.vue'

const app = createApp(App)
app.component('edittodo', edittodo)
app.directive(
    'todofocus', {
        updated(el, { value }) {
        if (el) {
            el.focus()
        }
    }
}
)
app.mount('#app')


