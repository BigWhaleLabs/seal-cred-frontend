declare module 'valtio' {
  function useWritableSnapshot<T extends object>(p: T): T
}

export {} // Need to make the file a module to augment the 'valtio', not just replace
