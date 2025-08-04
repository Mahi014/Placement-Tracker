const container = document.getElementById("cardsContainer");

friendsData.forEach(friend => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${friend.photo}" alt="${friend.name}" class="profile-pic" />
    <h2>${friend.name}</h2>
    <p><strong>USN:</strong> ${friend.usn}</p>
    <p><strong>Branch:</strong> ${friend.branch}</p>
    <p><strong>10th:</strong> ${friend.tenth}</p>
    <p><strong>12th:</strong> ${friend.twelfth}</p>
    <p><strong>CGPA:</strong> ${friend.cgpa}</p>
    <p><strong>Company:</strong> ${friend.company}</p>
    <p><strong>Role:</strong> ${friend.role}</p>
    <p><strong>Package:</strong> ${friend.package}</p>
    <p><strong>Type:</strong> ${friend.placementType}</p>
    <p><strong>Status:</strong> ${friend.status}</p>
    <p><strong>TYL:</strong> ${friend.tylLevel}</p>
    <div class="links">
      ${friend.linkedIn !== "N/A" ? `<a href="${friend.linkedIn}" target="_blank">LinkedIn</a>` : ""}
      ${friend.github !== "N/A" ? `<a href="${friend.github}" target="_blank">GitHub</a>` : ""}
    </div>
  `;

  container.appendChild(card);
});
