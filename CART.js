const cartDiv=document.querySelector('#cart')
const priceDiv=document.querySelector('#total')
const button1=document.querySelector('#new')

const products=[
    {
        id : 1 ,
        name : 'loster1' ,
        price : 80 ,
        image : './image/101399-Modern-Chandelier-12.jpg '
    }
    ,
    {
        id : 2 ,
        name : 'loster2' ,
        price : 90 ,
        image : './image/Chandelier-modern-buy-help.jpg '
    },
    {
        id : 3 ,
        name : 'loster3' ,
        price : 180 ,
        image : './image/Chandelier-modern-buy-help.jpg '
    }
    
    
]
 



 function renderProducts(){
    const productsDiv=document.querySelector('#products')
    productsDiv.innerHTML=''

    products.forEach((item)=>{
        productsDiv.innerHTML += 
        `
        <article id="product${item.id}">
                    <img src="${item.image}" width="200" height="300"></br>
                    <span>product name : ${item.name}</span></br>
                    <span> price : ${item.price}$ </span></br>
                    <button type="button" onclick="addToCart(${item.id})">add to cart</button>
        </article>
        `
    })
} 
renderProducts()

let cart= JSON.parse(localStorage.getItem("CART")) || [] 
updateCart()
function addToCart(id){
    let item= products.find((product)=>product.id===id)
    if(cart.some((item) => item.id===id)){
        changeUnitNumber('plus',item.id)
    }else{
        cart.push({
            ...item,
        unitNumber : 1
    })
    }
    updateCart()
}
function updateCart(){
    renderCart()
    renderTotal()
    localStorage.setItem("CART",JSON.stringify(cart))
}

function renderCart(){

cartDiv.innerHTML=""
cart.forEach((item)=>{
    cartDiv.innerHTML += `
    <div>              
<div> 
    <img  onclick="removeItem(${item.id})" src="${item.image}"  width="100" height="150">

 
    <h4> item : ${item.name}</h4>
</div>
<div>
    <h4> price :${item.price} </h4>
</div>
 
<div>
<span onclick="changeUnitNumber('plus',${item.id})"><img src="./image/img_115436.png.crdownload" width="30" height="30" ></span>
<span style="font-size: 28PX; vertical-align: top;">${item.unitNumber}</span> 
<span onclick="changeUnitNumber('minus',${item.id})"><img src="./image/circle-minus-512.webp" width="30" height="30"></span>
</div>
<div>
    </br>
    
     `
  
})}
function changeUnitNumber(change,id){
    cart=cart.map((item)=>{
        let oldunitnumber=item.unitNumber
        if(item.id===id){

            if(change==='minus' && oldunitnumber>0){
                oldunitnumber -- ;
            }
            else if(change==='plus'){
                oldunitnumber ++;
            }
            
        }
        return {
            ...item,
            unitNumber:oldunitnumber
        }
        })
        updateCart()
    }
    
    function renderTotal(){
        let TotalPrice =0
        let totalItems=0
        cart.forEach((item)=>{
            TotalPrice +=item.price * item.unitNumber
            totalItems+=item.unitNumber
        })
        priceDiv.innerHTML=''
        priceDiv.innerHTML += 
         `
        <div>
            YOUR BIL : </br>
            </br>
             Total Price : <small>$</small>${TotalPrice}
            </br>
            Total Items : ${totalItems}
             </br>
        </div>
        `
        
    }
    function removeItem(id){
        cart=cart.filter((item) => item.id!==id)
        updateCart()
    }
    button1.addEventListener('click',()=>{
     open("http://127.0.0.1:5500/weather.html",'_self')
    })