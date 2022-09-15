// submit data from ADD FORM
var addMember = document.getElementById('addMember');
addMember.addEventListener('submit', saveMember);

function saveMember(event) {
    event.preventDefault();

    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let streetAndNumber = document.getElementById('address').value;
    let postalCode = document.getElementById('zipCode').value;
    let city = document.getElementById('city').value;
    let country = document.getElementById('country').value;
    let gender = document.getElementById('gender').value;
    let age = document.getElementById('age').value;

    let radioboxes = document.querySelectorAll('input[name="activity_class"]:checked');
    let activity_class = [];
    radioboxes.forEach(activity => activity_class.push(activity.value));

    let checkboxes = document.querySelectorAll('input[name="sports"]:checked');
    let sports = [];
    checkboxes.forEach(sport => sports.push(sport.value));

    fetch('http://localhost:3000/users/', {
        method: 'POST',
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
            activity_class: activity_class[0]
        })
    })
    .then(response => {
        response.json();
        document.querySelector('.toast-ok').style.display = 'block';
        addMember.reset();
        setTimeout(() => location.reload(), 5000);

    })
    .catch(error => console.log("Error: ", error));
}
