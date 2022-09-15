// submit data from EDIT FORM
var editMember = document.getElementById('editMember');
editMember.addEventListener('submit', updateMember);

function updateMember(event) {
    event.preventDefault();

    let firstName = document.getElementById('e-firstName').value;
    let lastName = document.getElementById('e-lastName').value;
    let streetAndNumber = document.getElementById('e-address').value;
    let postalCode = document.getElementById('e-zipCode').value;
    let city = document.getElementById('e-city').value;
    let country = document.getElementById('e-country').value;
    let gender = document.getElementById('e-gender').value;
    let age = document.getElementById('e-age').value;
    let id = document.getElementById('e-id').value;

    let checkboxes = document.querySelectorAll('input[name="e-sports"]:checked');
    let sports = [];
    checkboxes.forEach(sport => sports.push(sport.value));

    let radioboxes = document.querySelectorAll('input[name="e-activity_class"]:checked');
    let activity_class = [];
    radioboxes.forEach(activity => activity_class.push(activity.value));

    fetch('http://localhost:3000/users/' + id, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            address:
            {
                streetAndNumber: streetAndNumber,
                postalCode: postalCode,
                city: city,
                country: country
            },
            sports: sports,
            gender: gender,
            age: age,
            activity_class: activity_class[0],
            id: id
        })
    })
    .then(response => response.json())
    .catch(error => {
        console.log("Error: ", error);
        document.querySelector('.toast-error').style.display = 'block';     
        });

   editMember.reset();
   location.reload();
}
