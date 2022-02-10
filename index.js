// Change navigation bar color on scroll
window.onscroll = function () {
  const navbar = document.querySelector('.navbar');
  const navLinkArray = document.querySelectorAll('.nav-link');
  if (
    document.body.scrollTop >= 10 ||
    document.documentElement.scrollTop >= 10
  ) {
    navbar.classList.add('nav-colored');
    navbar.classList.remove('nav-transparent');
    navLinkArray.forEach((navLink) => {
      navLink.classList.add('toggler-hidden');
    });
  } else {
    navbar.classList.add('nav-transparent');
    navbar.classList.remove('nav-colored');
    navLinkArray.forEach((navLink) => {
      navLink.classList.remove('toggler-hidden');
    });
  }
};

function catchSubscription(event) {
  const subscribeForm = document.getElementById('subscribe-form');
  const formName = document.getElementById('formName');
  const formData = new FormData(event.target);
  const userName = document.getElementById('formEmail').value;
  const email = document.getElementById('formName').value;
  const popup = document.getElementById('success');
  const error = document.getElementById('error');
  const invalidEmail = document.getElementById('invalidEmail');

  // Prevents submitting urlEncoded and sends AJAX instead
  event.preventDefault();
  if (userName && email) {
    popup.classList.remove('hidden');
    setTimeout(() => {
      popup.classList.add('hidden');
    }, 2500);
    subscribeForm.reset();
    formName.focus();
    const values = Object.fromEntries(formData.entries());
    console.log(values);
    const JSONdata = JSON.stringify(values);
    postSubscribtion(JSONdata);
  } else if (userName === '' || email === '') {
    // Validates empty inputs
    error.classList.remove('hidden');
    setTimeout(() => {
      error.classList.add('hidden');
    }, 2500);
    return false;
  }
}

async function postSubscribtion(JSONdata) {
  const API_URL = 'http://localhost:3000/';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSONdata,
  };
  const request = await fetch(`${API_URL}`, options);
  const response = await request.json();
  console.log(`response is `, response);
}


// else if (!email.includes('@')) {
//     invalidEmail.classList.remove('hidden');
//     setTimeout(() => {
//       invalidEmail.classList.add('hidden');
//     }, 2500);
//     return false;
//   }