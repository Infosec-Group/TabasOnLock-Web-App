function buildUrlWithParams(url, params) {
  if (!params) return url;
  
  const filtered = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );

  const queryString = new URLSearchParams(filtered).toString();
  return queryString ? `${url}?${queryString}` : url;
}