const addition = document.querySelectorAll(".addition");
const addToCart = document.querySelectorAll(".add-to-cart");
const imgBorder = document.querySelectorAll(".img img")


addToCart.forEach(_add =>{
    _add.addEventListener("click", ()=>{
        const addCartId = _add.getAttribute("data-target")
        const targetCart = document.getElementById(addCartId)

        _add.classList.toggle("active")

        if(targetCart){
            targetCart.classList.toggle("active")
        }

        imgBorder.forEach(_img =>{
            _img.style.border = "2px solid hsl(14, 86%, 42%)"
        })
        
    })
})

function updateCartTotal() {
  const allQuantities = document.querySelectorAll('.classic-content .no');
  let total = 0;

  allQuantities.forEach(qty => {
    const value = parseInt(qty.textContent);
    if (!isNaN(value) && value > 0) {
      total += value;
    }

  });

  // Display the total somewhere — for example, in an element with ID "cart-total"
  const totalDisplay = document.getElementById('order-no');
  if (totalDisplay) {
    totalDisplay.textContent = total;
  }
}


function multiply() {
  const items = document.querySelectorAll('.classic-content');

  items.forEach(item => {
    const quantityEl = item.querySelector('.no');
    const unitEl = item.querySelector('.unit');
    const amountEl = item.querySelector('.amount');

    const quantity = parseInt(quantityEl.textContent) || 0;
    const unitPrice = parseFloat(unitEl.textContent) || 0;

    const total = quantity * unitPrice;
    amountEl.textContent = "$" + total.toFixed(2);
  });
}

function updateTotalAmount() {
  const amountElements = document.querySelectorAll('.classic-content .amount');
  let total = 0;

  amountElements.forEach(amountEl => {
    // Remove the "$" and parse the number
    const value = parseFloat(amountEl.textContent.replace('$', ''));
    if (!isNaN(value) && value > 0) {
      total += value;
    }
  });

  const totalDisplay = document.getElementById('total-amount');
  if (totalDisplay) {
    totalDisplay.textContent = total.toFixed(2);
  }
}

  addition.forEach(product => {
    const quantityDisplay = product.querySelector('.item-no');
    const increaseImg = product.querySelector('.plus');
    const decreaseImg = product.querySelector('.minus');
    const productId = product.dataset.id;

  
  // Find the matching cart summary for this product
  const cartSummaries = document.querySelectorAll(`.classic-content[data-id="${productId}"] .no`);


    // Increase quantity
    increaseImg.addEventListener('click', () => {
      quantityDisplay.textContent = parseInt(quantityDisplay.textContent) + 1;
      cartSummaries.forEach(summary => {
        summary.textContent = quantityDisplay.textContent;

        const order = document.querySelector(".order-total")
        order.classList.add("active")

        const item = document.querySelector(".items")
        item.style.display = "none"

        const targetId = increaseImg.dataset.target;

        // Show the item again if it was hidden
        const targetItem = document.querySelector(`#${targetId}`);
        targetItem.style.opacity = "1";
        targetItem.style.pointerEvents = "auto";
        document.querySelector(".order-total").style.opacity = "1";
    });

    updateCartTotal();
    multiply();
    updateTotalAmount()
     });
  
    // Decrease quantity
    decreaseImg.addEventListener('click', () => {
      const current = parseInt(quantityDisplay.textContent);
      if (current > 0) {
        quantityDisplay.textContent = current - 1; 
        cartSummaries.forEach(summary => {
          summary.textContent = quantityDisplay.textContent;
      });


      updateCartTotal();
      multiply();
      updateTotalAmount()
    }
    });
  });

  

  document.querySelectorAll(".plus").forEach(plus =>{
    plus.addEventListener("click", ()=>{
      const targetItemId = plus.getAttribute("data-target");
      const targetItem = document.getElementById(targetItemId);
 

      if(targetItem){
        targetItem.classList.add("active");
      };
        });
  });

  document.querySelectorAll(".delete").forEach(_delete =>{
      _delete.addEventListener("click", ()=>{
        const targetItemId =_delete.getAttribute("data-target");
        const targetItem = document.getElementById(targetItemId);
   
  
        if(targetItem){
          targetItem.classList.remove("active")
        };
      });
  });


  function confirmOrder() {
    const items = document.querySelectorAll('.classic-content');
    const confirmedItemsContainer = document.getElementById('confirmed-items');
    const confirmedTotalDisplay = document.getElementById('confirmed-total');
  
    confirmedItemsContainer.innerHTML = ''; // Clear previous content
    let total = 0;
  
    items.forEach(item => {
      const name = item.querySelector('h4').textContent;
      const qty = parseInt(item.querySelector('.no').textContent) || 0;
      const unit = parseFloat(item.querySelector('.unit').textContent) || 0;
      const amount = qty * unit;
     
  
      if (qty > 0) {
        total += amount;

        const wrapper = document.createElement('div');
        wrapper.classList.add('confirmed-wrapper');

      // // Create text block
      const textBlock = document.createElement('div');
      textBlock.classList.add('confirmed-text');

      const flexBox = document.createElement('div')
      flexBox.classList.add("cashout-items")
      
      const title = document.createElement('h4');
      title.textContent = name;
      title.classList.add('h4')

      const pricing = document.createElement('p');
      pricing.textContent = `${qty}x @ $${unit.toFixed(2)}`;
      

      const onlyTotal =document.createElement("div")
      
      const totalLine = document.createElement('p');
      totalLine.textContent = `$${amount.toFixed(2)}`;
      totalLine.classList.add('confirmed-subtotal');

      flexBox.appendChild(title);
      flexBox.appendChild(pricing);
       onlyTotal.appendChild(totalLine)

       textBlock.appendChild(flexBox)
       textBlock.appendChild(onlyTotal)

      wrapper.appendChild(textBlock);
      confirmedItemsContainer.appendChild(wrapper);
      }
    });
  
    confirmedTotalDisplay.textContent = `$${total.toFixed(2)}`;
    document.getElementById('confirmation-window').style.display = 'block';
    document.getElementById('main-content').classList.add('blurred');

  }

  function startNewOrder() {
    document.getElementById('confirmation-window').style.display = 'none';
    document.getElementById('main-content').classList.remove('blurred');

  
    const item = document.querySelector(".items");
    item.style.display = "flex";
  
    document.querySelectorAll(".classic").forEach(classic => {
      classic.style.opacity = "0";
      classic.style.pointerEvents = "none";
    });
  
    document.querySelector(".order-total").style.opacity = "1";
    document.getElementById("order-no").textContent = 0;
    document.getElementById("total-amount").textContent = "0.00"
  
    // Reset quantities and amounts
    document.querySelectorAll(".no").forEach(qty => qty.textContent = "0");
    document.querySelectorAll(".amount").forEach(amt => amt.textContent = "");
  }












