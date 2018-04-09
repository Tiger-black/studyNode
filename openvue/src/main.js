// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Store from './store'
import App from './App'
console.log(Store)
Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  el: '#main',
  data: { 
  	tit:'aaa',
  	items:Store.fetch(),
  	liclass:'111',
  	newItem:''
  },
  methods:{
  	toggleFinished:function(item){
  		item.isFinished = !item.isFinished
  	},
  	addNew:function(){
  		this.items.push({
  			lable:this.newItem,
  			isFinished:false
  		})
  		//console.log(this.items)
  		this.newItem = ''
  	}
  },
  watch:{
  	items: {
      handler: function (val, oldVal) {
      	Store.save(val);
      },
      deep: true
    }
  }
})