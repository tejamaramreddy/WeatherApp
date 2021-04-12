const weatherForm = document.querySelector('form')
const inputlocation = document.querySelector('input')
const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
     inputlocaionvalue = inputlocation.value
     msg1.textContent = 'loading....'
     msg2.textContent = ''
     fetch('http://localhost:3003/weather?address='+inputlocaionvalue).then((response)=>{
       
    response.json().then((data)=>{
      
        if(data.error){
            msg1.textContent = data.error
        }
        else{
            msg1.textContent = data.location
            msg2.textContent = data.forecast
        }
    })
})
 
})