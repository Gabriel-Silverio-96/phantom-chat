module.exports.chat = (app,req, res) => {
    const nickname = req.body;   

    //Form validation 
    req.assert('nickname', 'Add a nickname min of 3 characters max of 10').notEmpty().len(3, 10);
    const error = req.validationErrors();

    if(error) {
        console.log(error)
        res.render('index', {validation: error})
        return;
    };
    
    app.get('io').emit('start', 
        {userName: 'User online ' + nickname.nickname}
    );

    res.render('chat', {nickname: nickname});        
}