let webName = document.querySelector(".name");
let url = document.querySelector(".url");
console.log(webName, url);


let submit = document.getElementById("Submit");
let visit = document.getElementById("visit");
console.log(visit);
let closeBtn=document.getElementById("closeBtn");

if (localStorage.getItem("links")) {
  prcontainer = JSON.parse(localStorage.getItem("links"));
  displaypro();
} else {
  prcontainer = [];
}

submit.addEventListener("click", function (event) {
  if (Namevalidation() && urlvalidation()) {
    event.preventDefault();
    // Check for duplicate names
    const isDuplicate = prcontainer.some(item => item.name.toLowerCase() === webName.value.toLowerCase());
   
    if (isDuplicate) {
      let alert = document.querySelector(".alert");
      let main = document.querySelector(".main");
  
    
      alert.classList.remove("d-none");
      main.classList.remove("d-none");

    } else {
      // Add new bookmark if not duplicate
      let info = {
        name: webName.value,
        url: url.value,
      };
      prcontainer.push(info);
      localStorage.setItem("links", JSON.stringify(prcontainer));
      displaypro();
      url.classList.remove("is-valid");
      webName.classList.remove("is-valid");
      swal("Good job!", "You clicked the button!", "success");


    }
  } else {
    let alert = document.querySelector(".alert");
    let main = document.querySelector(".main");
    alert.classList.remove("d-none");
    main.classList.remove("d-none");
  }
});



closeBtn.addEventListener( "click",function(e) {
  let alert=document.querySelector(".alert")
  let main= document.querySelector(".main");
  alert.classList.add("d-none");
  main.classList.add("d-none");
});




function displaypro() {
  let cartona = ``;
  for (let i = 0; i < prcontainer.length; i++) {
    cartona += `    
     <tr >
<td ><p class="h4 text-light   ">${i + 1}</p></td>
<td  ><p class="text-light fs-5 px-5">${prcontainer[i].name}</p></td>
<td  >
  <a href="${prcontainer[i].url}" target="_blank">
    <button class="btn btn-primary  " id="visit">
      <i class="fa-regular fa-eye me-2"></i>Visit
    </button>
  </a>
</td>
<td >
  <button onclick="delpro(${i})" class="btn btn-danger  ">
    <i class="fa-solid fa-trash me-2"></i>Delete
  </button>
</td>
</tr>`;
  }
  document.getElementById("tbody").innerHTML = cartona;

  webName.value = "";
  url.value = "";
  console.log(prcontainer);
}

function delpro(id) {
  prcontainer.splice(id, 1);
  localStorage.setItem("links", JSON.stringify(prcontainer));
  displaypro();
}

function Namevalidation() {
  var nameRegex = /^\w{3,}(\s+\w+)*$/;
  var name = webName.value;
  if (!nameRegex.test(name)) {
    webName.classList.add("is-invalid");
    webName.classList.remove("is-valid");

    return false;
  } else {
    webName.classList.remove("is-invalid");
    webName.classList.add("is-valid");

    return true;
  }
}

function urlvalidation() {
  var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
  let error= document.getElementById('url-error');
  var urlValue = url.value; // Use a different variable name here

  if (!urlRegex.test(urlValue)) {
    url.classList.add("is-invalid");
    url.classList.remove("is-valid");
 

    error.innerHTML=`Matches URLs  start with http:// or https:// start with www. after is male world as google Matches the top-level domain (TLD), like .com, .org, .netand so on`
    error.classList.add('d-flex');
    return false;

  } else {

    url.classList.remove("is-invalid");
    url.classList.add("is-valid");
   
    error.classList.add('d-none');
    return true;
  }

}

