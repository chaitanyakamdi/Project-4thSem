fetch("/items")
.then(res => res.json())
.then(items => {

    const container = document.getElementsByClassName("cards-container");
    container.innerHTML = "";

    const lostItems = items.filter(item => item.status === "lost");

    lostItems.forEach(item => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
        <img src="/uploads/${item.image[0]}" class="card-img">

        <div class="card-body">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <p><strong>Location:</strong> ${item.location}</p>
            <p><strong>Date:</strong> ${item.date}</p>

            <a href="contact.html?id=${item._id}">
                <button class="contact-btn">Contact</button>
            </a>
        </div>
        `;

        container.appendChild(card);
    });

});