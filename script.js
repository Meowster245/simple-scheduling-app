const form = document.getElementById("requestForm");
const queueList = document.getElementById("queueList");

let queue = []; // This will hold the requests temporarily

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  // Get user input
  const name = document.getElementById("name").value;
  const time = document.getElementById("time").value;

  // Add request to the queue
  const newRequest = { name, time, status: "pending" };
  queue.push(newRequest);

  // Update the queue display
  updateQueueDisplay();

  // Reset the form
  form.reset();
});

// Function to update the queue display
function updateQueueDisplay() {
  // Clear the current queue display
  queueList.innerHTML = "";

  // Add each request to the display
  queue.forEach((request, index) => {
    const requestDiv = document.createElement("div");
    requestDiv.textContent = `${request.name} - ${request.time} - ${request.status}`;
    
    // Approve button
    const approveButton = document.createElement("button");
    approveButton.textContent = "Approve";
    approveButton.addEventListener("click", () => {
      approveRequest(index);
    });

    requestDiv.appendChild(approveButton);
    queueList.appendChild(requestDiv);
  });
}

// Function to approve a request
function approveRequest(index) {
  queue[index].status = "approved";
  updateQueueDisplay();

  // Simulate sending a message
  alert(`Message sent to ${queue[index].name}: Your time is approved!`);
}