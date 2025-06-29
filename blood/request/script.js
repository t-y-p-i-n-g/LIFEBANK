const spinnerCountry = document.getElementById("spinner-country");
const spinnerState = document.getElementById("spinner-state");
const spinnerCity = document.getElementById("spinner-city");

window.onload = () => {
  spinnerCountry.style.visibility = "visible";
  fetch('https://countriesnow.space/api/v0.1/countries/positions')
    .then(res => res.json())
    .then(({ data }) => {
      const countrySel = document.getElementById('country');
      data.map(c => c.name).forEach(name => {
        countrySel.insertAdjacentHTML('beforeend', `<option>${name}</option>`);
      });
      spinnerCountry.style.visibility = "hidden";
    });
};

function fetchStates() {
  const country = document.getElementById('country').value;
  const stateSel = document.getElementById('state');
  const citySel = document.getElementById('city');
  stateSel.innerHTML = '<option>-----Select-----</option>';
  citySel.innerHTML = '<option>-----Select-----</option>';

  spinnerState.style.visibility = "visible";

  fetch('https://countriesnow.space/api/v0.1/countries/states', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country })
  })
  .then(res => res.json())
  .then(({ data }) => {
    (data.states || []).forEach(s =>
      stateSel.insertAdjacentHTML('beforeend', `<option>${s.name}</option>`)
    );
    spinnerState.style.visibility = "hidden";
  });
}

function fetchCities() {
  const country = document.getElementById('country').value;
  const state = document.getElementById('state').value;
  const citySel = document.getElementById('city');

  citySel.innerHTML = '<option>-----Select-----</option>';
  spinnerCity.style.visibility = "visible";

  fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country, state })
  })
  .then(res => res.json())
  .then(({ data }) => {
    (data || []).forEach(city =>
      citySel.insertAdjacentHTML('beforeend', `<option>${city}</option>`)
    );
    spinnerCity.style.visibility = "hidden";
  });
}

// Modal Logic
const modal = document.getElementById('resultModal');
const closeBtn = document.querySelector('.close');
const searchBtn = document.getElementById('searchBtn');
const summaryText = document.getElementById('summaryText');

searchBtn.addEventListener('click', e => {
  e.preventDefault();

  const bg = document.getElementById('bloodGroup').value;
  const ctry = document.getElementById('country').value;
  const st = document.getElementById('state').value;
  const city = document.getElementById('city').value;
  const email = document.getElementById('email').value;

  summaryText.innerHTML = `
    <strong>Blood Group:</strong> ${bg}<br>
    <strong>Country:</strong> ${ctry}<br>
    <strong>State:</strong> ${st}<br>
    <strong>City:</strong> ${city}<br>
    <strong>Email:</strong> ${email}
  `;
  modal.style.display = 'block';
});

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };
