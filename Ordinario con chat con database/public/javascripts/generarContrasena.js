
let letras= ['Palo','Hola','Pablo','Casa','Perro','Pedro','Mono','Pelota','Planta','Telefono','Arquitectura','Escribir','Pelo'];


function contra() {
  let numero =prompt("¿Cuantas palabras quieres?",""); 
  console.log(numero);  
  document.write("Su contraseña es: ");
  for(let i=0; i < numero ;i++){
  let aleatorio =  letras[Math.floor(Math.random() * (letras.length -1)) +1];
  console.log(i); 
  console.log(aleatorio);
  document.write(aleatorio);
}
  
  }
  

