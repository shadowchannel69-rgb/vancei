const products = [
{
id:1,
name:"Laptop Gaming",
price:12000000,
image:"https://picsum.photos/300?1"
},
{
id:2,
name:"Smartphone",
price:3500000,
image:"https://picsum.photos/300?2"
},
{
id:3,
name:"Jam Tangan",
price:250000,
image:"https://picsum.photos/300?3"
},
{
id:4,
name:"Headset",
price:450000,
image:"https://picsum.photos/300?4"
},
{
id:5,
name:"Sepatu Sport",
price:500000,
image:"https://picsum.photos/300?5"
},
{
id:6,
name:"Blender",
price:300000,
image:"https://picsum.photos/300?6"
},
{
id:7,
name:"Vitamin",
price:150000,
image:"https://picsum.photos/300?7"
},
{
id:8,
name:"Tas Premium",
price:700000,
image:"https://picsum.photos/300?8"
}
];

const grid = document.getElementById("productGrid");

function renderProducts(data){

grid.innerHTML="";

data.forEach(product=>{

grid.innerHTML += `
<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<div class="price">
Rp ${product.price.toLocaleString()}
</div>

<div>⭐⭐⭐⭐⭐</div>

<button
class="add-btn"
onclick="addToCart(${product.id})">
Tambah ke Keranjang
</button>

</div>
`;

});
}

renderProducts(products);

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem(
"cart",
JSON.stringify(cart)
);
updateCart();
}

function addToCart(id){

const item =
cart.find(x=>x.id===id);

if(item){
item.qty++;
}
else{
cart.push({
id,
qty:1
});
}

saveCart();
showToast();
}

function updateCart(){

const container =
document.getElementById("cartItems");

const totalEl =
document.getElementById("totalPrice");

const countEl =
document.getElementById("cartCount");

container.innerHTML="";

let total=0;
let count=0;

cart.forEach(item=>{

const product =
products.find(
p=>p.id===item.id
);

total +=
product.price *
item.qty;

count += item.qty;

container.innerHTML += `
<div>
<h4>${product.name}</h4>

<p>
${item.qty} x
Rp ${product.price.toLocaleString()}
</p>

<button onclick="removeItem(${item.id})">
Hapus
</button>

</div>
<hr>
`;

});

countEl.innerText = count;

totalEl.innerText =
"Rp " +
total.toLocaleString();
}

function removeItem(id){

cart =
cart.filter(
item=>item.id!==id
);

saveCart();
}

updateCart();

document
.getElementById("cartBtn")
.onclick = () => {

document
.getElementById("cartSidebar")
.classList.toggle("active");

};

document
.getElementById("searchInput")
.addEventListener("input", e=>{

const keyword =
e.target.value.toLowerCase();

const filtered =
products.filter(product=>

product.name
.toLowerCase()
.includes(keyword)

);

renderProducts(filtered);

});

function showToast(){

const toast =
document.getElementById("toast");

toast.style.display="block";

setTimeout(()=>{
toast.style.display="none";
},2000);

}

document
.getElementById("darkModeBtn")
.onclick = ()=>{

document.body
.classList.toggle("dark-mode");

};

window.onload=()=>{

setTimeout(()=>{

document
.getElementById("loader")
.style.display="none";

},1000);

};

window.onscroll=()=>{

const btn =
document.getElementById("backToTop");

btn.style.display =
window.scrollY > 300
? "block"
: "none";

};

document
.getElementById("backToTop")
.onclick = ()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

};