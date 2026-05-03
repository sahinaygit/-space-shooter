module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        message: "python -m http.server 8080"
      }
    }
  ]
}
