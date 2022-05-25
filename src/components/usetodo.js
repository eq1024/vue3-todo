import {ref,watchEffect} from 'vue'

const handleStorage = {
    get: (name) => {
        return localStorage.getItem(name)
            ? JSON.parse(localStorage.getItem(name))
            : []
    },
    save: (name, array) => {
        localStorage.setItem(name, JSON.stringify(array))
    }
}

export function useTodo(state) {
    let todolist = ref(handleStorage.get('vue3-todolist'))
    watchEffect(() => {
        handleStorage.save('vue3-todolist', todolist.value)
    })
    function addtodo(newtodo) {
        todolist.value.push({
            id: todolist.value.length + 1,
            title: newtodo,
            completed: false
        })
        state.newtodo=''
    }
    function deletetodo(todo) {
        todolist.value.splice(todolist.value.indexOf(todo), 1)
    }
    return { todolist, addtodo, deletetodo }
}