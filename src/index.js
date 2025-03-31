document.addEventListener("DOMContentLoaded", main);

const baseUrl = "http://localhost:3000/ramens";

// Function to display all ramens in the menu
async function displayRamens() {
    try {
        const response = await fetch(baseUrl);
        const ramens = await response.json();
        const ramenMenu = document.getElementById("ramen-menu");

        ramens.forEach(ramen => {
            const img = document.createElement("img");
            img.src = ramen.image;
            img.alt = ramen.name;
            img.addEventListener("click", () => handleClick(ramen));
            ramenMenu.appendChild(img);
        });

        // Show first ramen details on page load
        if (ramens.length > 0) {
            handleClick(ramens[0]);
        }
    } catch (error) {
        console.error("Error fetching ramen data:", error);
    }
}

// Function to display ramen details when an image is clicked
function handleClick(ramen) {
    const detailImg = document.querySelector("#ramen-detail .detail-image");
    const detailName = document.querySelector("#ramen-detail .name");
    const detailRestaurant = document.querySelector("#ramen-detail .restaurant");
    const ratingDisplay = document.getElementById("rating-display");
    const commentDisplay = document.getElementById("comment-display");

    detailImg.src = ramen.image;
    detailImg.alt = ramen.name;
    detailName.textContent = ramen.name;
    detailRestaurant.textContent = ramen.restaurant;
    ratingDisplay.textContent = ramen.rating;
    commentDisplay.textContent = ramen.comment;
}

// Function to add a new ramen to the menu (does not persist on refresh)
function addSubmitListener() {
    const form = document.getElementById("new-ramen");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const newRamen = {
            name: form["new-name"].value,
            restaurant: form["new-restaurant"].value,
            image: form["new-image"].value,
            rating: form["new-rating"].value,
            comment: form["new-comment"].value
        };

        const img = document.createElement("img");
        img.src = newRamen.image;
        img.alt = newRamen.name;
        img.addEventListener("click", () => handleClick(newRamen));

        document.getElementById("ramen-menu").appendChild(img);

        form.reset();
    });
}

// Function to update ramen details
function addEditListener() {
    const editForm = document.getElementById("edit-ramen");

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const ratingDisplay = document.getElementById("rating-display");
        const commentDisplay = document.getElementById("comment-display");

        ratingDisplay.textContent = editForm["new-rating"].value;
        commentDisplay.textContent = editForm["new-comment"].value;
    });
}

// Main function to initialize the app
function main() {
    displayRamens();
    addSubmitListener();
    addEditListener();
}

export { addSubmitListener, displayRamens, handleClick, main };
