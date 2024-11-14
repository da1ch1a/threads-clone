import { defineStore } from 'pinia'
import type { Like, Post } from '@/models/posts';

export const useUserStore = defineStore('user', {
  state: () => ({
    posts: [] as Post[],
    isMenuOverlay: false,
    isLogoutOverlay: false,
  }),

  actions: {
    // async getAllPosts() {
    //   let res = await useFetch('/api/get-all-posts')
    //   this.posts = res.data
    //   return res.data
    // }
    async getAllPosts() {
      let res = await useFetch('/api/get-all-posts')

      const fetchedPosts: Post[] = []
      if (res.data?.value) {
        for (let i = 0; i < res.data?.value?.length; i++) {
          const fetchLikes: Like[] = res.data?.value[i].likes.map((like) => ({
            id: like.id,
            userId: like.userId,
            postId: like.postId
          }))
          fetchedPosts[i] = {
            id: res.data?.value[i].id,
            userId: res.data?.value[i].userId,
            name: res.data?.value[i].name,
            image: res.data?.value[i].image,
            text: res.data?.value[i].text,
            picture: res.data?.value[i].picture,
            likes: fetchLikes
          }
        }
      }
      this.posts = fetchedPosts;
      return fetchedPosts;
    }
  }
});
