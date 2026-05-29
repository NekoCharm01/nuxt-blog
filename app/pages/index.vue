<template lang="pug">
NGrid(
  class="mx-auto max-w-6xl px-6 py-16 sm:py-24"
  cols="1 l:2"
  :x-gap="40"
  :y-gap="40"
  responsive="screen"
)
  NGi
    NFlex(vertical align="flex-start" size="large")
      NTag(:bordered="false" type="primary") Independent Blog
      NH1(class="max-w-3xl !text-4xl sm:!text-5xl")
        | Thoughtful notes for builders, teams, and curious readers.
      NP(class="max-w-2xl !text-lg !leading-8")
        | Field Notes is a clean blog starter with featured posts, simple navigation, and room for
        | articles, updates, and resources.
      NFlex
        NButton(round type="primary" size="large" @click="navigateTo('/posts')") Read latest posts
        NButton(round size="large" @click="navigateTo('/about')") About the blog
  NGi(v-if="featuredPost")
    NCard(class="shadow-sm" embedded size="huge")
      NFlex(vertical size="large")
        NTag(:bordered="false" type="primary") Featured
        NH2 {{ featuredPost.title }}
        NP {{ featuredPost.excerpt }}
        NFlex(justify="space-between")
          NText(depth="3") {{ featuredPost.date }}
          NText(depth="3") {{ featuredPost.readingTime }}
        NButton(text type="primary" @click="navigateTo(`/posts/${featuredPost.slug}`)") Continue reading
</template>

<script setup lang="ts">
const { data: posts } = await useFetch('/api/posts', { default: () => [] })
const featuredPost = computed(() => posts.value[0])
</script>
