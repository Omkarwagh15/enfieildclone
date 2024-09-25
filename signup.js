function log(){
    var a=document.getElementById("userF").value
    var b=document.getElementById("userL").value
    var c=document.getElementById("Mob").value
    var d=document.getElementById("Eml").value
    var e=document.getElementById("pass").value
    var f=document.getElementById("ConPa").value
    var regx=/^[a-zA-Z]{2,20}$/
    var regx1=/^[6-9][0-9]{9}$/
    var regx2=/^[a-zA-Z0-9!@#]{8,16}$/
    var k=true


// if(a=="" && b==""&& c=="" && d=="" && e=="" && f==""){
//   document.getElementById("erFN").innerHTML="Please Fill All The Details <br>"
//   document.getElementById("erLN").innerHTML="Please Fill All The Details <br>"
//   document.getElementById("erMN").innerHTML="Please Fill All The Details <br>"
//   document.getElementById("erMail").innerHTML="Please Fill All The Details <br>"
//   document.getElementById("erPa").innerHTML="Please Fill All The Details <br>"
//   document.getElementById("erCN").innerHTML="Please Fill All The Details <br>"
//     return false
// }
if(a==""){
    document.getElementById("erFN").innerHTML="Enter First name <br>"
    k =false
}
else if(regx.test(a)){
    document.getElementById("erFN").innerHTML=""
}
else{
    document.getElementById("erFN").innerHTML="Invalid First name"

}
if(b==""){
    document.getElementById("erLN").innerHTML="Enter last name <br>"
    k = false
}
else if(regx.test(b)){
    document.getElementById("erLN").innerHTML=""
}
else{
    document.getElementById("erLN").innerHTML="Invalid Last name"

}
// if(d=="" ){
//          document.getElementById("erMail").innerHTML="Enter Correct mail id <br>"
//          return false
//     }
if(c=="" ){
         document.getElementById("erMN").innerHTML="Enter valid number <br>"
         return false
         }
else if(regx1.test(c)){
        document.getElementById("erMN").innerHTML=""
        }
else{
    document.getElementById("erMN").innerHTML="invalid mob number"
    k =false

}
if(d=="" ){
    document.getElementById("erMail").innerHTML="Enter Correct mail id <br>"
    k = false
      }

else if(regx2.test(d)){
        document.getElementById("erMail").innerHTML=""
        }
else{
    document.getElementById("erMail").innerHTML="invalid email Id"
    k =false

    
}
if(k){
    return true
}
else{
    false
}

}
// if(b==""){
//     document.getElementById("erLN").innerHTML="Enter Last name <br>"
//     return false
// }
// else if(b==""){
//     document.getElementById("erFN").innerHTML="last name required <br>"
//     return false
// }
// else if(regx.test(a)){
//     document.getElementById("userF").innerHTML=""
// }
// else{
//     document.getElementById("userF").innerHTML="Invalid last name"

// }
// if(c<10 && c=="" ){
//     document.getElementById("erMN").innerHTML="Enter valid number <br>"
//     return false
// }
// else if(d=="" ){
//     document.getElementById("erMail").innerHTML="Enter Correct mail id <br>"
//     return false
// }
// else if(e<6 && e=="" ){
//     document.getElementById("erPa").innerHTML="Password is more than 6 char <br>"
//     return false
// }
// // else if(e!=f ){
// //     document.getElementById("erCN").innerHTML="Password is Not Matching <br>"
// //     return false
// // }
// else if(a=="Prajakta" && b=="Wagh" && c=="1234567899" && d=="Rupa123@gmail.com" && e=="12345678" ){
//     alert("Already User has Account ")
//     return true

// }
// else{
//     document.getElementById("erSI").innerHTML="User is Not Found"
//     return false
// }

// }