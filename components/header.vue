<template>
  <div class="header">
    <header>
      <el-row type="flex" justify="space-between" align="middle" class="content">
        <div class="left">
          <el-row type="flex" justify="space-between" align="middle">
            <img src="logo.jpg" width="156px" height="43px" alt />
            <nuxt-link :to="item.url" v-for="(item,index) in arr" :key="index">{{item.text}}</nuxt-link>
            <!-- <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
            <nuxt-link to="/air">国内机票</nuxt-link>-->
          </el-row>
        </div>

        <div class="right">
          <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
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
      ]
    };
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