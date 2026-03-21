const container = document.getElementById("cardsContainer");

// ---- Stats ----
const totalStudents = friendsData.length;
const placed = friendsData.filter(f => f.status === "Placed");
const placedStudents = placed.length;
const packages = placed.map(f => parseFloat(f.package));
const avgPackage = packages.length > 0
  ? (packages.reduce((a, b) => a + b, 0) / packages.length).toFixed(2)
  : 0;
const placementRate = Math.round((placedStudents / totalStudents) * 100) + "%";

// ---- Counter Animation ----
function animateCounter(el, endVal, duration = 1400, isDecimal = false) {
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = endVal * ease;
    el.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

setTimeout(() => {
  animateCounter(document.getElementById("totalStudents"), totalStudents);
  animateCounter(document.getElementById("placedStudents"), placedStudents);
  animateCounter(document.getElementById("avgPackage"), parseFloat(avgPackage), 1600, true);
  // Placement rate special
  const rateEl = document.getElementById("placementRate");
  const rateNum = parseInt(placementRate);
  const start = performance.now();
  const duration = 1400;
  function tickRate(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    rateEl.textContent = Math.floor(rateNum * ease) + "%";
    if (progress < 1) requestAnimationFrame(tickRate);
  }
  requestAnimationFrame(tickRate);
}, 400);

// ---- Mouse glow effect on cards ----
function addMouseGlow(card) {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", x + "%");
    card.style.setProperty("--mouse-y", y + "%");
  });
}

// ---- SVG Icons ----
const linkedinIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
const githubIcon = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;

// ---- Default avatar SVG ----
function defaultAvatar(name) {
  const initials = name.split(" ").slice(0, 2).map(w => w[0]).join("");
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72'%3E%3Crect fill='%230e0e1a' width='72' height='72' rx='36'/%3E%3Ctext fill='%23d4af37' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24' font-weight='700' font-family='Georgia'%3E${encodeURIComponent(initials)}%3C/text%3E%3C/svg%3E`;
}

// ---- Render Cards ----
friendsData.forEach((friend, index) => {
  const isPlaced = friend.status === "Placed";

  const card = document.createElement("div");
  card.className = `card ${isPlaced ? "is-placed" : "is-not-placed"}`;
  card.style.animationDelay = `${index * 0.08}s`;

  const linkedinHTML = friend.linkedIn !== "N/A"
    ? `<a href="${friend.linkedIn}" target="_blank" class="link-btn linkedin">${linkedinIcon} LinkedIn</a>`
    : "";

  const githubHTML = friend.github !== "N/A"
    ? `<a href="${friend.github}" target="_blank" class="link-btn github">${githubIcon} GitHub</a>`
    : "";

  const companyHTML = isPlaced ? `
    <div class="company-block">
      <div class="company-name">${friend.company}</div>
      <div class="company-role">${friend.role}</div>
      <div class="package-display">
        <span class="package-currency">₹</span>
        <span class="package-amount">${friend.package}</span>
        <span class="package-unit">LPA</span>
      </div>
      <div class="placement-type">${friend.placementType}</div>
    </div>
  ` : "";

  card.innerHTML = `
    <div class="profile-section">
      <div class="avatar-wrap">
        <img
          src="${friend.photo}"
          alt="${friend.name}"
          class="profile-pic"
          onerror="this.src='${defaultAvatar(friend.name)}'"
        />
        <div class="avatar-ring"></div>
      </div>
      <div class="profile-info">
        <div class="profile-name">${friend.name}</div>
        <div class="profile-usn">${friend.usn}</div>
        <div class="profile-branch">${friend.branch}</div>
      </div>
    </div>

    <div class="status-badge ${isPlaced ? "badge-placed" : "badge-not-placed"}">
      <span class="badge-dot"></span>
      ${isPlaced ? "Placed" : "Exploring"}
    </div>

    ${companyHTML}

    <div class="info-grid">
      <div class="info-cell">
        <span class="info-label">CGPA</span>
        <span class="info-value">${friend.cgpa}</span>
      </div>
      <div class="info-cell">
        <span class="info-label">Branch</span>
        <span class="info-value">${friend.branch}</span>
      </div>
      <div class="info-cell">
        <span class="info-label">10th</span>
        <span class="info-value">${friend.tenth}</span>
      </div>
      <div class="info-cell">
        <span class="info-label">12th</span>
        <span class="info-value">${friend.twelfth}</span>
      </div>
    </div>

    ${linkedinHTML || githubHTML ? `
      <div class="card-links">
        ${linkedinHTML}
        ${githubHTML}
      </div>
    ` : ""}
  `;

  addMouseGlow(card);
  container.appendChild(card);
});