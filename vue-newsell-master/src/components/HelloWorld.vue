<template>
  <div class="wrapper">
    <i class="icon-arrow_lift">dsaffffff</i>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    axios.get('/good/seller').then(
      res => {
        if(res.data.code === 0){
          console.log(res.data.data);
        }
      }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../static/style.css';
</style>
