<template>
    <div>
           <section class="todoapp" >

          <!-- ******* 头部  ******** -->

        <header class="header">
            <h1>todos </h1>
            <input class="new-todo" placeholder="What needs to be done?" v-focus @keydown.enter="handleEnterKeydown">
            <!--  1. v-focus 自定义命令 文本框聚焦  2.绑定 enter 点击 任务添加函数 -->
        </header>
        <!-- This section should be hidden by default and shown when there are todos -->


              <!-- *********主体 ******** -->

        <template v-if="todos.length">
            <!-- 无数据的时候不显示 -->
            <section class="main" >
                <!-- 方法一 利用change函数 -->
                <!-- <input id="toggle-all"
                 class="toggle-all" 
                 type="checkbox"
                 @change = "handlechange"
                 :checked = "AllTageStart"> -->

                 <!-- 方法二 利用v-model 双向绑定 再调用计算属性的get 和set 方法 -->
                <input id="toggle-all"
                 class="toggle-all" 
                 type="checkbox"
                 v-model = "AllTagStart">
                <label for="toggle-all">Mark all as complete</label>


              <!--******* 任务栏 数组遍历 v-for 渲染 ********* -->

                <ul class="todo-list">   

                    <li v-for="(item,index) in filterTodos"

                    :class="{completed: item.completed,
                         editing:currentEditing === item}"
                    editing:currentEditing === item>
                        <div class="view">
                            <input class="toggle" type="checkbox"

                            v-model="item.completed"
                             checked>
                            <label
                            @dblclick = "handleEditingTodos(item)"

                            >{{ item.title}}</label>
    
                            <button class="destroy"
                            @click = "handleRemoveTodos(index,$event)"
                            ></button>
                        </div>

                       <!--  **********编辑框  ******* -->
                       <!-- 1.enter 或失去焦点 保存当前结果  2.esc 取消编辑-->
                        <input class="edit" 
                        v-bind:value="item.title"

                        @keydown.enter = "handleEditingSave(item,index,$event)"

                        @blur = "handleEditingSave(item,index,$event)"
                        
                        @keydown.esc = "handleRemoveEditing"

                        v-todos-focus = 'currentEditing === item'
                        >
                     <!-- currentEditing 在进入编辑时赋值  -->
                    </li>
                </ul>
            </section>

                <!-- ********* 状态转换显示 部分 *********** -->

                <footer class="footer" >

                    <!-- This should be `0 items left` by default -->
                    <!-- 方法一 -->
                    <!-- <span class="todo-count"><strong>{{this.todos.filter(t=>!t.completed).length}}</strong> item left</span> -->

                    <!-- 方法二 -->
                    <!-- <span class="todo-count"><strong>{{Countleftitem()}}</strong> item left</span> -->

                    <!-- 方法三  计算属性 -->
                    <span class="todo-count"><strong>{{RemainingLeftItem}}</strong> left item</span>
                    <!-- Remove this if you don't implement routing -->
                    <ul class="filters">
                        <li>
                            <a v-bind:class="{selected: filterText == ''}" href="#/">All</a>
                        </li>
                        <li>
                            <a  :class = '{selected: filterText == "active"}'  href="#/active">Active</a>
                        </li>
                        <li>
                            <a :class ='{ selected: filterText == "completed" }' href="#/completed">Completed</a>
                        </li>
                    </ul>
                    <!-- Hidden if no completed items are left ↓ -->
                    <button class="clear-completed"
                     v-if="todos.some(item=>item.completed)"
                    @click= "handleClearAlldown"    
                        >Clear completed</button>
                </footer>
        </template>


        <!-- This footer should be hidden by default and shown when there are todos -->

    </section>
     </div>
</template>

<script>
        // 监视 hash 值的变化 变化执行回调， 先初始化 执行一次保持页面刷新后原来的状态
    // handleHashchange()

    // window.onhashchange = handleHashchange

    // function handleHashchange() {

    //     app.filterText = window.location.hash.substr(2)
    // }
 const todos = [{
            id: 0,
            title: '吃饭',
            completed: true

        },

        {
            id: 1,
            title: '睡觉',
            completed: false
        },

        {
            id: 2,
            title: '敲代码',
            completed: true

        }
    ]
    export default {
    name: 'dairy',
    data(){
        return{
            //  todos: JSON.parse(window.localStorage.getItem("todos") || "[]"),
            todos,
            currentEditing: null,
            filterText: ""
        }
    },
    computed: {

            //   返回显示 未完成任务的数量   简写方式
            RemainingLeftItem() {
                return this.todos.filter(e => !e.completed).length
            },
            //  上面是计算属性的简写方式
            // RemainingLeftItem:{
                //  get 当访问的时候自动调用get（）
            //     get(){
            //         return this.todos.filter(e => !e.completed).length
            //     }
            // },
            

            //  获得toggle-all的选中状态，遍历给 任务栏的toggle 选中框
            //  实现样式关联 变化
            AllTagStart: {

                //  get 当访问的时候自动调用get（）
                get() {
                    return this.todos.every(t => t.completed)
                },

                // 当计算属性被重新赋值的时候调用set（）
                set() {
                    const checked = !this.AllTagStart
                    this.todos.forEach(item => {
                        item.completed = checked
                    })

                }
            },

            //  根据不同的状态过滤显示 该状态的任务  （active ， completed ，或是显示所有任务）
            filterTodos() {
                 
                switch (this.filterText) {
                    case "active":
                        return this.todos.filter(t => !t.completed)
                        break;
                    case "completed":
                        return this.todos.filter(t => t.completed)
                        break;
                    default:
                        return this.todos
                        break;
                }
            }
        },
    watch: {
            todos: {
                handler(val, oldVal) {

                    window.localStorage.setItem("todos", JSON.stringify(val))
                },
                deep: true

            }
        },
    methods: {

            //  添加任务栏 任务
            handleEnterKeydown(e) {
                // console.log(e.target.value);
                const value = e.target.value.trim()
                // 清除首尾空格

                const target = e.target
                    // console.log(value);

                if (!value.length) {
                    return
                }

                //获得数组todos  添加数组
                const todos = this.todos
                todos.push({
                    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
                    title: value,
                    completed: false
                })
                
                //  将todos 数组存在localStorage中
            window.localStorage.setItem('todos',JSON.stringify(todos))
                target.value = ""
                 // 清空文本框



            },
             // 根据选择框的状态 遍历 等于所有任务都同步状态
            handlechange(e) {
                const checked = e.target.checked
                this.todos.forEach(item => {
                    item.completed = checked
                })

            },
            
            //  删除
            handleRemoveTodos(index, e) {
                // console.log(index);
                this.todos.splice(index, 1)

            },
           
             // 进入编辑状态 更改 currentEditing 变量
            handleEditingTodos(todo) {
                // console.log(todo);

                this.currentEditing = todo

            },
         
            // 编辑任务栏 进行保存（判断是否为空的情况）保存后取消编辑状态 
            handleEditingSave(todo, index, e) {
                const target = e.target
                const value = target.value.trim()
                if (value.length) {
                    todo.title = value
                    this.currentEditing = null
                } else {
                    this.todos.splice(index, 1)
                }
            },
            
            // 取消编辑状态函数 
            handleRemoveEditing() {
                this.currentEditing = null
            },
   
             //  利用 filter 清楚 完成的任务 
            handleClearAlldown() {
                // console.log(123);
                // for (let i = 0; i < this.todos.length; i++) {
                //     if (this.todos[i].completed) {
                //         this.todos.splice(i, 1)
                //         i--
                //     }
                // }
                this.todos = this.todos.filter(t => !t.completed)
            },

              // 返回未完成任务的个数
            Countleftitem() {
                return this.todos.filter(e => !e.completed).length
            }
        }
    }
</script>

<style  scoped>
[v-cloak] {
            display: none;
        }
</style>
 <!-- ********* 状态转换显示 部分 *********** -->