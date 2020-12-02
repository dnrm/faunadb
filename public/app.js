let response = '';

function getUsers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            response = JSON.parse(xhttp.responseText)['data'];
            displayUsers();
        }
    };
    xhttp.open("GET", "https://faunadb.herokuapp.com/get-users", true);
    xhttp.send();
}

function displayUsers() {
    let parent = document.createElement('div');
    parent.classList.add('user-container');
    let name = document.createElement('h3'); name.innerText = response.name;
    name.classList.add('user-name', 'text-xl');
    let lastname = document.createElement('h4'); lastname.innerText = response.lastname;
    lastname.classList.add('user-lastname');
    let birthdate = document.createElement('p'); birthdate.innerText = response.birthDate;
    birthdate.classList.add('user-birthdate');
    parent.append(name);
    parent.append(lastname);
    parent.append(birthdate);
    document.getElementById('users').append(parent);
}

getUsers();