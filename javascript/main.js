// CRUD operations


var websiteNameInput = document.getElementById("siteName");
var websiteURLInput = document.getElementById("siteURL");


//? Add

// check if local storage has data
var storedData = JSON.parse(localStorage.getItem("websiteArr"));
if (storedData==null) {
    var websiteArr = [];
}

else{
 
    var websiteArr = storedData;
    display();
}


// var websiteArr = []


function add(){
    var website = {
      name: websiteNameInput.value,
      url: websiteURLInput.value,
    };

    if (!validate_URL(website.url)) {
        window.alert("invalid url ");
        clear();
        return;
    }
    websiteArr.push(website);
    console.log(websiteArr);
    display();
    clear();
    saveToLocal();


}


function display(){
    var container='';

    for (i=0 ; i<websiteArr.length;i++){
        if((websiteArr[i].name == websiteArr[websiteArr.length-1].name) && websiteArr.length !=i+1)
        {
            window.alert(websiteArr[i].name +" website is repeated ");
            websiteArr.pop();
        }

        container += `              <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${websiteArr[i].name}</td>
                        <td><button type="button" class="btn btn-success"><i class="fa-regular fa-eye mx-1 " style="color: #ffffff;"></i><a href="${
                          websiteArr[i].url
                        }" target="_blank" >visit</a></button></td>
                        <td><button type="button" class="btn btn-danger" onclick="delete_(${i})"><i class="fa-solid fa-trash mx-1 " style="color: #ffffff;"></i>Delete</button></td>
                    </tr>`;

    }

    document.getElementById("tbody").innerHTML = container;

}

function clear(){
      websiteNameInput.value = '';
      websiteURLInput.value = '';
}


function delete_(indx){

    // find index of required row
    websiteArr.splice(indx,1);
    // console.log("delete");
    display();
}


function validate_URL(url_){



    var urlRegex =
      /^((http|https):\/\/)[-a-zA-Z0-9@:%._\\+~#?&\/\/=]{2,256}\.[a-z]{2,6}\b$/;

    return(urlRegex.test(url_));

}

function saveToLocal(){
    localStorage.setItem("websiteArr",JSON.stringify(websiteArr));
}