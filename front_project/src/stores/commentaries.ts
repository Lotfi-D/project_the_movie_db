import type { TCommentary } from '@/types/commentaries'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCommentariesStore = defineStore('commentary', () => {
  const commentaries = ref<TCommentary[]>([])
   
  const listCommentaries = computed(() => commentaries.value)

  const addCommentary = (commentary: TCommentary) => {
    commentaries.value.push(commentary)
  }

  return { 
    commentaries, 
    listCommentaries,
    addCommentary,
  }
}, { persist: true })
