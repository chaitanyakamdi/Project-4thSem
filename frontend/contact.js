// contact.js
// Fetch and display all items, handle claim form submission

// document.addEventListener('DOMContentLoaded', () => {
//     // Get item id from URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const itemId = urlParams.get('id');
//     const itemsList = document.getElementById('items-list');

//     if (!itemId) {
//         itemsList.innerHTML = '<p>No item selected.</p>';
//         return;
//     }

//     fetch('/items')
//         .then(res => res.json())
//         .then(items => {
//             const item = items.find(i => (i._id || i.id) == itemId);
//             if (!item) {
//                 itemsList.innerHTML = '<p>Item not found.</p>';
//                 return;
//             }
//             let imageTag = '';
//             if (Array.isArray(item.image) && item.image.length > 0) {
//                 imageTag = `<img src="/uploads/${item.image[0]}" alt="Item Image" style="width:400px;height:400px;object-fit:cover;">`;
//             } else if (typeof item.image === 'string' && item.image) {
//                 imageTag = `<img src="/uploads/${item.image}" alt="Item Image" style="width:400px;height:400px;object-fit:cover;">`;
//             }
//             itemsList.innerHTML = `
//                 <div class="item-details">
//                 <h4 style="margin-bottom:8px;">item Details </h4>
//                     ${imageTag}
//                     <h3 style="margin-bottom:10px;">${item.title || item.name}</h3>
//                     <p><strong>Description:</strong> ${item.description}</p>
//                     <p><strong>Status:</strong> ${item.status || ''}</p>
//                     <p><strong>Category:</strong> ${item.category || ''}</p>
//                     <p><strong>Location:</strong> ${item.location || ''}</p>
//                     <p><strong>Date:</strong> ${item.date ? new Date(item.date).toLocaleDateString() : ''}</p>
//                     <p><strong>Time:</strong> ${item.time || ''}</p>
//                 </div>
//                 <div id="report-person-section">
//                     <h4 style="margin-bottom:8px;">Reported By</h4>
//                     <ul style="list-style:none;padding-left:0;">
//                         <li><strong>Name:</strong> ${item.personalInfo?.name || ''}</li>
//                         <li><strong>Number:</strong> ${item.personalInfo?.number || ''}</li>
//                         <li><strong>College ID:</strong> ${item.personalInfo?.collegeId || ''}</li>
//                         <li><strong>Email:</strong> ${item.personalInfo?.email || ''}</li>
//                         <li><strong>Department:</strong> ${item.personalInfo?.department || ''}</li>
//                         <li><strong>Role:</strong> ${item.personalInfo?.role || ''}</li>
//                     </ul>
//                 </div>
//             `;
//             // Inject claim form below report person section
//             const contactMain = document.getElementById('contact-main');
//             let claimFormSection = document.getElementById('claim-form-section');
//             if (!claimFormSection) {
//                 claimFormSection = document.createElement('section');
//                 claimFormSection.id = 'claim-form-section';
//                 contactMain.appendChild(claimFormSection);
//             }
//             claimFormSection.innerHTML = `
//                 <h2>Claim an Item</h2>
//                 <form id="claim-form" enctype="multipart/form-data">
//                     <input type="hidden" id="itemId" name="itemId" required readonly>

//                     <label for="claimerName">Your Name:</label>
//                     <input type="text" id="claimerName" name="claimerName" required>

//                     <label for="btId">BT ID:</label>
//                     <input type="text" id="btId" name="btId" required>

//                     <label for="department">Department:</label>
//                     <input type="text" id="department" name="department" required>

//                     <label for="collegeIdCard">College ID Card (image):</label>
//                     <input type="file" id="collegeIdCard" name="collegeIdCard" accept="image/*" required>

//                     <label for="claimerContact">Personal Contact Number:</label>
//                     <input type="text" id="claimerContact" name="claimerContact" required>

//                     <label for="claimerEmail">Personal Email:</label>
//                     <input type="email" id="claimerEmail" name="claimerEmail" required>

//                     <fieldset style="margin-top:1em;">
//                         <legend>Item Proof</legend>
//                         <label for="itemProofImages">Upload Item Images (multiple allowed):</label>
//                         <input type="file" id="itemProofImages" name="itemProofImages" accept="image/*" multiple required>

//                         <label for="itemProofDescription">Item Proof Description:</label>
//                         <textarea id="itemProofDescription" name="itemProofDescription" rows="3" required></textarea>
//                     </fieldset>

//                     <button type="submit">Claim Item</button>
//                 </form>
//             `;
//             // Prefill claim form itemId
//             document.getElementById('itemId').value = item._id || item.id;
//         });

//     // Attach claim form submit handler after injection
//     document.addEventListener('submit', function(e) {
//         if (e.target && e.target.id === 'claim-form') {
//             e.preventDefault();
//             const formData = new FormData();
//             formData.append('itemId', document.getElementById('itemId').value);
//             formData.append('claimerName', document.getElementById('claimerName').value);
//             formData.append('btId', document.getElementById('btId').value);
//             formData.append('department', document.getElementById('department').value);
//             formData.append('collegeIdCard', document.getElementById('collegeIdCard').files[0]);
//             formData.append('claimerContact', document.getElementById('claimerContact').value);
//             formData.append('claimerEmail', document.getElementById('claimerEmail').value);
//             // Multiple item proof images
//             const itemProofImages = document.getElementById('itemProofImages').files;
//             for (let i = 0; i < itemProofImages.length; i++) {
//                 formData.append('itemProofImages', itemProofImages[i]);
//             }
//             formData.append('itemProofDescription', document.getElementById('itemProofDescription').value);

//                 // fetch('/items/claim', {
//                 //     method: 'POST',
//                 //     body: formData
//                 // })
//                 // .then(res => res.json())
//                 // .then(result => {
//                 //     alert(result.message || 'Claim submitted!');
//                 //     document.getElementById('claim-form').reset();
//                 // })
//                 // .catch(() => alert('Error submitting claim.'));
//                 fetch('/items/claim', {
//     method: 'POST',
//     body: formData
// })
// .then(async res => {
//     const data = await res.json();

//     if (!res.ok) {
//         throw new Error(data.message || "Server error");
//     }

//     alert(data.message);
//     document.getElementById('claim-form').reset();
// })
// .catch(err => {
//     console.error(err);
//     alert("Error submitting claim");
// });
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", async () => {

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

const itemsList = document.getElementById("items-list");

if (!itemId) {
itemsList.innerHTML = "<p>No item selected</p>";
return;
}

try {

const res = await fetch("/items");
const items = await res.json();

const item = items.find(i => i._id == itemId);

if (!item) {
itemsList.innerHTML = "<p>Item not found</p>";
return;
}

let imageTag = "";

if (item.image && item.image.length > 0) {
imageTag = `<img src="/uploads/${item.image[0]}" style="width:400px;height:400px;object-fit:cover;">`;
}

itemsList.innerHTML = `

<div class="item-details">

${imageTag}

<h3>${item.title}</h3>

<p><b>Description:</b> ${item.description}</p>
<p><b>Status:</b> ${item.status}</p>
<p><b>Category:</b> ${item.category}</p>
<p><b>Location:</b> ${item.location}</p>

</div>

<div class="report-person-section">

<h3>Reported By</h3>

<p><b>Name:</b> ${item.personalInfo?.name}</p>
<p><b>Number:</b> ${item.personalInfo?.number}</p>
<p><b>Email:</b> ${item.personalInfo?.email}</p>
<p><b>Department:</b> ${item.personalInfo?.department}</p>

</div>

`;

document.getElementById("claim-form-section").innerHTML = `

<h2>Claim Item</h2>

<form id="claim-form" enctype="multipart/form-data">

<input type="hidden" name="itemId" value="${item._id}">

<label>Your Name</label>
<input type="text" name="claimerName" required>

<label>BT ID</label>
<input type="text" name="btId" required>

<label>Department</label>
<input type="text" name="department" required>

<label>College ID Card</label>
<input type="file" name="collegeIdCard" required>

<label>Contact</label>
<input type="text" name="claimerContact" required>

<label>Email</label>
<input type="email" name="claimerEmail" required>

<label>Item Proof Images</label>
<input type="file" name="itemProofImages" multiple>

<label>Description</label>
<textarea name="itemProofDescription"></textarea>

<button type="submit">Submit Claim</button>

</form>

`;

} catch (err) {

console.log(err);
itemsList.innerHTML = "Error loading item";

}

});

document.addEventListener("submit", async (e) => {

if (e.target.id === "claim-form") {

e.preventDefault();

const formData = new FormData(e.target);

try {

const res = await fetch("/items/claim", {

method: "POST",
body: formData

});

const data = await res.json();

alert(data.message);

e.target.reset();

} catch (err) {

console.log(err);
alert("Error submitting claim");

}

}

});