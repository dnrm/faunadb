let response = '';

function getUsers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(xhttp.responseText)['data'];
            for (i = 0; i < response.length; i++) {
                let doc = response[i]["data"]
                displayUsers(doc)
            }
        }
    };
    xhttp.open("GET", `/get-users`, true);
    xhttp.send();
}

function displayUsers(doc) {
    let parent = document.createElement('div');
    parent.classList.add('user-container');
    let name = document.createElement('h3'); name.innerText = doc.name;
    name.classList.add('user-name', 'text-xl');
    let lastname = document.createElement('h4'); lastname.innerText = doc.lastname;
    lastname.classList.add('user-lastname');
    let birthdate = document.createElement('p'); birthdate.innerText = doc.birthDate;
    birthdate.classList.add('user-birthdate');
    let lineBreak = document.createElement('hr');
    parent.append(name);
    parent.append(lastname);
    parent.append(birthdate);
    parent.append(lineBreak);
    parent.classList.add('p-2')
    document.getElementById('users').append(parent);
}

getUsers();