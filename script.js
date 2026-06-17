// Mobile Menu Toggle

const menuBtn =
document.getElementById("menuBtn");

const menu =
document.getElementById("menu");

menuBtn.addEventListener("click", () => {
menu.classList.toggle("show");
});


// Smooth Scrolling

document.querySelectorAll("nav a")
.forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault();

const target =
document.querySelector(
this.getAttribute("href")
);

target.scrollIntoView({
behavior:"smooth"
});

});

});


// Typewriter Effect

const text =
"Web Developer";

let i = 0;

function typeWriter(){

if(i < text.length){

document.getElementById(
"typewriter"
).innerHTML += text.charAt(i);

i++;

setTimeout(
typeWriter,
150
);

}

}

typeWriter();


// Live Clock

function updateClock(){

const now =
new Date();

const time =
now.toLocaleTimeString();

document.getElementById(
"clock"
).textContent = time;

}

setInterval(
updateClock,
1000
);

updateClock();


// Dark Mode

const themeBtn =
document.getElementById(
"themeBtn"
);

themeBtn.addEventListener(
"click",
() => {

document.documentElement
.classList.toggle("dark");

}
);


// Skills Animation

const bars =
document.querySelectorAll(
".bar"
);

const observer =
new IntersectionObserver(
entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

if(entry.target.id==="htmlBar")
entry.target.style.width="90%";

if(entry.target.id==="cssBar")
entry.target.style.width="85%";

if(entry.target.id==="jsBar")
entry.target.style.width="80%";

if(entry.target.id==="tailwindBar")
entry.target.style.width="75%";

if(entry.target.id==="reactBar")
entry.target.style.width="70%";

if(entry.target.id==="nodeBar")
entry.target.style.width="65%";

}

});

});

bars.forEach(bar => {
observer.observe(bar);
});


// Project Filter

const filterButtons =
document.querySelectorAll(
".filter-btn"
);

const projects =
document.querySelectorAll(
".project"
);

filterButtons.forEach(button => {

button.addEventListener(
"click",
() => {

const filter =
button.dataset.filter;

projects.forEach(project => {

if(
filter === "all" ||
project.classList.contains(filter)
){

project.style.display =
"block";

}
else{

project.style.display =
"none";

}

});

});

});


// Back To Top Button

const topBtn =
document.getElementById(
"topBtn"
);

window.addEventListener(
"scroll",
() => {

if(
window.scrollY > 300
){

topBtn.style.display =
"block";

}
else{

topBtn.style.display =
"none";

}

}
);

topBtn.addEventListener(
"click",
() => {

window.scrollTo({
top:0,
behavior:"smooth"
});

}
);


// Contact Form Validation

document.getElementById(
"contactForm"
)
.addEventListener(
"submit",
function(e){

e.preventDefault();

const name =
document.getElementById(
"name"
).value.trim();

const email =
document.getElementById(
"email"
).value.trim();

const message =
document.getElementById(
"message"
).value.trim();

if(
name === "" ||
email === "" ||
message === ""
){

alert(
"Please fill all fields"
);

return;

}

const formData = {
name,
email,
message
};

console.log(formData);

alert(
"Form submitted successfully"
);

this.reset();

}
);


// To-Do List

const taskInput =
document.getElementById(
"taskInput"
);

const addTaskBtn =
document.getElementById(
"addTaskBtn"
);

const taskList =
document.getElementById(
"taskList"
);

const taskCount =
document.getElementById(
"taskCount"
);

let tasks =
JSON.parse(
localStorage.getItem("tasks")
) || [];

function saveTasks(){

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

}

function updateCount(){

const remaining =
tasks.filter(
task => !task.completed
).length;

taskCount.textContent =
`${remaining} tasks remaining`;

}

function renderTasks(){

taskList.innerHTML = "";

tasks.forEach(
(task,index) => {

const li =
document.createElement(
"li"
);

const checkbox =
document.createElement(
"input"
);

checkbox.type =
"checkbox";

checkbox.checked =
task.completed;

const span =
document.createElement(
"span"
);

span.textContent =
task.text;

if(task.completed){

span.classList.add(
"completed"
);

}

checkbox.addEventListener(
"change",
() => {

tasks[index].completed =
!tasks[index].completed;

saveTasks();

renderTasks();

}
);

const deleteBtn =
document.createElement(
"button"
);

deleteBtn.textContent =
"Delete";

deleteBtn.addEventListener(
"click",
() => {

tasks.splice(
index,
1
);

saveTasks();

renderTasks();

}
);

li.appendChild(
checkbox
);

li.appendChild(
span
);

li.appendChild(
deleteBtn
);

taskList.appendChild(
li
);

}
);

updateCount();

}

function addTask(){

const text =
taskInput.value.trim();

if(text === "")
return;

tasks.push({
text:text,
completed:false
});

saveTasks();

renderTasks();

taskInput.value="";

}

addTaskBtn.addEventListener(
"click",
addTask
);

taskInput.addEventListener(
"keypress",
function(e){

if(e.key==="Enter"){

addTask();

}

}
);
renderTasks();
const modal =
document.getElementById(
"projectModal"
);

const closeModal =
document.getElementById(
"closeModal"
);

document
.querySelectorAll(
".view-project-btn"
)
.forEach(button => {

button.addEventListener(
"click",
() => {

document.getElementById(
"modalTitle"
).textContent =
button.dataset.title;

document.getElementById(
"modalImage"
).src =
button.dataset.image;

document.getElementById(
"modalDesc"
).textContent =
button.dataset.desc;

document.getElementById(
"modalLink"
).href =
button.dataset.link;

const techContainer =
document.getElementById(
"modalTech"
);

techContainer.innerHTML="";

button.dataset.tech
.split(",")
.forEach(tech => {

const span =
document.createElement(
"span"
);

span.textContent =
tech;

techContainer.appendChild(
span
);

});

modal.style.display =
"flex";

});

});

closeModal.addEventListener(
"click",
() => {

modal.style.display =
"none";

}
);

modal.addEventListener(
"click",
(e) => {

if(e.target === modal){

modal.style.display =
"none";

}

}
);
const weatherBtn =
document.getElementById(
"getWeatherBtn"
);

weatherBtn.addEventListener(
"click",
async () => {

const city =
document.getElementById(
"cityInput"
).value;

const spinner =
document.getElementById(
"loadingSpinner"
);

spinner.style.display =
"block";

try{

const geo =
await fetch(
`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
);

const geoData =
await geo.json();

if(!geoData.results){

alert("City not found");
spinner.style.display="none";
return;
}

const lat =
geoData.results[0].latitude;

const lon =
geoData.results[0].longitude;

const weather =
await fetch(
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`
);

const weatherData =
await weather.json();

document.getElementById(
"cityName"
).textContent = city;

document.getElementById(
"temp"
).textContent =
weatherData.current.temperature_2m +
"°C";

document.getElementById(
"description"
).textContent =
"Current Weather";

document.getElementById(
"humidity"
).textContent =
"Humidity: " +
weatherData.current.relative_humidity_2m +
"%";

document.getElementById(
"weatherResult"
).style.display =
"block";

}
catch(error){

alert(
"Error fetching weather"
);

}

spinner.style.display =
"none";

}
);