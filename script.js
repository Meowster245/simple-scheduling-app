// Admin Password (change this to a secure password)
const adminPassword = "securepassword";

// Queue to store user requests
let queue = [];

// DOM Elements
const requestForm = document.getElementById("requestForm");
const queueList = document.getElementById("queueList");
const approvalList = document.getElementById("approvalList");
const adminSection = document.getElementById("adminSection");

// Admin Authentication
function checkAdminAccess() {
  console.log("Password prompt should appear now.");
  const input = prompt("Enter the admin password:");
  if (input === adminPassword) {
    alert("Access granted!");
    adminSection.style.display = "block"; // Show the admin section
  } else {
    alert("Access denied!");
  }
}

// Call the admin check automatically on page load
window.onload = checkAdminAccess;

// Handle form submission
requestForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get user input
  const name = event.target.name.value;
  const time = event.target.time.value;

  // Add the request to the queue
  queue.push({ name, time });
  updateQueue();

  // Reset the form
  requestForm.reset();
});

// Update the queue display
function updateQueue() {
  if (queue.length === 0) {
    queueList.innerHTML = "<p>No requests yet.</p>";
    approvalList.innerHTML = ""; // Clear admin approval list
    return;
  }

  // Update queue for regular users
  queueList.innerHTML = queue
    .map((req, index) => `<p>${req.name} requested ${req.time}</p>`)
    .join("");

  // Update approval list for admin
  approvalList.innerHTML = queue
    .map(
      (req, index) =>
        `<li>${req.name} requested ${req.time} 
         <button onclick="approveRequest(${index})">Approve</button>
        </li>`
    )
    .join("");
}

// Approve a request (removes it from the queue)
function approveRequest(index) {
  const approved = queue.splice(index, 1)[0];
  alert(`Request approved for ${approved.name} at ${approved.time}`);
  updateQueue();
}