// Clear the current page redirection and fix the issue that the back cannot be refreshed
function goBack(url) {
    window.location.replace(url) // 替换为目标
  }
  // OK to delete the prompt box
  function showConfirm(id) {
    const result = confirm('Are you sure you want to delete it?')
    if (result) {
      deleteFundraiser(id)
    }
  }
  
  // Prompt message
  function showMessage(type, message) {
    const alertBox = document.createElement('div')
    alertBox.className = 'message ' + (type === 'S' ? 'message-success' : 'message-error')
    alertBox.innerText = message
    document.body.appendChild(alertBox)
    setTimeout(() => {
      alertBox.remove()
    }, 2000)
  }
  
  // Search
  function searchTable() {
    // Get form form data
    const organizer = document.getElementById('organizer').value
    const city = document.getElementById('city').value
    const categoryId = document.getElementById('category').value
    // Inquire
    getFundraisers({ organizer, city, categoryId })
  }
  
  // clear form DATA
  function clearCheckboxes() {
    document.getElementById('organizer').value = ''
    document.getElementById('city').value = ''
    document.getElementById('category').value = ''
    getFundraisers({})
  }
  
  // Get the form data
  function getFormData() {
    const urlParams = new URLSearchParams(window.location.search)
    const formData = {
      id: urlParams.get('id'),
      ORGANIZER: document.getElementById('ORGANIZER').value,
      CAPTION: document.getElementById('CAPTION').value,
      TARGET_FUNDING: document.getElementById('TARGET_FUNDING').value,
      // CURRENT_FUNDING: document.getElementById('CURRENT_FUNDING').value,
      CITY: document.getElementById('CITY').value,
      ACTIVE: 1,
      CATEGORY_ID: document.getElementById('category').value,
      DESCRIPTION: document.getElementById('DESCRIPTION').value,
    }
    const radios = document.getElementsByName('ACTIVE')
    for (const element of radios) {
      if (element.checked) {
        formData.ACTIVE = element.value
      }
    }
  
    return formData
  }