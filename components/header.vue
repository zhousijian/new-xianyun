<template>
  <div class="header">
    <header>
      <el-row type="flex" justify="space-between" align="middle" class="content">
        <div class="left">
          <el-row type="flex" justify="space-between" align="middle">
            <img src="/logo.jpg" width="156px" height="43px" alt />
            <nuxt-link :to="item.url" v-for="(item,index) in arr" :key="index">{{item.text}}</nuxt-link>
            <!-- <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
            <nuxt-link to="/air">国内机票</nuxt-link>-->
          </el-row>
        </div>

        <div class="right">
          <el-dropdown v-if="$store.state.user.userInfo.token">
            <el-row type="flex" align="middle" class="el-dropdown-link">
            <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" alt="" width="36px" height="36px">
            <span class="el-dropdown-link">
              {{$store.state.user.userInfo.user.nickname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            </el-row>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <!-- el-dropdown-item是elementui的组件，它不接受click事件 -->
              <!-- @click.native是可以的，native会把事件加在组件在外层的div -->
              <el-dropdown-item @click.native='logout'>退出
                <!-- 要么直接加上一个div也可以 -->
                <!-- <div @click="logout">退出</div> -->
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <nuxt-link to="/user/login" v-else>登录 / 注册</nuxt-link>
        </div>
      </el-row>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [
        { text: "首页", url: "/" },
        { text: "旅游攻略", url: "/post" },
        { text: "酒店", url: "/hotel" },
        { text: "国内机票", url: "/air" }
      ],
    };
  },
  methods: {
    logout(){
      // console.log(111);
      this.$store.commit('user/setUserInfo',{})
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  margin: 0 auto;
  width: 1000px;
  height: 60px;
  .left {
    img {
      padding-right: 20px;
    }
    a {
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      &:hover {
        color: #409eff;
        border-bottom: 5px solid #409eff;
      }
    }
    .nuxt-link-exact-active {
      background-color: #409eff;
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
  .right {
    a {
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>