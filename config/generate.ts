export const generate = {
  interval: 2000,
  async routes() {
    /** @type {{ userId: number, id: number, title: string, body: string }[]} */
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((d) => d.slice(0, 20))
    const routes = posts.map((post: any) => `/posts/${post.id}`)

    return ['/'].concat(routes)
  },
  // eslint-disable-next-line prefer-regex-literals
  exclude: [RegExp('/posts/23')],
}
