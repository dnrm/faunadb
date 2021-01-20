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
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="text-center p-2">${doc.name}</td>
        <td class="text-center p-2">${doc.lastname}</td>
        <td class="text-center p-2">${doc.birthDate}</td>
    `;
    document.querySelector('#tbody').append(tr);
}

getUsers();