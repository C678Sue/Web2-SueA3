// Search
function search() {
  // Get form form data
  const organizer = document.getElementById('C').value
  const city = document.getElementById('D').value
  const categoryId = document.getElementById('E').value
  // Inquire
  getSearch({ organizer, city, categoryId })
}

// clear form DATA
function clearCheckboxes() {
  document.getElementById('C').value = ''
  document.getElementById('D').value = ''
  document.getElementById('E').value = ''
  getSearch({})
}

// Jump to details page
function toDetails(id) {
  window.location.href = './details.html?id=' + id
}

// Go to the Donate page
function toDonate(id) {
  window.location.href = './donate.html?id=' + id
}

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

// Get a list of donations
function getDonatesTemplate(data) {
  let tem = ''
  ;(data.donates || []).forEach((item, index) => {
    return (tem += `
              <div style="display:flex;flex-direction: column;border-bottom: 1px solid rgba(0,0,0,.063);margin-bottom: 16px">
                <div style="margin:0;font-weight:700">${item.GIVER} - $ ${item.AMOUNT} AUD</div>
                <div style="margin-top:8px;margin-bottom:8px;font-size:.75em">${item.formatted_date}</div>
              </div>`)
  })
  if (data.donates.length === 0) {
    tem = `<div style="width:100%;color:#999">No donations have been made</div>`
  }
  return tem
}

// Detail template
function templateDetail(data) {
  return `
	<div class="widthCenter">
        <div class="left">
          <img src="./image/img${data.FUNDRAISER_ID}.png" alt="" />
          <h4>${data.CAPTION}</h4>
          <div class="combination">
            <p class="address">${data.CITY}</p>
            <p class="address">${data.CATEGORY_NAME}</p>
            <p class="type">${data.ACTIVE === 1 ? 'Underway' : 'Stop'}</p>
          </div>
          <div class="about">
            ${data.DESCRIPTION}
          </div>
        </div>
        <div class="right">
          <div class="card">
            <div class="money">
              <p class="text-base">Current:&nbsp;$${data.CURRENT_FUNDING}</p>
              <p class="text-base">Target:&nbsp;$${data.TARGET_FUNDING}</p>
            </div>
            <div class="dinfo">
              <div>Campaign created by RiseTogether Charities</div>
              <div>Campaign funds will be received by RiseTogether Charities</div>
            </div>
            <div style="padding: 16px"><div class="button" onclick='toDonate(${data.FUNDRAISER_ID})'>Donate</div></div>
          </div>
          <div class="card" style="margin-top:32px;padding:16px;justify-content:start;width:100%">
            <h2 style="margin-top:0">Recent Donations</h2>
            <div style="width:100%;display:flex;flex-direction: column;">
              ${getDonatesTemplate(data)}
            </div>
          </div>
        </div>
      </div>
	`
}

// Donates form template
function donatesFormTemplate() {
  const local = JSON.parse(localStorage.getItem('details'))
  return `
    <div class="donate-left">
          <h2>Donate to ${local.CAPTION}</h2>
          <p>
            <em>"What we do is not what we achieve, but what we do to help others."</em>
          </p>
          <p>
            <em> --Winston Churchill</em>
          </p>
          <h4>Donation Amount:</h4>
          <input type="number" min="0" id="AMOUNT" placeholder="Please enter a value of no less than 5 AUD" />
          <h4>Name:</h4>
          <input id="GIVER" placeholder="Name" />
          <div><a href="#" class="button" onclick="submitMyDonate()">Submit my donation</a></div>
        </div>
        <div class="donate-right">
          <div class="img"><img src="./image/img${local.FUNDRAISER_ID}.png" alt="" /></div>
          <h4>About the Organizer:</h4>
          <p>${local.ORGANIZER}, ${local.CITY}</p>
        </div>
  `
}

// Selector
function templateOption(data) {
  return `<option value="${data.CATEGORY_ID}" style="height: 0">${data.NAME}</option>`
}

// Get home page list
function getFundraisers() {
    fetch('http://localhost:3090/fundraisers')
      .then(response => response.json())
      .then(res => {
        res.forEach((element, index) => document.getElementById('A').insertAdjacentHTML('beforeend', template(element, index)))
      })
  }

// Get details
function getDetails(id, isRender = true) {
  fetch('http://localhost:3090/fundraiser/' + id)
    .then(response => response.json())
    .then(res => {
      localStorage.setItem('details', JSON.stringify(res))
      if (isRender) {
        document.getElementById('B').insertAdjacentHTML('beforeend', templateDetail(res))
      }
    })
}

// Get all categories
function getCategories() {
  fetch('http://localhost:3090/categories')
    .then(response => response.json())
    .then(res => {
      res.forEach(item => document.getElementById('E').insertAdjacentHTML('beforeend', templateOption(item)))
    })
}

// Get search list
function getSearch(params) {
  const paramsUrl = new URLSearchParams(params)
  fetch(`http://localhost:3090/search?${paramsUrl}`)
    .then(response => response.json())
    .then(res => {
      document.getElementById('F').innerHTML = ''
      if (res.length === 0) {
        return (document.getElementById('F').innerHTML = `<div class="tips">No relevant information found</div>`)
      }
      res.forEach(item => document.getElementById('F').insertAdjacentHTML('beforeend', template(item)))
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

  function submitMyDonate() {
    const data = getFormData()
    console.log(data)
    if (Number(data.AMOUNT) < 5) return alert('The minimum donation amount is AUD 5')
    fetch(`http://localhost:3090/donation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (res.status === 200) {
        alert('Thank you for your donation to ' + data.Name)
        setTimeout(() => {
          window.location.replace('./details.html?id=' + data.FUNDRAISER_ID)
        }, 200)
      }
    })
  }