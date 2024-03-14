function search() {
  const data = document.getElementById('search').value

  fetch(`http://localhost:3000/${data}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
    })
}
