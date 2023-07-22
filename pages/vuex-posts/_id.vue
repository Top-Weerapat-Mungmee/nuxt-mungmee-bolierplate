<template>
  <div>
    <button @click="goToPostList">Back to Posts</button>
    <template v-if="isLoading">
      <content-placeholders>
        <content-placeholders-text :lines="20" />
      </content-placeholders>
    </template>
    <template v-else-if="isError">
      <h1>Post #{{ postId }} not found</h1>
    </template>
    <template v-else>
      <h1>{{ postData.title }}</h1>
      <pre>{{ postData.body }}</pre>
      <p>
        <n-link :to="`/vuex-posts/${postData.id + 1}`">Prev article</n-link>
        &nbsp;-&nbsp;
        <n-link :to="`/vuex-posts/${postData.id + 1}`">Next article</n-link>
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex'
import { IPost, IPostKeys } from '~/store/post/types'

export default {
  data() {
    return {
      postId: this.$route.params.id,
    }
  },
  async fetch() {
    await this.getPostById(this.$route.params.id)
  },
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      postKeys: 'post/postKeys',
      isLoading: 'post/postByIdLoading',
      isError: 'post/postByIdIsError',
    }),
    post(): IPostKeys {
      const data = this.postKeys[this.$route.params.id]
      return data
    },
    postData(): IPost {
      const data = this.postKeys[this.$route.params.id]?.data
      return data
    },
  },
  methods: {
    ...mapActions({
      getPostById: 'post/getPostById',
    }),
    goToPostList() {
      this.$router.push('/vuex-posts')
    },
  },
}
</script>
