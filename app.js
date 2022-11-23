class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const {name,price,year} = product;

    const productList = document.getElementById('product-list');
    const element = document.createElement('DIV');
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body">
          <strong> Product Name: </strong> ${name}
          <strong> Product Price: </strong> ${price}
          <strong> Product Year: </strong>${year}
          <a href="#" class="btn btn-danger rounded" name="delete">Delete</a>
        </div>
      </div>
    `;

    productList.appendChild(element);

  }

  resetForm() {
    document.getElementById('product-form').reset();
  }

  deleteProduct(element) {
    if(element.name === 'delete'){
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage('Product Deleted Successfully', 'success');
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement('DIV');
    div.className = `alert alert-${cssClass} mt-4 text-center`;
    div.appendChild(document.createTextNode(message));
    // Showing in DOM
    const container = document.querySelector('.container');
    const app = document.querySelector('#app');
    container.insertBefore(div, app);

    setTimeout(() => {
      div.remove();
    }, 3000);

  }
}

// DOM Event
document.getElementById('product-form').addEventListener('submit', function(e) {

  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const year = document.getElementById('year').value;
  
  const product = new Product(name, price, year);
  
  const ui = new UI();

  if(name === '' || price === '' || year === ''){
    return ui.showMessage('Complete Fields Please', 'danger');
  }

  ui.addProduct(product);
  ui.resetForm();
  ui.showMessage('Product Added Successfully', 'success');

  e.preventDefault();
});

document.getElementById('product-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteProduct(e.target);
});


