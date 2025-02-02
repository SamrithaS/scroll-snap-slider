import { ScrollSnapPlugin } from './ScrollSnapPlugin.js'

export class ScrollSnapLoop extends ScrollSnapPlugin {
  constructor () {
    super()

    this.loopSlides = this.loopSlides.bind(this)
  }

  /**
   * @override
   * @param {ScrollSnapSlider} slider
   */
  enable (slider) {
    this.slider = slider
    this.element = this.slider.element
    this.slides = this.element.getElementsByClassName('scroll-snap-slide')

    this.slider.addEventListener('slide-stop', this.loopSlides)
    this.loopSlides()
  }

  /**
   * @override
   */
  disable () {
    this.slider.removeEventListener('slide-stop', this.loopSlides)

    const sortedSlides = Array.prototype.slice
      .call(this.slides)
      .sort((a, b) => parseInt(a.dataset.index, 10) - parseInt(b.dataset.index, 10))

    Element.prototype.append.apply(this.element, sortedSlides)

    this.slider = null
    this.element = null
    this.slides = null
  }

  loopSlides () {
    const lastIndex = this.slides.length - 1

    if (this.slider.slide === 0) {
      this.element.prepend(this.slides[lastIndex])
      return
    }

    if (this.slider.slide === lastIndex) {
      this.element.append(this.slides[0])
    }
  }
}