<template>
  <div id="cart-control">
      <transition name="decrease">
        <span class="decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="remove"></span>
      </transition>
      <transition name="decrease">
        <span class="count" v-show="food.count > 0">{{food.count}}</span>
      </transition> 
      <span class="increase icon-add_circle" @click.stop.prevent="add"></span>
  </div>
</template>

<script>
import Vue from "vue"

export default {
  props: {
      food: {
          type: Object
      }
  },
  methods: {
      // 绑定了一个better-scroll插件
      add(event){
        //   if(event._constructed){
              if(!this.food.count){
                  Vue.set(this.food, "count")
                  this.food.count = 1
              }else{
                  this.food.count ++
              }
        //   }
      },
      remove(event){
        //   if(event._constructed){
              if(this.food.count === 0){
                  return
              }
              this.food.count -- 
          }
    //   }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
    #cart-control
        font-size 0
        .icon-remove_circle_outline, .icon-add_circle
            display inline-block
            width 24px
            height 24px
            line-height 24px
            font-size 24px
        .decrease-enter
            opacity 0
            transform translateX(136%)
        .decrease-to
            opacity 1
            transform translateX(0%)
        .decrease-enter-active
            transition all 0.6s
        .decrease-leave
            opacity 1
            transform translateX(0%)
        .decrease-leave-to
            opacity 0
            transform translateX(136%)
        .decrease-leave-active
            transition all 0.6s
        .decrease, .increase
            padding 6px
            color #00a0dc
        .count
            display inline-block
            width 12px
            text-align center
            font-size 10px
            color rgb(147, 153, 159)
            line-height 24px
            padding-top 6px
            vertical-align top
</style>
