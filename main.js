window.onload = () => {
  getUsers('us')
}

let arrayOfUsers = [];
let tempHolder = [];
const numberUsers = 20;
let alphasort = false;
let country = "USA"

//get users based on number in numberUsers Variable and location based on string passed to it
const getUsers = (location) => {
  clearList('all-users')
  fetch(`https://randomuser.me/api/?results=${numberUsers}&nat=${location}`)
    .then(res => res.json())
    .then(results => tempHolder = results)
  alphasort = false;
  clearList('list-userInfo');
  setTimeout(displayUsers, 4000)
  switch (location) {
    case 'us':
      country = "USA"
      break;
    case 'au':
      country = "Australia"
      break;
    case 'fr':
      country = "France"
      break;
    case 'gb':
      country = "United Kingdom"
      break;
    case 'ca':
      country = "Canada"
      break;

  }
  document.getElementById('country-item').innerHTML = `Users From ${country}`
}

const displayUsers = () => {
  if (!(alphasort)) {
    for (let i = 0; i < numberUsers; i++) {
      arrayOfUsers[i] = tempHolder.results[i]
    }
  }

  const allItems = document.getElementById('all-users')
  arrayOfUsers.map((item, index) => {
    const userView = document.createElement('p')
    const paragraph = document.createElement('p')
    const paragraph2 = document.createElement('p')
    const buttonAdd = document.createElement('button')
    let currentP = `p${index}`
    let currentButton = `b${index}`
    paragraph.setAttribute("id", currentP)
    userView.setAttribute("class", "address-page")
    buttonAdd.setAttribute("id", currentButton)
    buttonAdd.setAttribute("class", "button-list")
    buttonAdd.innerHTML = "Click for Information";
    buttonAdd.addEventListener("click", function () {
      displayInfo(this.id)
    })
    allItems.append(userView)
    userView.append(paragraph2);
    userView.append(paragraph);
    const text = document.createTextNode(`${item.name.first} ${item.name.last}`)
    const photo = document.createElement("IMG")
    photo.setAttribute("src", item.picture.medium);
    photo.setAttribute("width", "150");
    photo.setAttribute("height", "150")
    paragraph.appendChild(photo)
    paragraph.appendChild(buttonAdd)
    paragraph2.appendChild(text)
  })
}


const clearList = (id) => {
  let parent = document.getElementById(id);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

const displayInfo = (id) => {
  clearList('list-userInfo')

  let item = arrayOfUsers[id.slice(1)]
  const userInfo = document.getElementById('list-userInfo')
  const objKeys = Object.keys(item);
  for (let i = 0; i < objKeys.length; i++) {
    if (objKeys[i] == 'name' || objKeys[i] == 'dob' || objKeys[i] == 'location' || objKeys[i] == 'email' || objKeys[i] == 'phone' || objKeys[i] == 'cell' || objKeys[i] == 'name' || objKeys[i] == 'gender') {
      const ul = document.createElement("ul")
      userInfo.appendChild(ul)
      const mainKey = document.createTextNode(`${objKeys[i]}`)
      ul.appendChild(mainKey);
      if (typeof (item[objKeys[i]]) == 'object') {

        if (objKeys[i] == 'name' || objKeys[i] == 'dob') {
          const subKeys = Object.keys(item[objKeys[i]])
          const subli = document.createElement("li");
          ul.appendChild(subli);
          subli.style.whiteSpace = 'pre'

          for (let j = 0; j < subKeys.length; j++) {
            const subData = document.createTextNode(`${item[objKeys[i]][subKeys[j]]} `)
            subli.appendChild(subData)
          }
        }
        else if (objKeys[i] == 'location') {
          console.log(item[objKeys[i]])
          const subKeys = Object.keys(item[objKeys[i]])
          const subli = document.createElement("li");
          ul.appendChild(subli);
          subli.style.whiteSpace = 'pre'
          const cityloc = document.createTextNode(`city: ${item[objKeys[i]].city},`)
          subli.appendChild(cityloc)
          const stateloc = document.createTextNode(` ${item[objKeys[i]].state} `)
          subli.appendChild(stateloc)
        }
        else { console.log("notlogged") }
      }

      else {
        const li = document.createElement("li")
        ul.appendChild(li)
        const data = document.createTextNode(`${item[objKeys[i]]}`)
        li.appendChild(data)
      }
    }


  }
}

const sortList = () => {
  console.log(tempHolder.results[0].name.last)
  for (let i = 0; i < numberUsers; i++) {
    arrayOfUsers[i] = tempHolder.results[i]

  }

  console.log(arrayOfUsers[0].name.last)
  let swapCounter = 0;
  for (let z = 0; z < arrayOfUsers.length; z++) {

    for (let j = 0; j < arrayOfUsers.length - 1; j++) {
      console.log(arrayOfUsers[j].name.last + j)
      if (arrayOfUsers[j].name.last > arrayOfUsers[j + 1].name.last) {
        [arrayOfUsers[j], arrayOfUsers[j + 1]] = [arrayOfUsers[j + 1], arrayOfUsers[j]];
        swapCounter++;
      }

    }

    if (swapCounter == 0) { z = arrayOfUsers.length }
    else swapCounter = 0
  }
  console.log(arrayOfUsers)
  alphasort = true;
  clearList('all-users');
  setTimeout(displayUsers, 4000)
}