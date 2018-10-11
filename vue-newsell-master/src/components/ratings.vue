<template>
  <div class="ratings">
      <div class="ratings-score border-1px">
        <div class="score-left">
          <span class="score">3.9</span>
          <span class="overall">综合评分</span>
          <span class="percentage">高于周边商家69.2%</span>
        </div>
        <div class="score-right">
          <div class="service-attitude">
            <span class="name">服务态度</span>
            <div class="star">
              <span class="on-star"></span>
              <span class="on-star"></span>
              <span class="on-star"></span>
              <span class="on-star"></span>
              <span class="off-star"></span>
            </div>
            <span class="num">3.9</span>
          </div>
          <div class="package">
            <span class="name">服务态度</span>
            <div class="star">
              <span class="on-star"></span>
              <span class="on-star"></span>
              <span class="on-star"></span>
              <span class="on-star"></span>
              <span class="off-star"></span>
            </div>
            <span class="num">4.0</span>
          </div>
          <div class="time">
            <span class="name">送达时间</span>
            <span class="time-num">44分钟</span>
          </div>
        </div>
      </div>
      <div class="rating-content" ref="ratingWrapper">
        <div class="rating-wrapper" >
          <div class="filter">
            <span class="all" @click="allBtn" :class="{'currt':all}">全部</span>
            <span class="satisfaction" @click="satisfactionBtn" :class="{'currt':satisfaction}">满意</span>
            <span class="not" @click="notBtn" :class="{'currt':not}">不满意</span>
          </div>
          <div class="aisle"  @click="hook=!hook">
            <span class="correct icon-check_circle" :class="{'hook': hook}"></span>
            <span class="aisle-title">只看有内容的评价</span>
          </div>
          <div class="evaluation-wrapper" v-for="(rating, index) in ratings" :key="index" v-show="(hook ? rating.text : true) && (rateType ||  (type ? rating.rateType : !rating.rateType) ) " >             
            <div class="evaluation-wrapper-hook" >
              <div class="avatar">
                <img :src="rating.avatar">
              </div>
              <div class="evaluation-conten">
                <div class="evaluation-hear">
                  <div class="evaluation-name">{{rating.username}}</div>
                  <div class="evaluation-time">2016-07-13 20:33</div>
                </div>                
                <div class="evaluation-star">
                  <div class="star-wrapper" >
                    <span v-for="(score, index) in rating.score" :key="index" :class="on"></span>
                    <span v-for="(score, index) in (5-rating.score)" :key="index+5" :class="off"></span>
                  </div>
                  <div class="delivery-time" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</div>
                </div>
                <div class="evaluation-detail">{{rating.text}}</div>
                <div class="evaluation-label" v-if="rating.recommend">
                  <span class="rate-type icon-thumb_up"></span>
                  <div class="label-content" >
                    <ul>
                      <li class="label-lest"  v-for="(rec, ele) in rating.recommend" :key="ele">{{rec}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>        
      </div>
      <shopcart></shopcart>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import BScroll from 'better-scroll'
import shopcart from './shopcart'

export default {
  name: 'ratings',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      ratings: [],
      on: "on",
      off: "off",
      type: undefined,
      rateType: true,
      all: true,
      satisfaction:false,
      not: false,
      hook: false
    }
  },
  components: {
    shopcart
  },
  created(){
    axios.get('/good/ratings').then(res =>{
      if(res.data.code === 0){
        this.ratings = res.data.data;
        Vue.nextTick(()=>{
          this.ratingWrapper = new BScroll(this.$refs.ratingWrapper, {
            probeType: 3,
            click: true
          })
        })
      }
    })
  },
  methods: {
    allBtn(){
      this.rateType= true; 
      this.all=true;
      this.satisfaction=false;
      this.not=false
    },
    satisfactionBtn(){
      this.type= false;
      this.rateType= false; 
      this.all=false;
      this.satisfaction=true;
      this.not=false
    },
    notBtn(){
      this.type= true ;
      this.rateType= false;
      this.all=false;
      this.satisfaction=false;
      this.not=true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'

  .ratings
    position absolute 
    top: 174px
    bottom: 48px
    left: 0
    right 0
    width: 100%
    overflow hidden
    background-color #f3f5f7

    .ratings-score
      display flex 
      width 100%
      background-color #fff
      border-1px(rgba(7, 17, 27, 0.1))
      margin-bottom 20px
      top: -1px
      z-index 1
      .score-left
        flex 0 0 137.5px
        width 137.5px
        height 100%
        padding 18px 0
        span 
          display block
          width 100%
          text-align center        
        .score
          font-size 24px
          color rgb(255, 153, 0)
          line-height 28px
        .overall
          margin-top 6px
          font-size 12px
          color rgb(7, 17, 27)
          line-height 12px
        .percentage
          margin 8px 0 6px
          font-size 10px
          color rgb(7, 17, 27)
          line-height 10px
      .score-right
        flex 1
        padding 0 24px
        line-heigh 106px
        display flex
        flex-direction column
        justify-content center
        // text-align center
        .service-attitude
        .package
          display flex
          // flex-direction column
          overflow hidden
          margin-bottom 8px
        .name
          font-size 12px
          color rgb(7, 17, 27)
          line-height 18px
        .star
          display flex
          margin 0 12px
          flex 1
          span 
            flex 1
            width 18px
            height 18px
            text-align center
            background-size 18px 18px
            &.on-star
              bg-image('star36_on')
            &.off-star
              bg-image('star36_off')
        .num
          font-size 12px
          color rgb(255, 255, 0)
          line-height 18px
        .time-num
          margin-left 12px
          font-size 12px
          color rgb(147, 153, 159)
          line-height 18px
    .rating-content
      width 100%
      height 300px
      z-index -1
      .rating-wrapper
        width 100%
        background-color #fff
        .filter
          // margin-top 20px
          margin 0 18px 
          padding 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          span 
            display inline-block
            font-size 12px
            line-height 16px
            padding 8px 12px
            margin-left 8px  
            &.currt
              color rgb(255, 255, 255)
              border-radius 1px
              background-color rgb(0, 160, 220)     
          .all
          .satisfaction
            color rgb(77, 85, 93)
            border-radius 1px
            background-color rgba(0, 160, 220, 0.2)
          .not
            color rgb(77, 85, 93)
            border-radius 1px
            background-color rgba(77, 85, 93, 0.2)
          
        .aisle
          padding 12px 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .correct
            display inline-block
            width 24px
            height 24px
            font-size 24px
            color rgb(147, 153, 159)
            line-height 24px
            margin-left 4px
            vertical-align middle
            &.hook
              color rgb(0, 160, 220)
          .aisle-title
            font-size 12px
            color rgb(147, 153, 159)
            line-height 24px
            vertical-align middle
        .evaluation-wrapper
          padding 0 18px
          // width 100%
          .evaluation-wrapper-hook
            padding 18px 0
            display flex  
            border-1px(rgba(7, 17, 27, 0.1)) 
            .avatar
              flex 0 0 28px
              width 28px
              height 28px 
              margin-right 12px
              img 
                width 28px
                height 28px
            .evaluation-conten
              flex 1
              .evaluation-hear
                display flex
                width 100%
                justify-content space-between
                margin-bottom 4px
                .evaluation-name
                  font-size 10px
                  color rgb(7, 17, 27)
                  line-height 12px
                .evaluation-time
                  font-size 10px
                  font-weight 200
                  color rgb(147, 153, 159)
                  line-height 12px
              .evaluation-star
                margin-bottom 6px
                .star-wrapper
                  margin-right 6px
                  display inline-block
                  span 
                    display inline-block
                    width 12px
                    height 12px
                    background-size 12px 12px
                    bg-image('star24_on')
                  .off
                    bg-image('star24_off')
                .delivery-time
                  display inline-block
                  font-size 10px
                  font-weight 200
                  color rgb(147, 153, 159)
                  line-height 12px
              .evaluation-detail
                margin-bottom 8px
                font-size 12px
                color rgb(7, 17, 27)
                line-height 18px
              .evaluation-label
                text-align left
                font-size 0
                overflow hidden
                display flex
                .rate-type
                  // display inline-block
                  flex 0 0 12px
                  margin-right 8px
                  font-size 12px
                  line-height 16px
                  &.icon-thumb_down
                    color rgb(183, 187, 191)
                  &.icon-thumb_up
                    color rgb(0, 160, 220)       
                .label-content
                ul
                  display inline-block  
                  vertical-align top  
                  flex 1      
                  .label-lest
                    display inline-block
                    width 40px
                    overflow hidden
                    white-space nowrap 
                    text-overflow ellipsis
                    padding 0 6px
                    margin-right 8px
                    font-size 8px
                    color rgb(147, 153, 159)
                    line-height 16px
                    border 1px solid rgba(7, 17, 27, 0.1)
                    // border-width 1px
                    // border-color rgba(7, 17, 27, 0.1)
                    border-radius 2px
                    background-color rgb(255, 255, 255)
                  
                    



</style>