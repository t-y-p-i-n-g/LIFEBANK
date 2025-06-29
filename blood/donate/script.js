const form = document.getElementById('donateForm');
const successMessage = document.getElementById('successMessage');
const charCount = document.getElementById('charCount');
const address = document.getElementById('address');

// Live character counter
address.addEventListener('input', () => {
  charCount.textContent = `${address.value.length} / 250`;
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const requiredFields = ['name', 'mobile', 'age', 'gender', 'blood', 'address'];
  let valid = true;

  requiredFields.forEach(id => {
    const field = document.getElementById(id);
    if (!field.value.trim()) {
      field.classList.add('shake');
      valid = false;
      setTimeout(() => field.classList.remove('shake'), 300);
    }
  });

  if (valid) {
    successMessage.style.display = 'block';
    form.reset();
    charCount.textContent = '0 / 250';
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 4000);
  }
});
