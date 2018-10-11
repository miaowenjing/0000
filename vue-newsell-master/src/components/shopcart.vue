<template>
    <div>
        <div class="shopcart">
            <div class="content">
                <div class="chatr-icon-wrapper">
                    <div class="chart-icon icon-shopping_cart" :class="{noZChart: totalCount != 0}" @click="fold = !fold"></div>
                    <div class="total-count" v-show="totalCount != 0">{{totalCount}}</div>
                </div>
                <div class="deliver-fee">
                    <div class="price border-1px-right" :class="{noZpice: totalPrice != 0}">￥{{totalPrice}}</div>
                    <div class="deliveryPrice">配送费￥{{deliveryPrice}}元</div>
                </div>
                <div @click="base" class="deliver-base" :class="{ok: totalPrice >= minPrice}">{{inform}}</div>
            </div>
            <div class="cart-list-wrapper" v-show="showList">
                <div class="cart-gray"  @click="fold = !fold"></div>
                <div class="cart-list" >
                    <div class="cart-list-header">
                        <span class="cart-title">购物车</span>
                        <span class="clear" @click="clearBtn">清空</span>
                    </div>
                    <div class="food-item-wrapper" ref="foodWrapper">
                        <ul>
                            <li class="food-item" v-for="(food, index) in newfoods" :key="index">
                                <span class="food-title">{{food.name}}</span>
                                <span class="food-prict">￥{{food.price}}</span>
                                <cartcontral class="cart-control" :food=food></cartcontral>
                            </li>                    
                        </ul>                  
                    </div>
                </div>
            </div>
            <!-- <div class="cart-gray"  @click="fold = !fold"></div> -->
        </div>
        <div v-show="flag" class="stretch">
            <div class="stretch-conten">
                <div class="stretch-wrapper">
                    <div class="hear">
                        <span class="lt">提示</span>
                        <span @click="close" class="icon-close"></span>                        
                    </div>
                    <div class="title">{{title}}</div>
                    <div class="judgment">
                        <div class="yes" @click='yes'>是</div>
                        <div class="no" @click='no'>不是</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cartcontral from "./cartcontral";
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import BScroll from "better-scroll";

export default {
  name: "shopcart",
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number,
      default: 20
    }
    //   selectFoods: {
    //       type: Array,
    //       default(){
    //           return []
    //       }
    //   }
  },
  data() {
    return {
      fold: true,
      flag: false,
      title: "你是不是撒",
      count: 1,
      ls: 3,
      times: undefined
    };
  },
  created() {
    Vue.nextTick(() => {
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        probeType: 3,
        click: true
      });
    });
  },
  components: {
    cartcontral
  },
  methods: {
    ...mapMutations({ setfood: "countFoods" }),
    clearBtn() {
      if (this.newfoods.length != 0) {
        this.newfoods.forEach(good => {
          good.count = 0;
        });
      }
    },
    base() {
      this.title = "你是不是撒";
      this.count = 1;
      this.ls = 3;
      this.clearBtn();
      this.flag = true;
    },
    close() {
      let newTitle = this.title;
      this.title = "逃避解决不了问题";
      setTimeout(() => {
        this.title = newTitle;
      }, 3000);
    },
    yes() {
      this.flag = false;
    },
    no() {
      if (this.count > 3) {
        return;
      }
      switch (this.count++) {
        case 1:
          this.title = "说你傻还不信";
          break;
        case 2:
          this.title = "最后一次机会，我是不是很帅";
          break;
        case 3:
          this.time;
      }
    }
  },
  computed: {
    ...mapState({ newfoods: state => state.foods }),
    totalCount() {
      let totalCount = 0;
      this.newfoods.forEach(food => {
        totalCount += food.count;
      });
      return totalCount;
    },
    totalPrice() {
      let totalPrice = 0;
      this.newfoods.forEach(food => {
        totalPrice += food.price * food.count;
      });
      return totalPrice;
    },
    inform() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}起送`;
      } else {
        return `去结算`;
      }
    },
    showList() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      return !this.fold;
    },
    time() {
      let date = new Date();
      this.times = setInterval(() => {
        if (new Date().getTime() - date.getTime() > 1000) {
          this.title = `你的设备将在${this.ls--}秒后自动摧毁`;
        }
        if (this.ls < 0) {
          clearInterval(this.times);
          this.title = "骗你的哈哈哈";
          setTimeout(() => {
            this.flag = false;
          }, 2000);
        }
      }, 1000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" ref="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl';

.shopcart {
    position: fixed;
    width: 100%;
    height: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 300;

    .content {
        width: 100%;
        display: flex;
        background-color: #141d27;

        .chatr-icon-wrapper {
            flex: 0 0 80px;
            position: relative;

            .chart-icon {
                position: relative;
                width: 44px;
                height: 44px;
                border-radius: 44px;
                border: 6px solid #141d27;
                background-color: #2b333b;
                margin-left: 18px;
                margin-top: -10px;
                font-size: 24px;
                color: rgba(255, 255, 255, 0.4);
                line-height: 44px;
                text-align: center;

                &.noZChart {
                    background-color: #00a0dc;
                    color: #ffffff;
                }
            }

            .total-count {
                position: absolute;
                right: 0;
                top: -6px;
                text-align: center;
                background-color: red;
                color: #ffffff;
                width: 24px;
                height: 16px;
                font-size: 8px;
                font-weight: 700;
                line-height: 16px;
                box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.4);
                border-radius: 16px;
            }
        }

        .deliver-fee {
            flex: 1;
            padding: 12px 0 12px 12px;
            height: 24px;

            .price {
                display: inline-block;
                line-height: 24px;
                color: rgba(255, 255, 255, 0.4);
                border-1px-right: rgba(255, 255, 255, 0.1);
                padding-right: 12px;

                &.noZpice {
                    color: #ffffff;
                }
            }

            .deliveryPrice {
                display: inline-block;
                padding-left: 12px;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.4);
            }
        }

        .deliver-base {
            flex: 0 0 105px;
            // margin-left 12px
            padding: 0 8px;
            line-height: 48px;
            text-align: center;
            color: rgba(255, 255, 255, 0.1);
            font-weight: 700;
            background-color: #2b333b;

            &.ok {
                background-color: green;
                color: #ffffff;
            }
        }
    }
}

.cart-list-wrapper {
    position: absolute;
    // position absolute;
    top: 0px;
    bottom: 48px;
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: -1;

    .cart-gray {
        position fixed
        top: 0;
        left 0;
        right 0;
        bottom:0;
        flex: 1;
        background-color: rgba(7, 17, 27, 0.6);
    }

    .cart-list {
        width: 100%;
        position: absolute ;
        bottom: 0px;
        left: 0;
        background-color: #ffffff;
        // z-index -1
        .cart-list-header {
            z-index: 1;
            // right: 0;
            // left: 0;
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            border-1px: rgba(7, 17, 27, 0.1);
            background-color: #f3f5f7;
        }

        .cart-title {
            font-size: 14px;
            font-weight: 200;
            color: rgb(7, 17, 27);
        }

        .clear {
            position: absolute;
            right: 18px;
            font-size: 12px;
            color: rgb(0, 16, 220);
        }

        .food-item-wrapper {
            // position relative
            // width: 100%;
            max-height: 190px;
            z-index: 10;
            overflow hidden
            .food-item {
                position relative
                height: 48px;
                line-height: 48px;
                margin: 0 18px;
                border-1px(rgba(7, 17, 27, 0.1));

                .food-title {
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }

                .food-prict {
                    position: absolute;
                    right: 90px;
                    font-size: 10px;
                }

                .cart-control {
                    position: absolute;
                    right: 0px;
                    top: 6px;
                    display: inline-block;
                }
            }
        }
    }
}


.stretch {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.5);
    box-sizing: border-box;
    z-index: 400;

    .stretch-conten {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 320px;
        height: 200px;
        margin-top: -100px;
        margin-left: -160px;
        background-color: #ffffff;
        border: 1px solid rgba(7, 17, 27, 0.1);
        border-radius: 12px;

        .stretch-wrapper {
            text-align: center;
            border-radius: 12px;

            .hear {
                border-radius: 12px;
                display: flex;
                line-height: 20px;
                justify-content: space-between;
                padding: 10px 20px 10px;
                background-color: #f3f5f7;
            }

            .title {
                font-size: 20px;
                font-weight: 700;
                line-height: 100px;
            }
        }

        .judgment {
            display: flex;
        }

        .yes, .no {
            flex: 1;
            font-size: 16px;
            font-widht: 400;
            padding: 12px;
            margin: 0 8px;
            border: 1px solid rgba(7, 17, 27, 0.5);
        }
    }
}
</style>
