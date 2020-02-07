<template>
  <div>
    <Header></Header>
    <!-- 作用就是router-view，页面的占位符 -->
    <nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/header";
import Footer from "@/components/footer";

export default {
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
ul,
li,
ol {
  list-style: none;
}
a {
  color: inherit;
  text-decoration: none;
}
a:hover {
  color: inherit;
}
i,
em {
  font-style: normal;
}
</style>
