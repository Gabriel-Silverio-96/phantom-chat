const socket = io(location.origin);

const message = document.getElementById('message');
const send = document.getElementById('send');
const nickname = document.getElementById('nickname');
const numberHidden = document.getElementById('numberHidden');

//Sends message on the enter key
window.addEventListener('keypress', () => {
    if (event.keyCode == 13) {
        socket.emit('dialog', {
            nickname: nickname.value,
            message: message.value,
            numberUsers: numberHidden.value
        })

        message.value = '';
        numberHidden.value = 1;
    }
});

//Sends message button send
send.addEventListener('click', () => {
    socket.emit('dialog', {
        nickname: nickname.value,
        message: message.value,
        numberUsers: numberHidden.value
    });

    message.value = '';
    numberHidden.value = 1;
});

//Add dialog for user
socket.on('dialogAdd', data => {
    const dialogArea = document.querySelector('.dialog_area');

    const divDialog = document.createElement('div');
    divDialog.classList.add('dialog');

    const divDialogUser = document.createElement('div');
    divDialogUser.classList.add('dialog_user');

    const span = document.createElement('span');
    span.textContent = data.nickname + ' >';

    const p = document.createElement('p');
    p.classList.add('color_message');
    p.textContent = data.message;

    divDialogUser.appendChild(span);
    divDialogUser.appendChild(p);
    divDialog.appendChild(divDialogUser);
    dialogArea.appendChild(divDialog);

    //New spotlight message 
    dialogArea.scrollBy(0, 100);
});

socket.on('usersOnlineListAdd', data => {
    //Add users online
    const usersOnlineList = document.getElementById('users_online');
    const li = document.createElement('li');
    li.textContent = data.nickname;
    usersOnlineList.appendChild(li);
});