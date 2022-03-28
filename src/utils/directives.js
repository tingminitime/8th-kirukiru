import emptyImage from '@img/empty-image.jpg'
import dayjs from 'dayjs'

export const focus = {
  mounted(el, binding) {
    if (binding.value) {
      el.focus()
    }
  }
}

export const invalidAni = {
  updated(el, binding) {
    const aniClassName = [
      'animate__animated',
      'animate__headShake',
    ]
    if (binding.value) {
      el.classList.add(...aniClassName)
    } else {
      el.classList.remove(...aniClassName)
    }
  }
}

export const src = {
  mounted(el, binding) {
    if (binding.value) {
      el.classList.add('load')
      const img = new Image()
      setTimeout(() => {
        img.src = binding.value
        img.onload = () => {
          el.classList.remove('load')
          el.src = binding.value
        }
        img.onerror = () => {
          el.classList.remove('load')
          el.src = emptyImage
        }
      }, 2000)
    }
  },
  updated(el, binding) {
    if (binding.value) {
      el.classList.add('load')
      const img = new Image()
      setTimeout(() => {
        img.src = binding.value
        img.onload = () => {
          el.classList.remove('load')
          el.src = binding.value
        }
        img.onerror = () => {
          el.classList.remove('load')
          el.src = emptyImage
        }
      }, 2000)
    }
  },
}

export const timeformat = {
  mounted(el, binding) {
    const time = dayjs(binding.value.time).format(binding.value.format || 'YYYY/MM/DD')
    el.textContent = time
  },
  updated(el, binding) {
    const time = dayjs(binding.value.time).format(binding.value.format || 'YYYY/MM/DD')
    el.textContent = time
  }
}
