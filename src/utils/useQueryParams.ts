const useQueryParams = () => {
  const get = (key: string, search = window.location.search): string | null => {
    const queryParams = new URLSearchParams(search)
    const myParam = queryParams.get(key)

    return myParam
  }

  return { get }
}

export { useQueryParams }
