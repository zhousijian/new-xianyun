<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{orderInfo.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// 引入生成二维码的插件
import QRCode from "qrcode";

export default {
  data() {
    return {
      // 订单详情
      orderInfo: {},
      // 定时器
      pay: ""
    };
  },
  mounted() {
    // 定时器作用是延迟了代码的执行，以免报错。
    //（如果不使用定时器，在发送请求时候拿不到仓库里的token）
    // 定时器延迟时间为0的作用是时间上没有延迟，但执行的时机是在所有组件加载完成才执行
    setTimeout(() => {
      // 发送订单详情的请求
      this.$axios({
        url: `/airorders/${this.$route.query.id}`,
        headers: {
          Authorization: "Bearer " + [this.$store.state.user.userInfo.token]
        }
      }).then(res => {
        // console.log(res);
        this.orderInfo = res.data;
        // 生成二维码
        let canvas = document.getElementById("qrcode-stage");
        QRCode.toCanvas(canvas, this.orderInfo.payInfo.code_url, {
          width: 200
        });

        // 需要检测到用户有没有支付，所以需要每隔一段时间都需要发一次请求
        this.pay = setInterval(() => {
          this.payState();
        }, 3000);
      });
    }, 0);
  },
  // 组件销毁时触发的钩子函数
  destroyed () {
      clearInterval(this.pay)
  },
  methods: {
    // 查询支付状态
    payState() {
      this.$axios({
        method: "post",
        url: "/airorders/checkpay",
        data: {
          id: this.orderInfo.id,
          nonce_str: this.orderInfo.price,
          out_trade_no: this.orderInfo.orderNo
        },
        headers: {
          Authorization: "Bearer " + [this.$store.state.user.userInfo.token]
        }
      }).then(res => {
        // console.log(res);
        // 当支付状态为支付成功就停止定时器
        if (res.data.statusTxt == "支付完成") {
          clearInterval(this.pay);
          this.$alert("支付成功", "温馨提示", {
            confirmButtonText: "确定",
            type : 'success'
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>