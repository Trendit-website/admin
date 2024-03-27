const accessToken = localStorage.getItem('accessToken');
const formData = new FormData();
formData.append('item_type', 'item_type');


fetch('/api/items/new', {
  method:'POST',
  body: formData,
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch((error) => {
  console.error('Error', error);
});
