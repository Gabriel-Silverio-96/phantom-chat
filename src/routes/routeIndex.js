module.exports = app => {
    app.get('/', (req, res) => {
        app.src.controllers.controlIndex.index(req, res);
    })  
};