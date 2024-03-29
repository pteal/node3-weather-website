//console.log('Client side Javascript file loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    //console.log(location)

    messageOne.textContent = 'Loading forecast...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                return 
            }
    
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})




