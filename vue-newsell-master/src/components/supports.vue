<template>
  <div class="supports">
    <div class="header-wrapper">
        <div class="header-title">{{seller.name}}</div>
        <div class="header-star">
            <span class="on"></span>
            <span class="on"></span>
            <span class="on"></span>
            <span class="on"></span>
            <span></span>
        </div>
    </div>
    <div class="content">
        <div class="information" v-if="seller.supports">
            <div class="information-title">
                <span class="line"></span>
                <span class="title">优惠信息</span>
                <span class="line"></span>
            </div>
            <div class="discount-information" >
                <div class="discount-wrapper" v-for="(item, index) in seller.supports" :key="index">
                    <span class="icon bg-image" :class="classMap[item.type]"></span>
                    <span>{{item.description}}</span>
                </div>
            </div>
        </div>
        <div class="merchant-announcement" v-if="seller.bulletin">
            <div class="merchant-title">
                <span class="line"></span>
                <span class="title">商家公号</span>
                <span class="line"></span>
            </div>   
            <div class="merchant-content">{{seller.bulletin}}</div>
        </div>
    </div>
    <div class="shutDown icon-close" @click="val"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'supports',
  props:{
      seller: {
          type: Object
      }
  },
  data () {
    return {
        mag: 'dsfadsf'
    }
  },
  created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoicve', 'guarantee']
  },
  methods: {
      val(){
          this.$store.commit('changeTarget', false);
          console.log(888)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../assets/stylus/index.styl'
    .supports
        display flex
        flex-direction column
        width 100%
        .header-wrapper
            width 100%
            height 148px
            text-align center
            .header-title
                width 100%
                height 16px
                margin-top 64px
                font-size 16px
                font-weight 700
                color rgb(255, 255, 255)
                line-height 16px
            .header-star
                // display flex
                width 100%
                margin 16px 0 28px
                line-height 24px
                span 
                    padding 0 6px
                    display inline-block
                    width 24px
                    height 24px
                    background-size 24px 24px
                    bg-image('star48_off')  
                .on
                    bg-image('star48_on')
        .content
            flex 1
            padding 0 36px
            .information,
            .merchant-announcement
                width 100%
                .information-title
                .merchant-title
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    span    
                        display inline-block
                    .line
                        width 112px
                        border 1px solid rgba(255, 255, 255, 0.2)
                        vertical-align middle
                    .title
                        padding 0 12px
                        font-size 16px
                        font-weight 700
                        color #ffffff
                        line-height 16px
                .discount-information
                    width 100%
                    padding 24px 12px 28px
                    .discount-wrapper
                        height 16px
                        line-height 16px
                        margin-bottom 12px
                        font-size 12px
                        font-weight 200
                        color #ffffff
                        span 
                            display inline-block
                    .icon
                        vertical-align middle
                        width 16px 
                        height 16px
                        background-size 16px 16px
                        &.decrease 
                            bg-image('decrease_1')
                        &.discount 
                            bg-image('discount_1')
                        &.special 
                            bg-image('special_1')
                        &.invoicve  
                            bg-image('invoice_1')
                        &.guarantee 
                            bg-image('guarantee_1') 
                .merchant-content
                    padding 24px 12px 0
                    font-size 12px
                    font-weight 200
                    color rgb(255, 255, 255)
                    line-height 24px
        .shutDown
            width 100%
            height 32px
            padding-bottom 32px
            font-size 32px
            color rgba(255, 255, 255, 0.5)
            text-align center
</style>
