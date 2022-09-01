export default {
  updatePic (state, pic) {
    state.pictures = pic
  },
  updateImageScale (state, scale) {
    state.options.imageScale = scale
  },
  initOptions (state, options) {
    if (!options) {
      return
    }
    try {
      const parsedOptions = JSON.parse(options)
      if (parsedOptions?.imageScale) {
        state.options.imageScale = parsedOptions.imageScale
      }
    } catch (_) {}
  }
}
