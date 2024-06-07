const formData = {
  email: '',
  message: '',
};

const feedbackForm = document.querySelector('.feedback-form');

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}

feedbackForm.addEventListener('input', () => {
  const dataForm = new FormData(feedbackForm);
  const email = dataForm.get('email');
  const message = dataForm.get('message');
  formData.email = email;
  formData.message = message;
  saveToLS('feedback-form-state', formData);
});

window.addEventListener('DOMContentLoaded', () => {
  const Data = loadFromLS('feedback-form-state');
  feedbackForm.elements.email.value = Data?.email ?? '';
  feedbackForm.elements.message.value = Data?.message ?? '';
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    return alert('Fill please all fields');
  } else {
    feedbackForm.reset();
    localStorage.clear();
    console.log(formData.email, formData.message);
  }
});
