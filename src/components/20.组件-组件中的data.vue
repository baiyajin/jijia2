<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getData">getMaterialClass</button>
  </div>
</template>

<script>



  export default {
    name: 'bai20',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods:{

      getData(){


        this.$axios.post('/PageMaterialClassController/getMaterialClass',{}).then(res => {
          console.log(typeof res)//object
          console.log(res)//Object {data: Array[2], status: 200, statusText: "OK", headers: Object, config: Object…}
          console.log(res.data)//[Object, Object]
          console.log(res.data[0])//Object {id: "1", name: "钢材", statusID: "0", createTime: "2019-04-11T09:48:40.000+0000", updateTime: "2019-04-11T09:48:40.000+0000"}
        }).catch(err => {
          console.log(typeof err)
        })

        /*this.$http.post('/PageMaterialClassController/getMaterialClass',{})
          .then(function (response) {
            console.log(1)
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })*/



      }




  }
  }
</script>
