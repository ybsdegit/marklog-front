<template>
  <div>
    <Header></Header>
    <div class="m-blog">
      <h2>{{ blog.title }}</h2>

      <h4>{{ blog.description }}</h4>
      <el-button icon="el-icon-edit" v-if="own">
        <router-link :to="{ name: 'BlogEdit', params: { blogId: blog.id } }">
          编辑
        </router-link>
      </el-button>
      <el-divider direction="vertical"></el-divider>
      <el-button v-if="own" icon="el-icon-delete" @click="deleteBlog(blog.id)">
        删除
      </el-button>

      <el-divider></el-divider>
      <div class="markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import 'github-markdown-css'
export default {
  components: { Header },
  data() {
    return {
      blog: {
        id: '',
        title: '默认',
        content: '内容',
        description: '',
      },
      own: false,
    }
  },

  methods: {
    deleteBlog(id) {
      const _this = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      })
        .then(() => {
          console.log('删除')
          axios.put('/blog/delete/' + id).then((res) => {
            console.log('删除', res.data.msg)
            _this.$router.push('/blogs')
          })
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
  created() {
    const blogId = this.$route.params.blogId
    const _this = this
    console.log(blogId)
    if (blogId) {
      axios.get('/blog/detail/' + blogId).then((res) => {
        console.log(res)
        const blog = res.data.data
        _this.blog.title = blog.title
        _this.blog.description = blog.description
        _this.blog.id = blog.id

        var MarkDownIt = require('markdown-it')
        var md = new MarkDownIt()
        _this.blog.content = md.render(blog.content)

        _this.own = blog.userId === _this.$store.getters.getUser.id
      })
    }
  },
}
</script>

<style scoped>
.m-blog {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 800px;
  padding: 20px;
}
</style>
