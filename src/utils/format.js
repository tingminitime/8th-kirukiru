export const convertHTML = (str) => {
  if (!str) return '';
  return str.replace(/\n/g, '<br>');
}