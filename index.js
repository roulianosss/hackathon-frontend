const btnSearch = document.querySelector('#btn-search')
let cardResult = document.querySelector('#card-result')
btnSearch.addEventListener('click', handleSearch)
// fonction pour rechercher des trips dans la BDD
function handleSearch(e) {
    const [departure, arrival, date] = document.querySelectorAll('input')
    if (departure.value === '' || arrival.value === '' || date.value === '') {
        cardResult.innerHTML = `
        <img src="./images/notfound.png" alt="">
        <hr>
        <p>No trip found.</p>
        `
        return
    }
    fetch('http://localhost:3000/trips/new', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
            departure: departure.value.trim(),
            arrival: arrival.value.trim(),
            date: date.value
        })
	})
    .then(res => res.json())
    .then(filteredTrips => {
        if (!filteredTrips.length){
            cardResult.innerHTML = `
                <img src="./images/notfound.png" alt="">
                <hr>
                <p>No trip found.</p>
        `
        return
        }
        cardResult.innerHTML =''
        filteredTrips.forEach(trip =>{
            cardResult.innerHTML += `
                <div class='result-row' data-id='${trip._id}'>
                    <p>${trip.departure} > ${trip.arrival}</p>
                    <p>${trip.date.toLocaleString().split('T')[1].split(':').slice(0, -1).join(':')}</p>
                    <p>${trip.price}€</p>
                    <button class='btn-book' id='btn-${trip._id}'>Book</button>
                </div>`
        })
        const allBookingBtn = document.querySelectorAll('.btn-book')
        allBookingBtn.forEach(btn => btn.addEventListener('click', handleBooking))
    })
}
function handleBooking(e) {
    fetch(`http://localhost:3000/cart/add/${this.parentNode.getAttribute('data-id')}`)
    window.location.assign('./cart.html')
}

// ///// fetch test

