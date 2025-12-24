const container = document.getElementById("cardsContainer");

// Calculate stats
const totalStudents = friendsData.length;
const placedStudents = friendsData.filter(f => f.status === "Placed").length;
const packages = friendsData.filter(f => f.status === "Placed").map(f => parseFloat(f.package));
const avgPackage = packages.length > 0 
  ? (packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(2) 
  : 0;

// Animate stats
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    obj.textContent = id === 'avgPackage' ? current.toFixed(2) : Math.floor(current);
  }, 16);
}

setTimeout(() => {
  animateValue('totalStudents', 0, totalStudents, 1000);
  animateValue('placedStudents', 0, placedStudents, 1000);
  animateValue('avgPackage', 0, avgPackage, 1000);
}, 500);

friendsData.forEach((friend, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.animationDelay = `${index * 0.1}s`;
  
  const statusClass = friend.status === "Placed" ? "status-placed" : "status-not-placed";
  
  card.innerHTML = `
    <div class="profile-section">
      <img src="${friend.photo}" alt="${friend.name}" class="profile-pic" 
           onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%23667eea%22 width=%22120%22 height=%22120%22/%3E%3Ctext fill=%22white%22 x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2250%22%3E${friend.name.charAt(0)}%3C/text%3E%3C/svg%3E'" />
      <h2>${friend.name}</h2>
      <div class="usn">${friend.usn}</div>
    </div>

    <div class="status-badge ${statusClass}">
      ${friend.status === "Placed" ? "✓ " : "⏳ "}${friend.status}
    </div>

    ${friend.status === "Placed" ? `
      <div class="company-highlight">
        <div class="company-name">${friend.company}</div>
        <div>${friend.role}</div>
        <div class="package">₹${friend.package} LPA</div>
      </div>
    ` : ''}

    <div class="info-grid">
      <div class="info-item">
        <span class="info-label">Branch</span>
        <span class="info-value">${friend.branch}</span>
      </div>
      <div class="info-item">
        <span class="info-label">CGPA</span>
        <span class="info-value">${friend.cgpa}</span>
      </div>
      <div class="info-item">
        <span class="info-label">10th</span>
        <span class="info-value">${friend.tenth}</span>
      </div>
      <div class="info-item">
        <span class="info-label">12th</span>
        <span class="info-value">${friend.twelfth}</span>
      </div>
      ${friend.status === "Placed" ? `
        <div class="info-item">
          <span class="info-label">Type</span>
          <span class="info-value">${friend.placementType}</span>
        </div>
      ` : ''}
    </div>

    <div class="links">
      ${friend.linkedIn !== "N/A" ? `<a href="${friend.linkedIn}" target="_blank" class="linkedin">LinkedIn</a>` : ""}
      ${friend.github !== "N/A" ? `<a href="${friend.github}" target="_blank" class="github">GitHub</a>` : ""}
    </div>
  `;
  
  container.appendChild(card);
});