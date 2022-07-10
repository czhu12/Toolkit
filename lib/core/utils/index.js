export const isPresent = (value) => {
  return value !== null && value !== undefined;
}

export const toHtmlSafeString = (string) => {
  return string.toLowerCase().replace(" ", "-");
}