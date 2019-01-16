const baseUrl = `https://api.github.com/graphql?access_token=`;

export function makeQuery(token, mutation, opts = {}) {
  const ghUrl = `${baseUrl}${token}`;
  const fetchOptions = {
    method: opts.method ? opts.method : 'POST',
    body: JSON.stringify({ query: mutation }),
  };

  /** Note: some github graphql queries require additional header param
   *  since they are still in development
   *  source: https://developer.github.com/v4/previews/#issues-preview
   */
  if (opts.preview) {
    fetchOptions.headers = {
      Accept: 'application/vnd.github.starfire-preview+json',
    };
  }

  return fetch(ghUrl, fetchOptions).then(response => {
    return response.json();
  });
}
