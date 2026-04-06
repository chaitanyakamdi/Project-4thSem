fetch("/api/user")
  .then(res => res.json())
  .then(user => {
    if (user) {
      document.getElementById("profileImg").src =
        "/uploads/" + user.profilePhoto;
      document.getElementById("profileName").innerText = user.name;
    }
  });