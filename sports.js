// console.log("connected");

const loadPlayers = () => {
  for (let i = 34146300; i < 34146400; i++) {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${i}`;
    fetch(url)
      .then(res => res.json())
      .then(data => displayPlayers(data.players ? data.players : displayPlayers()))
      .catch(error => delete error)
  }
}

const displayPlayers = players => {
  for (const player of players) {
    // console.log(player);
    const playerContainer = document.getElementById('player-container');
    const playerDiv = document.createElement('div');
    playerDiv.classList.add('col');
    playerDiv.innerHTML = `
      <div class="card">
        <img src="${player?.strThumb ? player?.strThumb : player?.strCutout}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${player.strPlayer}</h5>
          <p class="card-text">${player.strGender}</p>
          <p class="card-text">${player.strHeight}</p>
          <p class="card-text">${player.strPosition}</p>
          <p class="card-text">${player.strDescriptionEN.slice(0, 100)}</p>
          <button onclick="loadPlayerDetails(${player.idPlayer})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#playerModal">See Details</button>
        </div>
      </div>
    `;
    playerContainer.appendChild(playerDiv);
  }
}

const loadPlayerDetails = (id) =>{
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayPlayerDetails(data.players[0]))
}

const displayPlayerDetails = player =>{
  const playerTitle = document.getElementById('playerModalLabel');
  playerTitle.innerText = `${player.strPlayer}`;
  const playerModalBody = document.getElementById('playerModalBody');
  playerModalBody.innerHTML = `
    <img class="card-img" src="${player.strThumb}"/>
    <p class="card-text">${player.strGender}</p>
    <p class="card-text">${player.strHeight}</p>
    <p class="card-text">${player.strPosition}</p>
    <p class="card-text">${player.strDescriptionEN.slice(0, 100)}</p>
  `;
}

loadPlayers();