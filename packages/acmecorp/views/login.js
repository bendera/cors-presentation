module.exports = function login() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server 1 Login</title>
    </head>
    <body>
      <h1>Server 1 Login</h1>
      <form>
        <input type="text" placeholder="username"><br>
        <input type="password" placeholder="password"><br>
        <button>Login</button>
      </form>
    </body>
    </html>
  `
}
