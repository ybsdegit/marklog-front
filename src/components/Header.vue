<template>
  <div class="m-content">
    <h3>欢迎来到元宝森的博客</h3>
    <div class="block">
      <el-avatar :size="50" :src="user.avatar"> </el-avatar>
      <div>{{ user.username }}</div>
    </div>
    <div class="maction">
      <span>
        <el-link type="primary" href="/blogs">主页</el-link>
      </span>
      <el-divider direction="vertical"></el-divider>
      <span>
        <el-link href="/blog/add" type="success">发表博客</el-link>
        <!-- <router-link :to="{ name: 'BlogAdd' }" type="success">发表博客</router-link> -->
      </span>
      <el-divider direction="vertical"></el-divider>
      <span v-show="!hasLogin"
        ><el-link type="info" href="/login">登录</el-link></span
      >
      <span v-show="hasLogin"
        ><el-link type="danger" @click="logout">退出</el-link></span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      user: {
        username: '请先登录',
        avatar:
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      },
      hasLogin: false,
    }
  },
  methods: {
    logout() {
      const _this = this
      axios
        .get('/logout', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((res) => {
          console.log(res)
          _this.$store.commit('REMOVE_INFO')
          _this.$message.success('退出登录成功')
          _this.$router.push('/login')
        })
    },
  },

  created() {
    if (this.$store.getters.getUser.username) {
      this.user.username = this.$store.getters.getUser.username
      this.user.avatar = this.$store.getters.getUser.avatar
      this.hasLogin = true
    }
  },
}
</script>

<style scoped>
.m-content {
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
}

.maction {
  margin: 10px, 10px;
}
</style>
