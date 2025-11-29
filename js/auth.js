// --- REGISTRO ---
document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    // ------------------- REGISTRO -------------------
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("regName").value;
            const email = document.getElementById("regEmail").value;
            const password = document.getElementById("regPassword").value;
            const errorBox = document.getElementById("registerError");

            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Verificar si ya existe ese email
            if (users.some(u => u.email === email)) {
                errorBox.textContent = "❌ Este correo ya está registrado.";
                return;
            }

            // Guardar usuario
            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Cuenta creada exitosamente 🎉");
            window.location.href = "login.html";
        });
    }

    // ------------------- LOGIN -------------------
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const errorBox = document.getElementById("loginError");

            const users = JSON.parse(localStorage.getItem("users")) || [];

            const userFound = users.find(u => u.email === email && u.password === password);

            if (!userFound) {
                errorBox.textContent = "⚠️ Correo o contraseña incorrectos.";
                return;
            }

            // Guardar sesión
            localStorage.setItem("currentUser", JSON.stringify(userFound));

            alert("Inicio de sesión exitoso 😄");
            window.location.href = "dashboard.html"; // TU PÁGINA INTERNA
        });
    }
});
