let btnText1= document.querySelector('#btn1');
let btnText2 = document.querySelector('#btn2');
let btnText3= document.querySelector('#btn3');
let paragraph = document.querySelector('#changeText');



btnText1.addEventListener('click',()=>{
    paragraph.innerText = 'Application calceled'
})

btnText2.addEventListener('click',()=>{
    paragraph.innerText = 'My Leave Status'
})
btnText3.addEventListener('click',()=>{
    paragraph.innerText = 'Application Saved and Processing'
})
