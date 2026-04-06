

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const res = await fetch("/items");
//     const items = await res.json();

//     const container = document.querySelector(".cards-container");
//     if(!container) return; // Error prevent karnya sathi
    
//     container.innerHTML = "";

//     items.forEach(item => {
//       const card = document.createElement("div");
//       card.classList.add("item-card");

//       let imageName = "default.webp";
//       if (Array.isArray(item.image) && item.image.length > 0) {
//         imageName = item.image[0];
//       } else if (typeof item.image === 'string' && item.image !== "") {
//         imageName = item.image;
//       }

//         const imagePath = `/uploads/${imageName}`;
//         let formattedDate = "N/A";
//         if (item.date) {
//           const dateObj = new Date(item.date);
//           if (!isNaN(dateObj.getTime())) {
//             formattedDate = dateObj.toLocaleDateString();
//           }
//         }

//       card.innerHTML = `
//         <img src="${imagePath}" alt="${item.title}" onerror="this.src='/asset/default.webp'">
//         <div class="card-content">
//           <h3>${item.title}</h3>
//           <p class="item-type ${item.status === 'lost' ? 'lost' : 'found'}">
//             ${item.status.toUpperCase()} Item
//           </p>
//           <p class="item-desc">${item.description}</p>
//           <p class="item-location">
//             <i class="fa-solid fa-location-dot"></i> ${item.location}
//           </p>
//           <div class="date-time">
//             <span><i class="fa-solid fa-calendar"></i> ${formattedDate}</span>
//             <span><i class="fa-solid fa-clock"></i> ${item.time}</span>
//           </div>
//         </div>
//         <div class="card-btn-row">
//           <button class="contact-btn">Contact <i class='fa-solid fa-envelope'> </i></button>
//         </div>
//       `;
//       container.appendChild(card);
//     });
//   } catch (err) {
//     console.error("Error loading items:", err);
//   }
// });

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/items");
    const items = await res.json();

    const container = document.querySelector(".cards-container");
    if (!container) return;

    container.innerHTML = "";

    items.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("item-card");

      let imageName = "default.webp";
      if (Array.isArray(item.image) && item.image.length > 0) {
        imageName = item.image[0];
      } else if (typeof item.image === "string" && item.image !== "") {
        imageName = item.image;
      }

      const imagePath = `/uploads/${imageName}`;

      let formattedDate = "N/A";
      if (item.date) {
        const dateObj = new Date(item.date);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toLocaleDateString();
        }
      }

      card.innerHTML = `
        <img src="${imagePath}" alt="${item.title}" onerror="this.src='/asset/default.webp'">
        <div class="card-content">
          <h3>${item.title}</h3>
          <p class="item-type ${item.status === 'lost' ? 'lost' : 'found'}">
            ${item.status.toUpperCase()} Item
          </p>
          <p class="item-desc">${item.description}</p>
          <p class="item-location">
            <i class="fa-solid fa-location-dot"></i> ${item.location}
          </p>
          <div class="date-time">
            <span><i class="fa-solid fa-calendar"></i> ${formattedDate}</span>
            <span><i class="fa-solid fa-clock"></i> ${item.time}</span>
          </div>
        </div>
        <div class="card-btn-row">
          <button class="contact-btn">Contact <i class='fa-solid fa-envelope'></i></button>
        </div>
      `;

      /* CONTACT BUTTON CLICK EVENT */

      const contactBtn = card.querySelector(".contact-btn");

      contactBtn.addEventListener("click", () => {
        window.location.href = `/contact.html?id=${item._id}`;
      });

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading items:", err);
  }
});