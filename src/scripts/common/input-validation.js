const reg1 = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
const input = document.querySelector('#input');
const message = document.querySelector('.subscription__message');
const btn = document.querySelector('.subscription__btn');
const userData = {};

btn.addEventListener('click', function (e) {
  e.preventDefault();

  if (!validateEmail(input.value, reg1)) {
    notValidateEmail(input, message, '');
    alert(`You have entered incorrect information. Please enter a valid email address, e.g. example@gmail.com`);
  } else {
    validEmail(input, message, '');
    userData.userEmail = input.value;
    input.value = '';
    alert(`Thank you for subscribing with email: ${userData.userEmail}`);
  }
}); 

function validateEmail(input, regex) {
  return regex.test(input);
}

function notValidateEmail(input, element, message) {
  input.classList.add('is-invalid');
  input.classList.remove('is-valid');
  element.innerHTML = message;
}

function validEmail(input, element, message) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  element.innerHTML = message;
  setTimeout(function () {
    input.classList.remove('is-valid');
  }, 3000);
}