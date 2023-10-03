document.addEventListener("DOMContentLoaded", () => {
    const friendslist = document.getElementById("friends-list");
    const nameInput = document.getElementById("name");
    const genderInput = document.getElementById("gender");
    const form = document.querySelector("form");
    
    function createFriendListItem(friend) {
        const listFriends = document.createElement("li");
        const nameElement = document.createElement("span");
        const genderElement = document.createElement("span");
        const deleteButton = document.createElement("button");
        const updateButton = document.createElement("button");

        nameElement.textContent = `Name: ${friend.name}`;
        genderElement.textContent = `Gender: ${friend.gender}`;
        deleteButton.textContent = "Delete";
        updateButton.textContent = "Update";



        listFriends.appendChild(nameElement);
        listFriends.appendChild(genderElement);
        listFriends.appendChild(deleteButton);
        listFriends.appendChild(updateButton);
        
        updateButton.addEventListener("click", () => {
            const newName = prompt("Enter the new name:");
            const newGender = prompt("Enter the new gender:");
            
            if (newName !== null && newGender !== null) {
                const updatedFriend = {
                    name: newName,
                    gender: newGender,
                };
        
                updateFriend(friend.id, updatedFriend);
            }
        });
  
        function updateFriend(friendId, updatedFriend) {
            fetch(`http://localhost:3000/friends/${friendId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFriend),
            })
            .then(() => {
                displayFriends();
            })
            .catch((error) => console.error("Error:", error));
        }
        


        deleteButton.addEventListener("click", () => {
            deleteFriend(friend.id);
            });
            return listFriends;

        function deleteFriend(friendId) {
            fetch(`http://localhost:3000/friends/${friendId}`, {
            method: "DELETE",
            })
            .then(() => {
        
            displayFriends();
            })
            .catch((error) => console.error("Error:", error));
            }
    }
    function displayFriends() {
        fetch("http://localhost:3000/friends")
            .then(response => response.json())
            .then(data => {
                friendslist.innerHTML = "";
                data.forEach((friend) => {
                    const friendItem = createFriendListItem(friend);
                    friendslist.appendChild(friendItem);
                });
            })
            .catch((error) => console.error("Error:", error));
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const newFriend = {
            name: nameInput.value,
            gender: genderInput.value,
        };
        fetch("http://localhost:3000/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFriend),
        })
        .then(() => {
            nameInput.value = "";
            genderInput.value = "";
            displayFriends();
        })
        .catch((error) => console.error("Error:", error));
    });
    displayFriends();
});
