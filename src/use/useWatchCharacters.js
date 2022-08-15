import { watch } from 'vue'

export function useWatchCharacters(
  string,
  options = {
    maxlength: 100
  }
) {
  watch(string, value => {
    if (value.length === options.maxlength) console.log(options)
  })
}
