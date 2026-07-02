/**
 * Decap CMS GitHub OAuth 代理（Cloudflare Worker）
 *
 * 环境变量：
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *
 * GitHub OAuth App 回调地址填：https://<worker域名>/callback
 */

const SCOPES = 'repo,user'

function html(body) {
  return new Response(body, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/auth') {
      const clientId = env.GITHUB_CLIENT_ID
      if (!clientId) return new Response('Missing GITHUB_CLIENT_ID', { status: 500 })

      const redirectUri = `${url.origin}/callback`
      const target = new URL('https://github.com/login/oauth/authorize')
      target.searchParams.set('client_id', clientId)
      target.searchParams.set('redirect_uri', redirectUri)
      target.searchParams.set('scope', SCOPES)
      return Response.redirect(target.toString(), 302)
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code')
      if (!code) return new Response('Missing code', { status: 400 })

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      })

      const tokenData = await tokenRes.json()
      const token = tokenData.access_token
      if (!token) {
        return html(`<p>授权失败：${JSON.stringify(tokenData)}</p>`)
      }

      const script = [
        `var content = { token: ${JSON.stringify(token)}, provider: "github" };`,
        `window.opener.postMessage("authorization:github:success:" + JSON.stringify(content), "*");`,
        `document.body.textContent = "登录成功，请关闭此窗口。";`,
      ].join('')
      return html(`<!doctype html><html><body><script>${script}</script></body></html>`)
    }

    return new Response('Decap CMS OAuth Worker\n\n/auth — 登录\n/callback — GitHub 回调', {
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  },
}
