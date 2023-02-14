const url_api = 'https://randomuser.me/api/'
var info = [];
const tableTab = document.querySelector('#elementTable')
var modal = document.getElementById("modalId");
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
    var inputText = document.getElementById('countryFilter').value
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
        let photo = document.createElement('img')
        photo.src = infoElement.picture.thumbnail
        photo.id = infoElement.name.first + '-' +infoElement.name.last
        photo.onclick = function() {
            modal.style.display = "block";
          }
        cell4.appendChild(photo);
        let bigPicture = document.createElement('img')
        bigPicture.src = infoElement.picture.large
        bigPicture.class = 'modalImages'
        showImage(photo.id,bigPicture)
}

function recreateInitialTable() {
    while(tableTab.rows.length > 1) {
        tableTab.deleteRow(1)
    }

    for(let i=0;i<info.length;i++) {
        createRow(info[i], i);
    }
} 

function search(){
    var textInput = document.getElementById('searchByWord').value
    let valuesText = []
    if(textInput === ''){
        recreateInitialTable();
        return
    }
    else if(textInput != ' '){
            for(let k=0;k<info.length;k++){
                if(Object.values(info[k]).includes(textInput))
                {
                    valuesText.push(info[k])
                }
                else if(Object.values(info[k].location).includes(textInput)){
                        valuesText.push(info[k])
                        continue
                }
                else if(Object.values(info[k].dob).includes(textInput)){
                    valuesText.push(info[k])
                    continue
                }
                else if(Object.values(info[k].id).includes(textInput)){
                    valuesText.push(info[k])
                    continue
                }
                else if(Object.values(info[k].login).includes(textInput)){
                    valuesText.push(info[k])
                    continue
                }
                else if(Object.values(info[k].name).includes(textInput)){
                    valuesText.push(info[k])
                    continue
                }
                else if(Object.values(info[k].picture).includes(textInput)){
                    valuesText.push(info[k])
                    continue
                }
                else if(Object.values(info[k].registered).includes(textInput)){
                    valuesText.push(info[k])
                    continue
                }
                
            }
            while(tableTab.rows.length > 1) {
                tableTab.deleteRow(1)
            }
            for(let i=0; i<valuesText.length;i++)
            {
                createRow(valuesText[i], i)
            }
            
        }

    }

  function Sort()
  {
    var inputText = document.getElementById('countryFilter').value
    let sortedValues = []
    let unsortedValues = []
    if(inputText === ''){
        recreateInitialTable();
        return
    }
    else{
        for(let el=0; el<info.length; el++){
            if(inputText === info[el].location.country){
                sortedValues.push(info[el])
            }
            else{
                unsortedValues.push(info[el])
            }
        }
        while(tableTab.rows.length > 1) {
            tableTab.deleteRow(1)
        }
        console.log(sortedValues)
        
        for(let j=0; j<unsortedValues.length;j++){
            createRow(unsortedValues[j], j)
        }

        for(let i=0; i<sortedValues.length;i++){
            createRow(sortedValues[i], i)
        }
    }
  }
  