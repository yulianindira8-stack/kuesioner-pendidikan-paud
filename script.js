
/* NAVIGASI HALAMAN */

function nextPage(url) {
  window.location.href = url;
}

/* MODE TERANG DAN GELAP */

function applyTheme() {
  const theme = localStorage.getItem("formTheme") || "light";

  document.body.classList.toggle("dark", theme === "dark");

  const button = document.querySelector(".theme-toggle");

  if (button) {
    button.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark");

  localStorage.setItem("formTheme", isDark ? "light" : "dark");
  applyTheme();
}

/* PENYIMPANAN JAWABAN SEMENTARA */

function saveAnswer(key, value) {
  sessionStorage.setItem(key, value);
}

function getAnswer(key) {
  return sessionStorage.getItem(key) || "";
}

/* HALAMAN 1: KUESIONER MINAT PAUD */

function savePage1(event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const minat = document.querySelector('input[name="minat"]:checked');
  const kompetensi = document.querySelector('input[name="kompetensi"]:checked');
  const sabar = document.querySelector('input[name="sabar"]:checked');

  if (!nama || !minat || !kompetensi || !sabar) {
    alert("Mohon lengkapi semua pertanyaan wajib.");
    return;
  }

  saveAnswer("nama", nama);
  saveAnswer("minat", minat.value);
  saveAnswer("kompetensi", kompetensi.value);
  saveAnswer("sabar", sabar.value);

  nextPage("halaman2.html");
}

/* HALAMAN 2: KUESIONER METODE PEMBELAJARAN */

function savePage2(event) {
  event.preventDefault();

  const metode = document.querySelector('input[name="metode"]:checked');
  const menghadapi = document.querySelector('input[name="menghadapi"]:checked');
  const karakter = document.querySelector('input[name="karakter"]:checked');
  const pendapat = document.getElementById("pendapat").value.trim();

  if (!metode || !menghadapi || !karakter) {
    alert("Mohon lengkapi semua pertanyaan wajib.");
    return;
  }

  saveAnswer("metode", metode.value);
  saveAnswer("menghadapi", menghadapi.value);
  saveAnswer("karakter", karakter.value);
  saveAnswer("pendapat", pendapat);

  nextPage("halaman3.html");
}

/* HALAMAN 3: PERTANYAAN PERSONAL */

function savePage3(event) {
  event.preventDefault();

  const perasaan = document.getElementById("perasaan").value.trim();
  const jawaban = document.querySelector(
    'input[name="jawabanCinta"]:checked'
  );

  if (!jawaban) {
    alert("Silakan pilih salah satu jawaban ❤️");
    return;
  }

  saveAnswer("perasaan", perasaan);
  saveAnswer("jawabanCinta", jawaban.value);

  nextPage("hasil.html");
}

/* HALAMAN HASIL */

function showResult() {
  const title = document.getElementById("resultTitle");

  if (!title) return;

  const emoji = document.getElementById("resultEmoji");
  const message = document.getElementById("resultMessage");
  const name = document.getElementById("resultName");
  const jawaban = getAnswer("jawabanCinta");
  const nama = getAnswer("nama");

  if (!jawaban) {
    title.textContent = "Formulir Belum Diisi";
    emoji.textContent = "💌";
    message.textContent =
      "Silakan isi kuesioner dari halaman awal terlebih dahulu.";
    name.textContent = "";

    const button = document.querySelector(".result-card .primary-btn");

    if (button) {
      button.textContent = "Mulai Kuesioner";
      button.onclick = function () {
        nextPage("index.html");
      };
    }

    return;
  }

  if (jawaban === "Mau ❤️") {
    title.textContent = "YEEEAY! ❤️";
    emoji.textContent = "🥰";
    message.textContent =
      "Makasih sudah menerima aku! Semoga kita bisa saling menjaga, memahami, dan membahagiakan satu sama lain. Aku senang banget! 💖";
  } else {
    title.textContent = "Terima Kasih Sudah Jujur 💜";
    emoji.textContent = "🤗";
    message.textContent =
      "Tidak apa-apa, kok. Terima kasih sudah menjawab dengan jujur. Aku menghargai perasaanmu dan semoga kita tetap baik-baik saja.";
  }

  name.textContent = nama ? "Untuk " + nama + " 💌" : "Terima kasih!";
}

/* MENGULANG KUESIONER */

function restartForm() {
  sessionStorage.clear();
  nextPage("index.html");
}

/* MENGEMBALIKAN JAWABAN SAAT KEMBALI KE HALAMAN */

function restoreInput(id, key) {
  const element = document.getElementById(id);

  if (element) {
    element.value = getAnswer(key);
  }
}

function restoreRadio(name, key) {
  const value = getAnswer(key);

  if (!value) return;

  const radios = document.querySelectorAll(
    'input[name="' + name + '"]'
  );

  radios.forEach(function (radio) {
    radio.checked = radio.value === value;
  });
}

function restoreAnswers() {
  restoreInput("nama", "nama");
  restoreInput("pendapat", "pendapat");
  restoreInput("perasaan", "perasaan");

  restoreRadio("minat", "minat");
  restoreRadio("kompetensi", "kompetensi");
  restoreRadio("sabar", "sabar");

  restoreRadio("metode", "metode");
  restoreRadio("menghadapi", "menghadapi");
  restoreRadio("karakter", "karakter");
  restoreRadio("jawabanCinta", "jawabanCinta");
}

/* JALANKAN SAAT HALAMAN DIBUKA */

document.addEventListener("DOMContentLoaded", function () {
  applyTheme();
  restoreAnswers();
  showResult();
});
