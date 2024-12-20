// script.js

document.getElementById("menu-icon").addEventListener("click", function () {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("active"); // Mengaktifkan atau menonaktifkan navbar
});

// Simpan dan ambil data dari localStorage
document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  const task = document.getElementById("task").value;
  const dueDate = document.getElementById("due-date").value;
  const status = document.getElementById("status").value; // Mengambil nilai dari dropdown status

  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  taskList.push({ subject, task, dueDate, status });
  localStorage.setItem("taskList", JSON.stringify(taskList));

  document.getElementById("task-form").reset();
  displayTasks();
});

// Fungsi untuk menampilkan tugas
function displayTasks() {
  const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
  const tableBody = document.querySelector("#task-table tbody");
  tableBody.innerHTML = ""; // Bersihkan isi tabel sebelum menambahkan data baru

  taskList.forEach((task, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${task.subject}</td>
      <td>${task.task}</td>
      <td>${task.dueDate}</td>
      <td>${task.status === "selesai" ? "Selesai" : "Belum Selesai"}</td>
      <td>
        <button onclick="deleteTask(${index})" style="background-color: red; color: white;">Hapus</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// Fungsi untuk menghapus tugas
function deleteTask(index) {
  const taskList = JSON.parse(localStorage.getItem("taskList"));
  taskList.splice(index, 1);
  localStorage.setItem("taskList", JSON.stringify(taskList));
  displayTasks();
}

// Memanggil fungsi untuk menampilkan tugas saat halaman dimuat
displayTasks();

function displayPlaceholder() {
  const taskTableBody = document.querySelector("#task-table tbody");
  if (taskTableBody.innerHTML.trim() === "") {
    taskTableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center;">Belum ada tugas</td>
      </tr>
    `;
  }
}

displayTasks(); // Fungsi utama
displayPlaceholder(); // Tambahkan ini setelah displayTasks()
