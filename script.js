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
  const taskListElement = document.getElementById("task-list");
  taskListElement.innerHTML = "";

  taskList.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <div class="task-details">
              <strong>${task.subject}</strong><br>
              ${task.task} - ${task.dueDate} - Status: ${
      task.status === "selesai" ? "Selesai" : "Belum Selesai"
    }
          </div>
          <button onclick="deleteTask(${index})">Hapus</button>
      `;
    taskListElement.appendChild(li);
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
