// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBDuvntpXkFGuZoa0CnosIhXjTlzjJBrag",
  authDomain: "wiki-sobre-cannabis.firebaseapp.com",
  projectId: "wiki-sobre-cannabis",
  storageBucket: "wiki-sobre-cannabis.appspot.com",
  messagingSenderId: "800874593317",
  appId: "1:800874593317:web:6323520d4c51e9dc4093cc",
  measurementId: "G-VEKT9HGN29"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Função para validar email
function emailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Função para validar senha forte
function senhaForte(senha) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(senha);
}

// ========== CADASTRO ==========
window.cadastrar = async function () {
  const email = document.getElementById("emailCadastro").value;
  const senha = document.getElementById("senhaCadastro").value;
  const idade = parseInt(document.getElementById("idadeCadastro").value);
  const usuario = document.getElementById("usuario").value;
  const msg = document.getElementById("mensagemCadastro");

  if (!email || !senha || !idade || !usuario) {
    msg.textContent = "⚠️ Preencha todos os campos.";
    msg.style.color = "red";
    return;
  }

  if (idade < 18) {
    msg.textContent = "🚫 É necessário ter 18 anos ou mais.";
    msg.style.color = "red";
    return;
  }

  if (!emailValido(email)) {
    msg.textContent = "❌ Email inválido.";
    msg.style.color = "red";
    return;
  }

  if (!senhaForte(senha)) {
    msg.textContent = "❌ A senha não atende aos requisitos.";
    msg.style.color = "red";
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    msg.style.color = "green";
    msg.textContent = "✅ Cadastro realizado com sucesso!";
    setTimeout(() => window.location.href = "index.html", 2000);
  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "❌ Erro no cadastro: " + error.message;
  }
};

// ========== LOGIN ==========
window.login = async function () {
  const email = document.getElementById("emailLogin").value;
  const senha = document.getElementById("senhaLogin").value;
  const idade = parseInt(document.getElementById("idadeLogin").value);
  const msg = document.getElementById("mensagemLogin");

  if (!email || !senha || !idade) {
    msg.textContent = "⚠️ Preencha todos os campos.";
    msg.style.color = "red";
    return;
  }

  if (idade < 18) {
    msg.textContent = "🚫 Acesso permitido apenas para maiores de 18 anos.";
    msg.style.color = "red";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    msg.style.color = "green";
    msg.textContent = "✅ Login bem-sucedido!";
    setTimeout(() => window.location.href = "menu.html", 1500);
  } catch (error) {
    msg.style.color = "red";
    msg.textContent = "❌ Erro no login: " + error.message;
  }
};

// ========== LOGIN COM GOOGLE ==========
window.loginGoogle = async function () {
  const idade = parseInt(prompt("Digite sua idade:"));

  if (idade < 18) {
    alert("🚫 Você precisa ter 18 anos ou mais para acessar o site.");
    return;
  }

  try {
    await signInWithPopup(auth, provider);
    alert("✅ Login com Google bem-sucedido!");
    window.location.href = "menu.html";
  } catch (error) {
    alert("❌ Erro no login com Google: " + error.message);
  }
};

// ========== VALIDAÇÃO EM TEMPO REAL ==========
const senhaInput = document.getElementById("senhaCadastro");
const senhaRequisitos = document.createElement("div");
senhaRequisitos.textContent = "Senha deve conter: 1 letra maiúscula, 1 minúscula, 1 número, 1 símbolo e 8+ caracteres.";
senhaRequisitos.style.fontSize = "12px";
senhaRequisitos.style.marginTop = "4px";
senhaInput.insertAdjacentElement("afterend", senhaRequisitos);

senhaInput.addEventListener("input", () => {
  if (senhaForte(senhaInput.value)) {
    senhaRequisitos.style.color = "green";
  } else {
    senhaRequisitos.style.color = "red";
  }
});

const emailInput = document.getElementById("emailCadastro");
const emailRequisitos = document.createElement("div");
emailRequisitos.textContent = "Digite um email válido (ex: exemplo@dominio.com)";
emailRequisitos.style.fontSize = "12px";
emailRequisitos.style.marginTop = "4px";
emailInput.insertAdjacentElement("afterend", emailRequisitos);

emailInput.addEventListener("input", () => {
  if (emailValido(emailInput.value)) {
    emailRequisitos.style.color = "green";
  } else {
    emailRequisitos.style.color = "red";
  }
});
