const container = document.getElementById("cardsContainer");

// Calculate stats
const totalStudents = friendsData.length;
const placedStudents = friendsData.filter(f => f.status === "Placed").length;
const packages = friendsData.filter(f => f.status === "Placed").map(f => parseFloat(f.package));
const avgPackage = packages.length > 0 
  ? (packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(2) 
  : 0;

// Animate stats with smooth easing
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  const range = end - start;
  const startTime = performance.now();
  
  function updateValue(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = start + (range * easeOutQuart);
    
    if (id === 'avgPackage') {
      obj.textContent = current.toFixed(2);
    } else {
      obj.textContent = Math.floor(current);
    }
    
    if (progress < 1) {
      requestAnimationFrame(updateValue);
    }
  }
  
  requestAnimationFrame(updateValue);
}

// Start animations after a short delay
setTimeout(() => {
  animateValue('totalStudents', 0, totalStudents, 1500);
  animateValue('placedStudents', 0, placedStudents, 1500);
  animateValue('avgPackage', 0, avgPackage, 1500);
}, 300);

// Create cards with staggered animation
friendsData.forEach((friend, index) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.animationDelay = `${index * 0.1}s`;
  
  const statusClass = friend.status === "Placed" ? "status-placed" : "status-not-placed";
  const statusIcon = friend.status === "Placed" ? "✓" : "⏳";
  
  card.innerHTML = `
    <div class="profile-section">
      <img src="${friend.photo}" alt="${friend.name}" class="profile-pic" 
           onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22130%22 height=%22130%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23667eea;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%23764ba2;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill=%22url(%23grad)%22 width=%22130%22 height=%22130%22/%3E%3Ctext fill=%22white%22 x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2250%22 font-weight=%22bold%22%3E${friend.name.charAt(0)}%3C/text%3E%3C/svg%3E'" />
      <h2>${friend.name}</h2>
      <div class="usn">${friend.usn}</div>
    </div>

    <div class="status-badge ${statusClass}">
      <span>${statusIcon}</span>
      <span>${friend.status}</span>
    </div>

    ${friend.status === "Placed" ? `
      <div class="company-highlight">
        <div class="company-name">${friend.company}</div>
        <div style="opacity: 0.95; margin-top: 0.25rem;">${friend.role}</div>
        <div class="package">₹${friend.package} LPA</div>
      </div>
    ` : ''}

    <div class="info-grid">
      <div class="info-item">
        <span class="info-label">🎓 Branch</span>
        <span class="info-value">${friend.branch}</span>
      </div>
      <div class="info-item">
        <span class="info-label">📊 CGPA</span>
        <span class="info-value">${friend.cgpa}</span>
      </div>
      <div class="info-item">
        <span class="info-label">📚 Class 10th</span>
        <span class="info-value">${friend.tenth}</span>
      </div>
      <div class="info-item">
        <span class="info-label">📖 Class 12th</span>
        <span class="info-value">${friend.twelfth}</span>
      </div>
      ${friend.status === "Placed" ? `
        <div class="info-item">
          <span class="info-label">🏢 Type</span>
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