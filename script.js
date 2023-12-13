const form = document.querySelector("form");
const entries = document.querySelector(".entries");
const clearAll = document.querySelector("#clearAll");

form.addEventListener("submit",(e)=>{
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phoneno = e.target.phoneno.value;
    var checkStatus = 0;

    let userData = JSON.parse(localStorage.getItem("userData")) ?? [];

    for(let d of userData){
        if(d.email == email || d.phoneno == phoneno){
            checkStatus = 1;
            break;
        }
    }

    if(checkStatus == 1){
        alert("Email or Phone number already exist!");
    }
    else{
        userData.push({
            "name" : name,
            "email": email,
            "phoneno": phoneno,
        })
    
        localStorage.setItem("userData",JSON.stringify(userData));
        e.target.reset();
        
    }
    displayData();
    e.target.preventDefault();
})
    
    function displayData(){
        let userData = JSON.parse(localStorage.getItem("userData")) ?? [];
        let finalData = '';
        userData.forEach((element,i) =>{
            finalData += `
            <div class="items">
            <span id="removeUser" data-tooltip = "Remove" onclick="removeData(${i})">&times;</span>
            <h4>Name : </h4>
            <div>${element.name}</div>

            <h4>Email : </h4>
            <div>${element.email}</div>

            <h4>Phoneno : </h4>
            <div>${element.phoneno}</div>
        </div>
            `
        })
        
        entries.innerHTML = finalData;
    }
    

    function removeData(i){
        let userData = JSON.parse(localStorage.getItem("userData")) ?? [];
        console.log(userData);
        userData.splice(i,1);

        localStorage.setItem("userData",JSON.stringify(userData));

        displayData();

    }

    clearAll.addEventListener("click",()=>{
        localStorage.clear();
        displayData();
    })

    displayData();

