<script lang="ts" setup>
import { reactive, ref, computed, watch } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, minLength, alpha } from '@vuelidate/validators'
import { alphaNumWithSpaces } from '@/helpers/validationHelpers';
import dayjs from 'dayjs';

import { storeToRefs } from 'pinia'
import { useCommentariesStore } from '@/stores/commentaries';
import type { TCommentary } from '@/types/commentaries';

const store = useCommentariesStore()
const { addCommentary } = store
const { listCommentaries } = storeToRefs(store)

interface IProps {
  movieId: number,
}

const props = defineProps<IProps>()

const isLoading = ref<boolean>(false)
const isDisabled = ref<boolean>(true)

const state = reactive<TCommentary>({
  username: '',
  score: null,
  content: '',
})

watch(() => state, async () => {
  const resValidate = await validation()
  isDisabled.value = !resValidate
}, { deep: true })

const score = computed(() => (Array.from({ length: 11 }, (_, i) => i)))

const movieCommentariesSorted = computed(() => 
  listCommentaries?.value
    .filter((commentary: TCommentary) => commentary?.movie_id === props.movieId)
    .sort((a: TCommentary, b: TCommentary) => 
      dayjs(b.publication_date).valueOf() - dayjs(a.publication_date).valueOf()
    )
)

const rules = {
  username: { 
    required,
    alpha,
    maxLength: maxLength(50),
    minLength: minLength(3),
  },
  content: { 
    required,
    alphaNumWithSpaces,
    maxLength: maxLength(500),
    minLength: minLength(3),
  },
}

const v$ = useVuelidate(rules, state)

const validation = async () => {
  const isValid = await v$.value.$validate()
  return isValid
}

const submit = async () => {
  const res = await validation()

  if (res) {
    isLoading.value = true
    const commentaryToAdd = {
      ...state,
      publication_date: dayjs().format('ddd DD MMM YYYY HH:mm:ss'),
      movie_id: props.movieId,
    }

    addCommentary(commentaryToAdd)
    clear()

    setTimeout(() => {
      isLoading.value = false
    },500)
  }
}

const clear = () => {
  state.username = ''
  state.score = null,
  state.content = '',
  state.publication_date = '',
  state.movie_id = props.movieId
}
</script>

<template>
  <form>
    <v-row class="user-info">
      <v-text-field
        v-model="state.username"
        :counter="50"
        :error-messages="v$.username.$errors.map(e => e.$message.toString())"
        label="Username"
        required
        @blur="v$.username.$touch"
        @input="v$.username.$touch; validation()"
      />

      <v-select
        v-model="state.score"
        :items="score"
        label="Your score"
        class="ml-5"
      />
    </v-row>
    <v-textarea 
      v-model="state.content" 
      :error-messages="v$.content.$errors.map(e => e.$message.toString())"
      :counter="500"
      label="Your commentary" 
      required 
      @blur="v$.content.$touch"
      @input="v$.content.$touch; validation()"
    />

    <v-btn
      :disabled="isDisabled"
      class="me-4"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">
      clear
    </v-btn>
  </form>
  <v-card class="mt-10">
    <v-card-text v-loading="isLoading">
      <v-timeline align="start" density="compact">
        <v-timeline-item
          v-for="(commentary, index) in movieCommentariesSorted"
          :key="index"
          size="x-small"
        >
          <div class="mb-4">
            <div class="text-base">
              <strong>{{ commentary.username }}</strong> @{{ commentary.publication_date }}
            </div>

            <div class="text-lg">{{ commentary.content }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<style scoped>
 .user-info {
    margin: 0;
 }
</style>
