<template>
  <div class="text-center" data-app>
    <v-btn text style="position: absolute; top: 10px; right: 10px; z-index: 999" @click="isOpen = !isOpen">
      {{ isOpen ? 'Скрыть' : 'Показать' }}
    </v-btn>
    <v-container v-show="isOpen">
      <v-file-input
        webkitdirectory
        v-model="picFromInput"
        truncate-length="15"
        multiple
      />

      <v-select v-model="imageScale" :items="items" />
      <v-row>
        <v-col v-for="(img, key) in picFromInput" :key="key" cols="2">
          <v-img
            :src="URLCreate(img)"
            @click="goToPic(key)"
          />
        </v-col>
      </v-row>
    </v-container>
    <nuxt />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      isOpen: true
    }
  },
  computed: {
    ...mapState(['pictures', 'options']),

    items () {
      return [
        {
          text: 'native',
          value: 'native'
        },
        {
          text: 'contain',
          value: 'contain'
        },
        {
          text: 'contain width',
          value: 'width'
        },
        {
          text: 'contain height',
          value: 'height'
        }
      ]
    },

    picFromInput: {
      get () {
        return this.pictures
      },
      set (value) {
        this.updatePic(value.filter((file) => ['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)))
        this.$router.push('/')
      }
    },
    imageScale: {
      get () {
        return this.options.imageScale
      },
      set (value) {
        this.updateImageScale(value)
        localStorage.setItem('___mu_test_app__options', JSON.stringify({ ...this.options, imageScale: value }))
      }
    }
  },

  mounted () {
    this.initOptions(localStorage.getItem('___mu_test_app__options'))
  },

  methods: {
    ...mapMutations(['updatePic', 'updateImageScale', 'initOptions']),

    URLCreate (img) {
      return URL.createObjectURL(img)
    },
    goToPic (id) {
      this.$router.push(`/picViewer/${id}`)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
