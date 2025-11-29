document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Evitar recargar la página

  // Tomar los valores del formulario
  const templateParams = {
    nombre: document.getElementById("inputName4").value,
    correo: document.getElementById("inputEmail4").value,
    telefono: document.getElementById("inputNumber4").value,
    servicio: document.getElementById("inputState").value,
    mensaje: document.getElementById("inputMessage").value
  };

  // Enviar usando EmailJS
  emailjs.send("service_aspz5k9", "template_440boyv", templateParams)
    .then(function(response) {
      console.log("SUCCESS!", response.status, response.text);
      alert("Formulario enviado con éxito 😄");

      // Limpiar formulario
      document.getElementById("contactForm").reset();
    })
    .catch(function(error) {
      console.error("ERROR:", error);
      alert("Hubo un error al enviar el formulario 😕");
    });
});
