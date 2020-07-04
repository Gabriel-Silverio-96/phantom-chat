module.exports = app => {
    app.post('/chat', (req, res) => {
        app.src.controllers.controlChat.chat(app, req, res)
    })
}