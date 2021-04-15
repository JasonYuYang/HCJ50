const APIURL = 'https://api.github.com/users/';
const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
  } catch (err) {
    if (err.response.status === 404) {
      createErrorCard(err.message);
    }
  }
}
async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + '/repos?sort=created');
    // ?sort=created這段是因為如果直接擷取資料中陣列的第一到第五個repo他只會按照字母的先後順序給你五個，但我們要最新的五個，而githubAOI中就有這個指令可以用

    addReposToCard(data);
  } catch (err) {
    createErrorCard('Problem fetching repos');
  }
}
function createUserCard(user) {
  const cardHTML = `<div class="card">
  <div>
    <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
  </div>
  <div class="user-info">
    <h2>${user.name}</h2>
    <p>${user.bio}</p>
    <ul>
      <li>${user.followers} <strong>Followers</strong></li>
      <li>${user.following} <strong>Following</strong></li>
      <li>${user.public_repos} <strong>Repos</strong></li>
    </ul>

    <div id="repos"></div>
  </div>
</div>`;
  main.innerHTML = cardHTML;
}
function createErrorCard(msg) {
  const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;

  main.innerHTML = cardHTML;
}
function addReposToCard(repos) {
  const reposEl = document.getElementById('repos');

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
}
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = '';
  }
});
