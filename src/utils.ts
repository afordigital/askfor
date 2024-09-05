export const LOCAL_STORAGE_KEY = 'questionsStorage'

export const LSKeyByChannel = (channel: string | undefined) =>
  `${LOCAL_STORAGE_KEY}-${channel}`
