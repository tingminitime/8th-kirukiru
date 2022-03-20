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