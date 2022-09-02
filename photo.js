const loadPhoto = () => {
  const url = 'https://jsonplaceholder.typicode.com/photos';
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoto(data))
}

const displayPhoto = (photos) => {
  const picture = photos.slice(0, 100);
  picture.forEach(photo => {
    // console.log(photo);
    const photoContainer = document.getElementById('photo-container');
    const photoDiv = document.createElement('div');
    photoDiv.classList.add('col');
    photoDiv.innerHTML = `
    <div class="card">
      <img src="${photo.url}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${photo.title}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="loadPhotoDetail('${photo.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#photoModal">See Details</button>
      </div>
    </div>
    `;
    photoContainer.appendChild(photoDiv);
  });
}

const loadPhotoDetail = async (id) =>{
  const url = `https://jsonplaceholder.typicode.com/photos/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhotoModal(data);
}

const displayPhotoModal = (photoForModal) =>{
    // console.log(photoForModal);
    const photoModalTitle = document.getElementById('photoModalLabel');
    photoModalTitle.innerText = `${photoForModal.title}`;
    const photoModalBody = document.getElementById('modal-body');
    photoModalBody.innerHTML = `
      <img src="${photoForModal.thumbnailUrl}"/>
      <p>Serial: ${photoForModal.id}</p>
    `;
    
  }

loadPhoto();