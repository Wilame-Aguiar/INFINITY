let teclas = document.querySelectorAll("#teclas > [data-number]")

for(let i=0; i<teclas.length; i++){
  teclas[i].addEventListener('click', handleKeyPress)
}

$teclaCe = document.getElementById("ce-key")
$teclaCe.addEventListener("click",zerarDisplay)

function zerarDisplay(){
  let $display = document.getElementById("display")
  $display.innerText="0"
}

function handleKeyPress(event){
  let $elemento = event.target
  let number = $elemento.getAttribute("data-number")
  
  let $display = document.getElementById("display")

  if($display.innerText=="0"){
    $display.innerText=number
  }else{
    $display.innerText+=number
  }

  
  console.log(number)
}