<template>
  <div class="sellers" ref="sellerWrapper">
    <div class="sellers-wrapper" >
      <div class="seller-name">
        <div class="seller-name-top">
          <div class="title">
            <div class="name">{{seller.name}}</div>
            <div class="title-content">
              <div class="star">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span class="off"></span>
              </div>
              <i>(661)</i>
              <i>月销售690单</i>
            </div>            
          </div>
          <div class="collect">
            <span class="xixi icon-favorite"></span>
            <span class="zi">已收藏</span>
          </div>
        </div>
        <div class="seller-name-content">
          <div class="content">
            <span class="heact">起送价</span>
            <span class="price">{{seller.minPrice}}元</span>
          </div>
          <div class="content">
            <span class="heact">商家配送</span>
            <span class="price">{{seller.deliveryPrice}}元</span>
          </div>
          <div class="content">
            <span class="heact">平均配送时间</span>
            <span class="price">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="seller-affiche">
        <div class="affiche-title">公告与活动</div>
        <div class="affiche-conten">{{seller.bulletin}}</div>
        <div class="affiche-slip" v-for="(item, index) in seller.supports" :key="index">
          <span class="icon bg-image" :class="classMap[item.type]"></span>
          <span>{{item.description}}</span>
        </div>
      </div>
      <div class="seller-images">
        <div class="image-title">商家实景</div>
        <div class="img" ref="imgWrapper">
          <div class="img-wrapper" >
            <img :src="img" alt="" v-for="(img, index) in seller.pics" :key="index">              
          </div>          
        </div>
      </div>
      <div class="seller-information">
        <div class="information-title">商家信息</div>
        <div class="infos" v-for="(ele,index) in seller.infos" :key="index">{{ele}}</div>
      </div>
    </div>
    <shopcart></shopcart>  
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import Vue from 'vue'
import shopcart from './shopcart'

export default {
  name: 'sellers',
  props:{
    seller: {
      type: Object
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    shopcart
  },
  created(){
    this.classMap = ['decrease', 'discount', 'special', 'invoicve', 'guarantee']
    Vue.nextTick(() => {
      this.sellersScroll = new BScroll(this.$refs.sellerWrapper)
      this.imgScroll = new BScroll(this.$refs.imgWrapper,{
        // startX:0,
        // click:true,
        scrollX:true,
        // eventPassthrough:'vertical'
      })
    })
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'

  .sellers
    position absolute 
    top 174px
    bottom 48px
    left 0
    right 0
    // width 100%
    overflow hidden
    background-color #f3f5f7
    z-index -2
    .sellers-wrapper
      // width 100%
      // max-height 445px
      .seller-name
        padding 0 18px
        background-color #ffffff
        margin-bottom 16px
        border-1px(rgba(7, 17, 27, 0.1))
        .seller-name-top
          display flex
          width 100%
          padding 18px 0
          // flex-direction column
          justify-content space-between
          border-1px(rgba(7, 17, 27, 0.1))
          .title
            flex 1
            .name
              width 100%
              font-size 14px
              color rgb(7, 17, 27)
              line-height 14px  
              padding-bottom 8px
            .title-content
              width 100%
              height 18px
              font-size 10px
              color rgb(77, 85, 93)
              line-height 18px
              .star
                margin-right 8px
                display inline-block
              span 
                display inline-block
                width 18px
                height 18px
                text-align center
                background-size 18px 18px
                bg-image('star36_on')
                &.off
                  bg-image('star36_off')
              i 
                vertical-align top
                margin-right 12px
          .collect
            display flex
            flex-direction column
            text-align center
            .xixi
              font-size 24px
              color rgb(240, 20, 20)
              line-height 24px
              margin-bottom 4px
            .zi
              font-size 10px
              color rgb(77, 85, 93)
              line-height 10px
        .seller-name-content
          display flex
          padding 18px 0
          justify-content space-between
          .content
            flex 1
            display flex
            flex-direction column
            border-right 1px solid rgba(7, 17, 27, 0.1)
            text-align center
            font-size 10px
            span 
              // display block
            .heact
              color rgb(147, 153, 159)
              line-height 10px
              margin-bottom 4px
            .price
              font-size 16px
              font-weight 200
              color rgb(7, 17, 27)
              line-height 24px
          .content:last-child
            border 0
      .seller-affiche
        background-color #ffffff
        padding 0 18px
        .affiche-title
          padding 18px 0 8px
          font-size 14px
          color rgb(7, 17, 27)
          line-height 24px
        .affiche-conten
          padding 0 12px 16px
          font-size 12px
          font-weight 200
          color rgb(240, 20, 20)
          line-height 24px
        .affiche-slip
          border-top 1px solid rgba(7, 17, 27, 0.1)
          padding 16px 12px
          span 
            display inline-block
            font-size 12px
            font-weight 200
            color rgb(7, 17, 27)
            line-height 16px
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
      .seller-images
        background-color #ffffff
        padding 18px
        margin-bottom 18px
        .image-title
          padding-bottom 12px
          font-size 14px
          color rgb(7, 17, 27)
          line-height 14px
        .img
          max-width 332px
          overflow hidden
          .img-wrapper
            display flex
            width 504px
            img 
              display inline-block
              width 120px
              height 90px
              margin-right 6px
      .seller-information
        padding: 18px
        background-color #ffffff
        .information-title
          padding-bottom 12px
          font-size 14px
          color rgb(7, 17, 27)
          line-height 14px
        .infos
          padding 16px 12px
          border-top 1px solid rgba(7, 17, 27, 0.1)
          font-size 12px
          font-weight 200
          color rgb(7, 17, 27)
          line-hieght 16px
</style>