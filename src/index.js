document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4069

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch('https://randopic.herokuapp.com/images/4069')
  .then(resp => resp.json())
  .then(imageData => showImage(imageData))

  function showImage(imageData){
    const img = document.querySelector('img')
    img.src = "http://blog.flatironschool.com/wp-content/uploads/2017/06/5-year-event-352x200.jpg"

    const imgTitle = document.querySelector('h4')
    imgTitle.innerHTML = imageData.name 

    const likeSpn = document.querySelector('#likes')
    likeSpn.innerHTML = imageData.like_count
    let likes = likeSpn.innerHTML

    const ulList = document.querySelector('ul')


    const comm = imageData.comments

    
    comm.forEach(c => {
      const liComm = document.createElement('li')
      liComm.innerHTML = c.content
      ulList.append(liComm)
      
    })

    const divCard = document.querySelector('#image_card')
    
    divCard.addEventListener('click', function (event){
      if(event.target.innerHTML === 'Like'){
      
        const reqObj = {
          method:'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
          "id": 1,
          "image_id": 4069})
        }

        fetch(likeURL, reqObj)
        .then(resp => resp.json())
        .then(like => console.log(like))

        likeSpn.innerHTML++
      }
    })
  }


  const commForm = document.querySelector('form')

  commForm.addEventListener('submit', function(event){
  if(event.target.id === 'comment_form'){
    event.preventDefault();
  
  
  
    const ulList = document.querySelector('ul')
    const liComm = document.createElement('li')
    const commInput = document.querySelector('#comment_input')
    const newComment = commInput.value
  
    commInput.value = ''
  
    liComm.append(newComment)
    ulList.append(liComm)
  
    const reqObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      "id": 1,
      "content": newComment,
      "image_id": 4069})
    }
  
    fetch(commentsURL, reqObj)
    .then(resp => resp.json())
    .then(input => console.log(input))
  }
  })
})
