const url_api = 'https://randomuser.me/api/'
var info = [];
const tableTab = document.querySelector('#elementTable')
var modal = document.getElementById("myModal");
var modalContent = document.getElementsByClassName("modalContent")[0];
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
    
    
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
window.onload = async function api_request(e){
    for(let i=0;i<50;i++)
    {   
        const response = await fetch(url_api)
        var data = await response.json();
        info.push(data.results[0])
        createRow(data.results[0], i)
    }
    console.log(info);
    
}

function showImage(imageId, bigPicture){
    document.getElementById(imageId).addEventListener('click',function(){
        console.log(modalContent.children)
        if(modalContent.children.length > 1){
            const oldImage = modalContent.children[1]
            modalContent.removeChild(oldImage)
        }    
        modalContent.appendChild(bigPicture)
    })
}
console.log(tableTab.rows)

function filterByCountry(){
    inputText = document.getElementById('countryFilter').value

    if(inputText === '') {
        recreateInitialTable();
        return
    }

    var filter = info.filter(el =>{
        return el.location.country === inputText
    })

    while(tableTab.rows.length > 1) {
        tableTab.deleteRow(1)
    }
    for(let i=0; i<filter.length;i++)
    {
        createRow(filter[i], i)
    }
}

function deleteRow(elementId) {
    tableTab.deleteRow(elementId)
}

function createRow(infoElement, position) {
    var row = tableTab.insertRow(position+1)
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)
        cell1.innerText = infoElement.name.first
        cell2.innerText = infoElement.name.last
        cell3.innerText = infoElement.email
        let picture = document.createElement('img')
        picture.src = infoElement.picture.thumbnail
        picture.id = infoElement.name.first + '-' +infoElement.name.last
        picture.onclick = function() {
            modal.style.display = "block";
          }
        cell4.appendChild(picture);
        let bigPicture = document.createElement('img')
        bigPicture.src = infoElement.picture.large
        bigPicture.class = 'modalImages'
        showImage(picture.id,bigPicture)
}

function recreateInitialTable() {
    while(tableTab.rows.length > 1) {
        tableTab.deleteRow(1)
    }

    for(let i=0;i<info.length;i++) {
        createRow(info[i], i);
    }
}