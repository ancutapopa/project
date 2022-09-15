// get card details and append to html
function userCard(item) {
    const member = document.getElementById("member");
    const singleCard =
        `<div class="card-member" id="memb-card${item.id}">
            <div class="info-member">
                <div class="memb-initial">
                    <p class="initial">${item.firstName.charAt(0)}</p>
                </div>
                <div class="memb-details">
                    <h3 class="memb-name">${item.firstName} ${item.lastName}</h3>
                    <h4 class="memb-id">ID:${item.id}</h4>
                    <h4 class="memb-email">${item.firstName}.${item.lastName}@gmail.com</h4>
                </div>
            </div>
            <div class="btn-container">
                <button id="${item.id}" class="edit btn-ed-del btn-edit">Edit</button>
                <button id="${item.id}" class="delete btn-ed-del btn-delete">Delete</button>
            </div>
        </div>`
    member.innerHTML += singleCard;
    deleteCard();
    editCard();
}

async function getData() {
    const url = 'http://localhost:3000/users/';
    const res = await fetch(url);
    data = await res.json();
    data.forEach(userCard);
}

getData();

//detect DELETE action
function deleteCard() {
    var allDeleteBtn = document.querySelectorAll('.delete');
    allDeleteBtn.forEach(function (el) {
        el.addEventListener('click', function () {
            var deleteConfirm = document.querySelector('.container-confirm-detele');
            deleteConfirm.style.display = 'block';

            var deleteButton = document.querySelector('.delete-button');
            deleteButton.setAttribute("id", this.id);
            deleteButton.addEventListener('click', function () {
                fetch('http://localhost:3000/users/' + this.id, {
                    method: 'DELETE'
                });
                var element = document.querySelector(`#memb-card${this.id}`);
                element.remove();
                deleteConfirm.style.display = 'none';
            });

            var cancelButton = document.querySelector('.cancel-button');
            cancelButton.addEventListener('click', function () {
                deleteConfirm.style.display = 'none';
                deleteButton.removeAttribute("id");
            });
        });
    });
}

// detect EDIT action
let add = document.querySelector('.add-member');
let edit = document.querySelector('.edit-member');

let backBtn = document.querySelector('.back-btn');
backBtn.addEventListener('click', function () {
    edit.style.display = 'none';
    add.style.display = 'block';
})

function editCard() {
    var editBtn = document.querySelectorAll('.edit');
    editBtn.forEach(function (el) {
        el.addEventListener('click', function () {
            let width = window.innerWidth;
            if (width < 1025) {
                add.style.display = 'none';
                edit.style.display = 'block';
            };
            fetch('http://localhost:3000/users/' + this.id, {
                method: "GET",
            })
                .then(response => response.json())
                .then(function (data) {
                    document.getElementById('e-firstName').value = data.firstName;
                    document.getElementById('e-lastName').value = data.lastName;
                    document.getElementById('e-address').value = data.address.streetAndNumber;
                    document.getElementById('e-zipCode').value = data.address.postalCode;
                    document.getElementById('e-city').value = data.address.city;
                    document.getElementById('e-country').value = data.address.country;
                    document.getElementById('e-gender').value = data.gender;
                    document.getElementById('e-age').value = data.age;
                    document.getElementById('e-id').value = data.id;

                    let radioboxes = document.querySelectorAll('input[name="e-activity_class"]');
                    radioboxes.forEach(activity => {
                        if (data.activity_class === activity.value) {
                            activity.checked = true;
                        }
                    });

                    let checkboxes = document.querySelectorAll('input[name="e-sports"]');
                    checkboxes.forEach(sport => {
                        if (data.sports.includes(sport.value)) {
                            sport.checked = true;
                        }
                    });
                })
                .catch(err => console.log('err: ', err));
        });
    });
}
