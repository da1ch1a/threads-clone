<template>
  <MainLayout>
    <div id="IndexPage" class="w-full overflow-auto">
      <div class="mx-auto max-w-[500px] overflow-hidden">
        <div id="Posts" class="px-4 max-w-[600px] mx-auto">
          <div v-if="isPosts" v-for="post in posts" :key="post.id">
            <Post :post="post" @isDeleted="posts = userStore.getAllPosts()" />
          </div>
          <div v-else>
            <client-only>
              <div v-if="isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                <div class="text-white mx-auto flex flex-col items-center justify-center">
                  <Icon name="eos-icons:bubble-loading" size="50" color="#ffffff" />
                  <div class="w-full mt-1">Loading...</div>
                </div>
              </div>
              <div v-if="!isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                <div class="text-white mx-auto flex flex-col items-center justify-center">
                  <Icon name="tabler:mood-empty" size="50" color="#ffffff" />
                  <div class="w-full">Make the first post!</div>
                </div>
              </div>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import MainLayout from '@/layouts/MainLayout.vue';
import type { Post } from '@/models/posts';

const userStore = useUserStore();
const user = useSupabaseUser();

let posts = ref<Post[]>([]);
let isPosts = ref(false);
let isLoading = ref(false);

watchEffect(() => {
  if (!user.value) {
    return navigateTo('/login')
  }
});


onBeforeMount(async () => {
  try {
    isLoading.value = true
    await userStore.getAllPosts()
    isLoading.value = false
  } catch (error) {
    console.log(error)
  }
});

onMounted(() => {
  watchEffect(() => {
    posts.value = userStore.posts;
    if (userStore.posts && userStore.posts.length >= 1) {
      isPosts.value = true;
    } else {
      isPosts.value = false;
    }
  })
})

watch(() => posts.value, () => {
  posts.value = userStore.posts;
  if (userStore.posts && userStore.posts.length >= 1) {
    isPosts.value = true;
  } else {
    isPosts.value = false;
  }
}, { deep: true })
</script>
