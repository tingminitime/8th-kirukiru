export const invalidAni = {
  updated(el, binding) {
    const aniClassName = [
      'animate__animated',
      'animate__headShake',
    ]
    console.log(binding)
    if (binding.value) {
      el.classList.add(...aniClassName)
    } else {
      el.classList.remove(...aniClassName)
    }
  }
}