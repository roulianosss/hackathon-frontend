const cartCard = document.querySelector('#cart-card')

//fonction qui affiche le panier
function displayCart() {
    let total = 0
    fetch('http://localhost:3000/cart')
    .then(res => res.json())
    .then(allCartItem => {
        if (!allCartItem) return
        cartCard.innerHTML = `<h2>My Cart</h2>` 
        let itemsList = document.createElement('div')
        itemsList.className = 'items-list'
        allCartItem.forEach(item => {
            console.log(item.price)
            total += item.price
            itemsList.innerHTML += `
                <div class='item-row' data-id='${item._id}'>
                    <p>${item.departure} > ${item.arrival}</p>
                    <p>${item.date.split('T')[1].split(':').slice(0, -1).join(':')}</p>
                    <p>${item.price}</p>
                    <span class="delete-btn">✖</span>
                </div> `
        })
        cartCard.append(itemsList)
        cartCard.innerHTML += `
            <div class='footer-cart'>
                <p>Total: ${total}</p>
                <button id='purchase-btn'>Purchase</button>
            </div>`
        document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleRemove))
        document.querySelectorAll('#purchase-btn').forEach(btn => btn.addEventListener('click', handlePurchase))
})
}
//////// fonction pour supprimer un element du panier
function handleRemove(e) {
    fetch(`http://localhost:3000/cart/delete/${this.parentNode.getAttribute('data-id')}`, {
        method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})
    .then(res => res.json())
    .then(data => displayCart())
    
    
}
/////// fonction pour valider le panier
function handlePurchase(e) {
    document.querySelectorAll('.item-row')
    const allId = [...document.querySelectorAll('.item-row')].map(el => el.getAttribute('data-id'))
    fetch(`http://localhost:3000/booking/add`)
    
}
displayCart()
// {
    //     "_id": "636a5deb5537701feb45e2ab",
    //     "departure": "Paris",
    //     "arrival": "Marseille",
    //     "date": "2022-11-08T11:00:15.780Z",
    //     "price": 83,
    //     "__v": 0
    // }