// How to structure a fetch so that it only needs to be called once.
// Do it like this, then put it in a function
// fetch('http://localhost:3000/ramens')
// .then(res => return res.json()) <--- This will return the array needed
// .then(ramensArray => console.log(ramensArray))

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#new-ramen')
  const ramenMenu = document.querySelector('#ramen-menu')

  form.addEventListener('submit', (event) => {
    event.preventDefault()

    const newRamen = {
      name: event.target.name.value,
      image: event.target.image.value,
      restaurant: event.target.restaurant.value,
      rating: event.target.rating.value,
      comment: event.target["new-comment"].value
    }

    addNewRamen(newRamen)

    const img = document.createElement('img')
    img.src = newRamen.image
    ramenMenu.append(img)
    img.addEventListener('click', (e) => renderRamenDetail(newRamen))
  })

  function addNewRamen(ramenObj) {
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(ramen)
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  function deleteRamen(ramenObj) {
    fetch(`http://localhost:3000/ramens/${ramenObj.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }
  
  function renderRamenMenu() {
    
    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(ramenList => ramenList.forEach(ramen => {
      const img = document.createElement('img')
      img.src = ramen.image
      ramenMenu.append(img)
      img.addEventListener('click', (e) => renderRamenDetail(ramen))
    }))
  }

  function renderRamenDetail(ramen) {
    const ramenDisplay = document.querySelector('#ramen-detail')
    const img = document.querySelector('.detail-image')
    const name = document.querySelector('.name')
    const restaurant = document.querySelector('.restaurant')
    const rating = document.querySelector('#rating-display')
    const comment = document.querySelector('#comment-display')
    const deleteButton = document.createElement('button')

    img.src = ramen.image
    name.innerText = ramen.name
    restaurant.innerText = ramen.restaurant
    rating.innerText = ramen.rating
    comment.innerText = ramen.comment
    deleteButton.innerText = 'Delete Ramen'
    deleteButton.id = 'delete-button'
    // deleteButton.addEventListener('click', (e) => deleteRamen())

    ramenDisplay.append(deleteButton)
  }

  renderRamenMenu()
})

  // Fetch functions
  // function fetchRamens() {
  //   return fetch('http://localhost:3000/ramens')
  //   .then(res => res.json())
  //   .then(data => renderRamenMenu(data))
  // }