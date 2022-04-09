import emptyImage from '@img/empty-image.jpg'
import dayjs from 'dayjs'
import utc from 'dayjs/esm/plugin/utc'
import timezone from 'dayjs/esm/plugin/timezone'
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Taipei')

export const focus = {
  mounted(el, binding) {
    if (binding.value) {
      el.focus()
    }
  },
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

export const mySrc = {
  mounted(el, binding) {
    el.classList.add('load')
    if (binding.value.name) {
      const img = new Image()
      // img.src = binding.value
      img.src = `https://kirukiru.rocket-coding.com/${binding.value.folder}/${binding.value.name}`
      img.onload = () => {
        el.classList.remove('load')
        // el.src = binding.value
        el.src = `https://kirukiru.rocket-coding.com/${binding.value.folder}/${binding.value.name}`
      }
      img.onerror = () => {
        el.classList.remove('load')
        el.src = emptyImage
      }
    }
  },
  updated(el, binding) {
    el.classList.add('load')
    if (binding.value.name) {
      const img = new Image()
      // img.src = binding.value
      img.src = `https://kirukiru.rocket-coding.com/${binding.value.folder}/${binding.value.name}`
      img.onload = () => {
        el.classList.remove('load')
        // el.src = binding.value
        el.src = `https://kirukiru.rocket-coding.com/${binding.value.folder}/${binding.value.name}`
      }
      img.onerror = () => {
        el.classList.remove('load')
        el.src = emptyImage
      }
    }
  },
}

export const src = {
  mounted(el, binding) {
    if (binding.value) {
      el.classList.add('load')
      const img = new Image()
      img.src = binding.value
      img.onload = () => {
        el.classList.remove('load')
        el.src = binding.value
      }
      img.onerror = () => {
        el.classList.remove('load')
        el.src = emptyImage
      }
    }
  },
  updated(el, binding) {
    if (binding.value) {
      el.classList.add('load')
      const img = new Image()
      img.src = binding.value
      img.onload = () => {
        el.classList.remove('load')
        el.src = binding.value
      }
      img.onerror = () => {
        el.classList.remove('load')
        el.src = emptyImage
      }
    }
  },
}

export const timeformat = {
  mounted(el, binding) {
    const time = dayjs(binding.value.time).utcOffset(8).add(8, 'hour').format(binding.value.format || 'YYYY/MM/DD')
    el.textContent = time
  },
  updated(el, binding) {
    const time = dayjs(binding.value.time).utcOffset(8).add(8, 'hour').format(binding.value.format || 'YYYY/MM/DD')
    el.textContent = time
  }
}
