function submitForm() {
    var price = document.getElementById('price').value;
    var productName = document.getElementById('productName').value;
    var type = document.getElementById('type').value;
  
    // Save data to crudcrud
    axios.post('https://crudcrud.com/api/8ce1e2c8825e46a4a363f114830be757/adminPage', {
      price: price,
      productName: productName,
      type: type
    })
    .then(response => {
      console.log('Data saved:', response.data);
      fetchData();
    })
    .catch(error => {
      console.error('Error saving data:', error);
    });
  }
  
  function displayData(data) {
    var outputContainer = document.getElementById('outputContainer');
    outputContainer.innerHTML += `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Price: ${data.price}</h5>
          <p class="card-text">Type: ${data.type}</p>
          <p class="card-text">Product: ${data.productName}</p>
          <button class="btn btn-danger" onclick="deleteItem('${data._id}')">Delete</button>
        </div>
      </div>
    `;
  }
  
  function deleteItem(id) {
    axios.delete(`https://crudcrud.com/api/8ce1e2c8825e46a4a363f114830be757/adminPage/${id}`)
      .then(response => {
        console.log('Item deleted:', id);
        fetchData();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  }
  
  function fetchData() {
    axios.get('https://crudcrud.com/api/8ce1e2c8825e46a4a363f114830be757/adminPage')
      .then(response => {
        console.log('Data fetched:', response.data);
        var outputContainer = document.getElementById('outputContainer');
        outputContainer.innerHTML = '';
  
        // Group data by type
        var groupedData = groupByType(response.data);
  
        // Display cards for each group
        Object.keys(groupedData).forEach(type => {
          outputContainer.innerHTML += `<h3>${type}</h3>`;
          groupedData[type].forEach(data => {
            displayData(data);
          });
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
  
  function groupByType(data) {
    var groupedData = {};
    data.forEach(item => {
      if (!groupedData[item.type]) {
        groupedData[item.type] = [];
      }
      groupedData[item.type].push(item);
    });
    return groupedData;
  }
  
  // Fetch initial data on page load
  fetchData();
  