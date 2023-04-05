const loadAi = () => {
    const URl = "https://openapi.programming-hero.com/api/ai/tools";

    fetch(URl)
        .then((res) => res.json())
        .then((data) => showAi(data.data.tools));
};

const showAi = (tools) => {
    const toolContainer = document.getElementById("AI-container");

    tools.forEach((tool) => {
        const aiDiv = document.createElement("div");

        aiDiv.innerHTML = `
        <div class="card w-full  bg-base-100 shadow-2xl">
          <img class="w-full h-64 px-10 pt-10" src="${tool.image
            }" alt="Shoes" class="rounded-xl" />
          <div class="card-body">
            <h1 class="card-title">Features</h1>
            <ol>
              ${tool.features
                .map((feature, index) => `<li>${index + 1}. ${feature}</li>`)
                .join("")}
            </ol>
            <hr>
            <h1 class="card-title">${tool.name}</h1>
            <div class="flex g-4">
              <i class="fa-sharp fa-solid fa-calendar-days"></i>
              <p>${tool.published_in}</p>
              
              
              <label for="my-modal-3" class="btn btn-circle btn-outline btn-accent">
                <i class="fa-solid fa-arrow-right"></i>
              </label>
              
              
            </div>
          </div>
        </div>
      `;

        toolContainer.appendChild(aiDiv);
    });

    // hide all the cards after the 6th card
    const cards = Array.from(toolContainer.children);
    cards.slice(6).forEach((card) => {
        card.style.display = "none";
    });

    // show all the cards on "See More" button click
    const seeMoreButton = document.getElementById("See-more");
    seeMoreButton.addEventListener("click", () => {
        cards.slice(6).forEach((card) => {
            card.style.display = "block";
        });
        seeMoreButton.style.display = "none";
    });
};

const sortCardsByDate = () => {
    const toolContainer = document.getElementById("AI-container");
    const cards = Array.from(toolContainer.children);

    cards.sort((a, b) => {
        const dateA = new Date(a.querySelector("p").textContent);
        const dateB = new Date(b.querySelector("p").textContent);

        return dateB - dateA;
    });

    toolContainer.innerHTML = '';
    cards.forEach((card) => toolContainer.appendChild(card));
};

document.getElementById("sort-date").addEventListener("click", sortCardsByDate);







loadAi();
