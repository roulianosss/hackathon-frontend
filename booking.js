const cardBooking = document.querySelector('#booking-card')
function displayBooking() {
    let total = 0
    fetch('http://localhost:3000/booking')
    .then(res => res.json())
    .then(allBookingItem => {
        if (!allBookingItem.length) {
            cardBooking.innerHTML = `
                <div id="cart-card">
                    <p>No tickets in your cart</p>
                    <br>
                    <p>Why not plan a trip?</p>
                </div>
            `
            return
        }
        console.log(allBookingItem)
        cardBooking.innerHTML = `<h2>My Booking</h2>` 
        let itemsList = document.createElement('div')
        itemsList.className = 'items-list'
        allBookingItem.forEach(item => {
            console.log(item.price)
            total += item.price
            itemsList.innerHTML += `
                <div class='item-row' data-id='${item._id}'>
                    <p id='trip-info'>${item.departure} > ${item.arrival}</p>
                    <p>${item.date.split('T')[1].split(':').slice(0, -1).join(':')}</p>
                    <p>${item.price}€</p>
                    <p>Departure in bientot</p>
                </div> `
        })
        cardBooking.append(itemsList)
        cardBooking.innerHTML += `
            <hr>
            <p id='slogan'>Enjoy your travels with Tickethack!</p>  
        `
        document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleRemove))
        document.querySelectorAll('#purchase-btn').forEach(btn => btn.addEventListener('click', handlePurchase))
})
}

displayBooking()