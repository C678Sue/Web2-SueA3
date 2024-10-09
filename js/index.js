// Home list template
function template(data, index) {
    return `
          <li class="item" onclick="toDetails(${data.FUNDRAISER_ID})">
            <div class="card">
              <div class="image">
                <img class="img" src="./image/img${data.FUNDRAISER_ID}.png" alt="" />
                <div class="money">
                  <p class="text-base">Current:&nbsp;$${data.CURRENT_FUNDING}</p>
                  <p class="text-base">Target:&nbsp;$${data.TARGET_FUNDING}</p>
                </div>
              </div>
              <div class="info">
                <h4>${data.CAPTION}</h4>
                <div class="combination">
                    <p class="address">${data.ORGANIZER}</p>
                  <p>|</p>
                  <p class="type">${data.CATEGORY_NAME}</p>
                  <p>|</p>
                  <p class="address">${data.CITY}</p>
                  <p>|</p>
                  <p class="type">${data.ACTIVE === 1 ? 'Underway' : 'Stop'}</p>
                </div>
                <div class="about">
                 ${data.DESCRIPTION}
                </div>
              </div>
            </div>
          </li>
      `
  }
  // Get home page list
function getFundraisers() {
    fetch('http://localhost:3090/fundraisers')
      .then(response => response.json())
      .then(res => {
        res.forEach((element, index) => document.getElementById('A').insertAdjacentHTML('beforeend', template(element, index)))
      })
  }
  //Add a scrolling fade-out effect to the welcome message
function setWelcome() {
    window.addEventListener('scroll', function () {
      //Get the element with the ID 'welcome'
      const welcomeMessage = document.getElementById('welcome')
      const welcomeSection = document.querySelector('.welcome-section')
      //If the page scrolls more than 65 pixels, add the 'fade-out' class to the 'welcomeMessage' element
      if (window.scrollY > 65) {
        welcomeMessage.classList.add('fade-out')
      } else {
        welcomeMessage.classList.remove('fade-out')
      }
      //If the page scrolls more than 150 pixels, add the 'fade-out' class to the 'welcomeSection' element
      if (window.scrollY > 150) {
        welcomeSection.classList.add('fade-out')
      } else {
        welcomeSection.classList.remove('fade-out')
      }
    })
  }
  function getFormData() {
    const urlParams = new URLSearchParams(window.location.search)
    const local = JSON.parse(localStorage.getItem('details'))
    const formData = {
      FUNDRAISER_ID: urlParams.get('id'),
      AMOUNT: document.getElementById('AMOUNT').value,
      GIVER: document.getElementById('GIVER').value,
      Name: local.ORGANIZER,
    }
  
    return formData
  }