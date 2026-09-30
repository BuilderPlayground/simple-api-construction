// Goal: Build a simple front-end app that displays data returned from an api that would be beneficial to someone in the trades (construction, hvac, plumbing, etc)
// FLOW: get user input --> build URL --> fetch data --> turn response into JSON --> loop through returned permits --> create HTML elements --> put API data inide HTML elements --> append them to page

document.querySelector('#searchPermits').addEventListener('click', getPermits)

function getPermits(){
    const zipCode = document.querySelector('#zipCode').value
    
    const url = `https://data.cityofnewyork.us/resource/rbx6-tga4.json?$limit=5&zip_code=${zipCode}&$order=issued_date%20DESC`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            const results = document.querySelector('#results')

            results.innerText = ''

            if(data.length === 0){
                results.innerText = 'No permits found for that ZIP code.'
                return
            }

            data.forEach(permit => {
                const permitCard = document.createElement('section')
                permitCard.classList.add('permitCard')

                const address = document.createElement('h2')
                address.innerText = `${permit.house_no} ${permit.street_name}`

                const borough = document.createElement('p')
                borough.innerText = `Borough: ${permit.borough}`

                const workType = document.createElement('p')
                workType.innerText = `Work Type: ${permit.work_type}`

                const status = document.createElement('p')
                status.innerText = `Permit Status: ${permit.permit_status}`

                permitCard.appendChild(address)
                permitCard.appendChild(borough)
                permitCard.appendChild(workType)
                permitCard.appendChild(status)

                results.appendChild(permitCard)

            })
        })

        .catch(err => {
            console.log(`error ${err}`)
        })
}