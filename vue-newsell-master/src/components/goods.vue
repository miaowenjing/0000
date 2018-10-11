<template>
  <div>
    <div id="goods">
        <!-- 主要内容 -->
        <div class="menu-weapper" ref="menuWrapper">
          <div v-for="(item, index) in goods" :key="index" class="menu-item" @click="selectIndex(index, $event)" :class="{current: currentIndex === index}">
            <div class="text-wrapper border-1px">
              <span class="icon" v-if="item.type > 0" :class="classMap[item.type]"></span>
              <span class="text">{{item.name}}</span>
            </div>
          </div>
        </div>
        <div class="foods-wrapper" ref="foodWrapper">
          <ul>
            <li v-for="(items, index) in goods" :key="index" class="foods-list-hook">
              <div class="items-title">{{items.name}}</div>
              <ul>              
                <li @click="slectFood(item2, $event)" v-for="(item2, index) in items.foods" :key="index" class="items-content-wrapper">
                  <div class="item-icon">
                    <img :src="item2.icon">
                  </div>
                  <div class="items-content border-1px">
                    <div class="items-name">{{item2.name}}</div>
                    <div v-if="item2.description" class="items-description">{{item2.description}}</div>
                    <div class="ratings">
                      <span>月售{{item2.sellCount}}份</span>
                      <span>好评率{{item2.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="price">{{item2.price}}</span>
                      <span v-if="item2.oldPrice" class="oldPrice" style="margin-left:8px">{{item2.oldPrice}}</span>
                    </div>                      
                  </div>
                  <div class="cart-control-wrapper">
                    <cartcontral :food="item2"></cartcontral>
                  </div>
                </li>              
              </ul>
            </li>
          </ul>
        </div>      
        <!-- 购物车组建 -->
        <shopcart :selectFoods=selectFoods :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    </div>
    <commodity :food="selectedFood" ref="food"></commodity>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex'
import BScroll from 'better-scroll'
import shopcart from './shopcart'
import cartcontral from './cartcontral'
import commodity from './commodity'

export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      heightList: [],
      scrollY: 0,
      foods: [],
      selectedFood: {}
    }
  },
  components:{
    shopcart,
    cartcontral,
    commodity
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoicve', 'guarantee']
    axios.get('/good/goods').then(res =>{
      if(res.data.code ===0){
        this.goods = res.data.data;
        Vue.nextTick(() =>{
          //dom滑动事件
          this._initscroll()
          //计算每一个food的高度
          this._caculateHeight()
        })
      }
    })
    // axios.get('../../data.json').then(res => {
    //   console.log(res)
    // })
  },
  computed: {
    ...mapState({newfoods: state => state.foods}),
    currentIndex(){
      for(let i = 0; i < this.heightList.length; i++){
        let height1 = this.heightList[i];
        let height2 = this.heightList[i + 1];
        if(!height2 || (this.scrollY >= height1 && this.scrollY  <= height2)){
          return i;
        }
      }
      return 0
    },
    selectFoods(){
      // let foods = []
      this.foods = []
      if(this.goods.length != 0){
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if(food.count){
              // console.log(food)
              this.foods.push(food)
            }
          })
        })
      }
      this.setfood(this.foods)
      // console.log(this.newfoods)
      return this.foods
    },
  },
  methods: {
    ...mapMutations({setfood: 'countFoods'}),
    //忽略class为menu-wrapper上的better-scroll组建中的点击事件
    selectIndex($index, $event){
      if(!event._constructed){
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('foods-list-hook')
      this.foodScrool.scrollToElement(foodList[$index], 300)
      },
    //better-scroll 组建库滑动的方法
    _initscroll(){
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodScrool = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      }),
      this.foodScrool.on('scroll', (pos)=>{
        //实时滑动的y轴高度
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _caculateHeight(){
      let foodList = this.$refs.foodWrapper.getElementsByClassName('foods-list-hook')
      let height = 0;
      this.heightList.push(height)
      for(let i = 0; i < foodList.length; i++){
        let item = foodList[i]
        height += item.clientHeight
        this.heightList.push(height);
      }
    },
    slectFood(food, event){
      if(!event._constructed){
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'

  #goods
    display flex
    position absolute 
    top 174px
    bottom 48px
    left 0 
    right 0
    width 100%
    overflow hidden
    .icon
      display inline-block
      vertical-align top
      width 14px
      height 14px
      background-size 14px 14px
      &.decrease 
        bg-image('decrease_3')
      &.discount 
        bg-image('discount_3')
      &.special 
        bg-image('special_3')
      &.invoice 
        bg-image('invoice_3')
      &.guarantee 
        bg-image('guarantee_3')    
    .menu-weapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        padding 0 12px
        font-size 0
        line-height 16px
        &.current
          position relative
          margin-top -1px
          background-color #ffffff
          &:after
            border-top 1px solid #ffffff
          .text 
            font-size 12px
            line-height 14px
            font-weight 500
        .text
          font-size 12px
          line-height 14px
          font-weight 200
        .text-wrapper
          display table-cell
          vertical-align middle
          height 54px
          width 56px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1
      background-color #ffffff
      .items-title
        height 26px
        padding-left 14px
        font-size 12px
        color rgb(147, 153, 159)
        line-height 26px
        background-color #f3f5f7
        border-left 4px solid #d9dde1
      .items-content-wrapper
        display flex
        margin 18px
        padding-bottom 18px
        position relative
        border-1px (rgba(7, 17, 27, 0.1))
        &:last-child
          border-1px (rgb(255, 255, 255))
        .item-icon
          flex 0 0 57px
          height 57px
          img 
            width 57px
            height 57px
        .items-content
          flex 1
          padding 0 10px
          .items-name
            font-size 14px
            color rgb(7, 17, 27)
            line-height 14px
            margin-top 2px
          .items-description
          .ratings
            margin-top 8px
            font-size 10px
            color rgb(147, 153, 159)
            line-height 16px
          .ratings
            span 
             display inline-block
          .price
            font-size 14px
            color rgb(240, 20, 20)
            line-height 24px
            font-weight 700
          .oldPrice
            font-size 10px
            vertical-align top
            color rgb(147, 153, 159)
            font-weight 700
            line-height 20px
            text-decoration line-through
        .cart-control-wrapper
          position absolute 
          right 0
          bottom 12px
</style>