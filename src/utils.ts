export const LOCAL_STORAGE_KEY = 'AskforStorage'

export const LSKeyByChannel = (channel: string | undefined) =>
  `${LOCAL_STORAGE_KEY}-${channel}`
