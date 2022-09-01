<template>
  <canvas ref="canvas">
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PicViewer',
  data () {
    return {
      id: this.$route.params.id || 1,
      image: null
    }
  },

  computed: {
    ...mapState(['pictures', 'options']),
    imageScale () {
      return this.options.imageScale
    }
  },

  watch: {
    imageScale () {
      this.initImage()
    }
  },

  mounted () {
    this.initImage()
  },

  methods: {
    URLCreate (img) {
      return URL.createObjectURL(img)
    },
    initImage () {
      if (!this.pictures || !this.pictures[this.id]) {
        return this.$router.push('/')
      }

      const ctx = this.$refs.canvas.getContext('2d')
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const image = new Image()
      image.src = this.URLCreate(this.pictures[this.id])
      const vueThis = this
      image.onload = function () {
        let futureHeight = this.height
        let futureWidth = this.width
        switch (vueThis.options.imageScale) {
        case 'native':
          break
        case 'contain':
          futureHeight = window.innerHeight
          futureWidth = window.innerHeight * this.width / this.height

          if (futureWidth > window.innerWidth) {
            futureWidth = window.innerWidth
            futureHeight = window.innerWidth * this.width / this.height
          }
          break
        case 'width':
          futureWidth = window.innerWidth
          futureHeight = window.innerWidth * this.width / this.height
          break
        case 'height':
          futureHeight = window.innerHeight
          futureWidth = window.innerHeight * this.width / this.height
          break
        }
        vueThis.$refs.canvas.height = window.innerHeight
        vueThis.$refs.canvas.width = window.innerWidth
        this.height = futureHeight
        this.width = futureWidth
        ctx.drawImage(this, 0,0, futureWidth, futureHeight)
        vueThis.image = image
      }
    }
  }
}
</script>

<style scoped lang="scss">
.asdf {
  height: 100vh;
  width: 100vh;
}

</style>
