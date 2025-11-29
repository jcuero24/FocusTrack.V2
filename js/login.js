 document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Usuario simulado (para la entrega)
  const storedUser = {
    email: "focus@track.com",
    password: "123456"
  };

  if (email === storedUser.email && password === storedUser.password) {
    alert("Inicio de sesión exitoso 😄");

    // Guardar sesión
    localStorage.setItem("userLogged", "true");

    // Redirigir al dashboard o inicio
    window.location.href = "index.html";
  } else {
    alert("Correo o contraseña incorrectos 🔐");
  }
});
