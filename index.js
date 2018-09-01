let currentPage = 1;

function getMonsterData() {
  fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
  .then(r => r.json())
  .then(json => renderAllMonsters(json))
}

function postMonsterData() {
  const monsterName = document.querySelector('#new-monster-name').value;
  const monsterAge = document.querySelector('#new-monster-age').value;
  const monsterDescription = document.querySelector('#new-monster-description').value;
  const data = {name: monsterName, age: monsterAge, description: monsterDescription};

  fetch('http://localhost:3000/monsters?_limit=50', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(r => r.json())
  .then(json => renderMonster(json))
}

function renderAllMonsters(json) {
  json.forEach(monster => renderMonster(monster));
}

function renderMonster(monster) {
  const monsterContainer = document.querySelector('#monster-container');
  const monsterDiv = document.createElement('div');
  const monsterNameElement = document.createElement('h2');
  const monsterAgeElement = document.createElement('h4');
  const monsterDescriptionElement = document.createElement('p');

  monsterNameElement.innerText = monster.name;
  monsterAgeElement.innerText = monster.age;
  monsterDescriptionElement.innerText = monster.description;

  monsterDiv.appendChild(monsterNameElement);
  monsterDiv.appendChild(monsterAgeElement);
  monsterDiv.appendChild(monsterDescriptionElement);
  monsterContainer.appendChild(monsterDiv);
}

function renderMonsterForm() {
  const monsterFormContainer = document.querySelector('#create-monster');
  const newMonsterForm = document.createElement('form');
  const monsterNameInput = document.createElement('input');
  const monsterAgeInput = document.createElement('input');
  const monsterDescriptionInput = document.createElement('input');
  const newMonsterSubmit = document.createElement('input');

  monsterNameInput.placeholder = 'name...';
  monsterNameInput.id = 'new-monster-name';
  monsterAgeInput.placeholder = 'age...';
  monsterAgeInput.id = 'new-monster-age';
  monsterDescriptionInput.placeholder = 'description...';
  monsterDescriptionInput.id = 'new-monster-description';
  newMonsterSubmit.type = 'submit';
  newMonsterSubmit.value = 'Create';

  monsterFormContainer.appendChild(newMonsterForm);
  newMonsterForm.appendChild(monsterNameInput);
  newMonsterForm.appendChild(monsterAgeInput);
  newMonsterForm.appendChild(monsterDescriptionInput);
  newMonsterForm.appendChild(newMonsterSubmit);
}

function newMonsterHandler() {
  const newMonsterForm = document.querySelector('form');
  newMonsterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    postMonsterData();
    e.target.reset();
  })
}

function forwardHandler() {
  const forwardButton = document.querySelector('#forward');
  forwardButton.addEventListener('click', () => {
    const monsterContainer = document.querySelector('#monster-container');
    monsterContainer.innerHTML = '';
    currentPage++;
    getMonsterData();
  })
}

function backHandler() {
  const backButton = document.querySelector('#back');
  backButton.addEventListener('click', () => {
    const monsterContainer = document.querySelector('#monster-container');
    monsterContainer.innerHTML = '';
    currentPage--;
    getMonsterData();
  })
}

document.addEventListener('DOMContentLoaded', run);

function run() {
  getMonsterData();
  renderMonsterForm();
  newMonsterHandler();
  forwardHandler();
  backHandler();
}
