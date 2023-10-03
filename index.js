document.addEventListener("DOMContentLoaded", () => {
    const friendslist = document.getElementById("friends-list");


    fetch("http://localhost:3000/friends")
        .then(response => response.json())
        .then(data => {
            data.forEach((friend) => {

                const listFriends = document.createElement("li");
                
            
                const nameElement = document.createElement("span");
                const genderElement = document.createElement("span");

            
                nameElement.textContent = `Name: ${friend.name}`;
                genderElement.textContent = `Gender: ${friend.gender}`;

            
                listFriends.appendChild(nameElement);
                listFriends.appendChild(genderElement);
                
            
                friendslist.appendChild(listFriends);
            });
        })
        .catch((error) => console.error("Error:", error));
});
