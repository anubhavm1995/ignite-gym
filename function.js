
// Initialize Firebase
var config = {
    apiKey: "AIzaSyD_CYyg1j4MMUcgVirlRC1Q8yuhScXL9MU",
    authDomain: "ignite-gym.firebaseapp.com",
    databaseURL: "https://ignite-gym.firebaseio.com",
    projectId: "ignite-gym",
    storageBucket: "ignite-gym.appspot.com",
    messagingSenderId: "398440907004"
};
firebase.initializeApp(config);



function RegUser()
{
    //event.preventDefault();
    var fname = document.getElementById("fName").value;
    var lname = document.getElementById("lName").value;
    var mon = document.getElementById("mob").value;
    var email = document.getElementById("email").value;
    var amnt = document.getElementById("fees").value;

    if(fname!="" && lname!="" && mon!="" && email!="" && amnt!="")
    {
        var last;
        var num;
        var number;
        var newUser;
        var db = firebase.firestore();

        var docRef = db.collection("MaxUser").doc("MaxUsers");
        docRef.get().then(function(doc) {
            if (doc.exists) {
                last = doc.data().lastUser.toString();
                num = last.substring(4,last.length);
                number = parseInt(num);
                number=number+1;
                newUser = "user"+number.toString();

                db.collection("Users").doc(newUser).set({
                    FirstName: fname,
                    LastName: lname,
                    MobileNum: mon,
                    EmailId: email,
                    AmountGiven : amnt 
                })
                    .then(function() {
                    //console.log("Document successfully written!");
                    alert("Data Stored Succesfully");
                    document.getElementById("myForm").reset();
                })
                    .catch(function(error) {
                    console.error("Error writing document: ", error);
                });

                db.collection("MaxUser").doc("MaxUsers").set({
                    lastUser : newUser

                })/*
            .then(function() {
                console.log("Document successfully written!");
            })*/
                    .catch(function(error) {
                    console.error("Error writing document: ", error);
                });



            } else {

                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


    }
    else
    {
        alert("Please fill all the fields");

    }


}



function fetchData()
{
    const gymList = document.querySelector("#gymList");

    function renderGym(doc){

        let li = document.createElement("li");
        let fname  = document.createElement("span");
        let lname = document.createElement("span");
        let amnt = document.createElement("span");
        let email = document.createElement("span");
        let mob = document.createElement("span");

        li.setAttribute("data-id",doc.id);
        fname.textContent = doc.data().FirstName;
        lname.textContent = doc.data().LastName;
        amnt.textContent = doc.data().AmountGiven;
        email.textContent = doc.data().EmailId;
        mob.textContent = doc.data().MobileNum;

        li.appendChild(fname);
        li.appendChild(lname);
        li.appendChild(amnt);
        li.appendChild(email);
        li.appendChild(mob);

        gymList.appendChild(li);
    }

     var db = firebase.firestore();

    db.collection("Users").where("MobileNum", "==", "8588836383").get().then((snapshot) => {
        snapshot.docs.forEach(doc =>{
            renderGym(doc);


        })

    });
}

function Test(){
    
    
}