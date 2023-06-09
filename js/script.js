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
    <div class="card w-full bg-base-100 shadow-2xl h-full">
        <img class="w-full h-64 px-10 pt-10" src="${tool.image}" alt="" class="rounded-xl" />
        <div class="card-body">
            <h1 class="card-title">Features</h1>
            <ol>
            ${tool.features
                .map((feature, index) => `<li>${index + 1}. ${feature}</li>`)
                .join("")}
            </ol>
        <hr>
            <h1 class="card-title">${tool.name}</h1>
            <div class="flex ">
                <i class="fa-sharp fa-solid fa-calendar-days p-1"></i>
                <p>${tool.published_in}</p>
                <label for="my-modal-5" class="btn btn-circle btn-outline btn-accent " onclick="showDetails('${tool.id}')">
                <i class="fa-solid fa-arrow-right"></i>
                </label>
            </div>
        </div>
    </div>    
        <section>
            <input type="checkbox" id="my-modal-5" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box w-11/12 max-w-5xl">
                    <label for="my-modal-5"
                        class="btn btn-sm btn-circle absolute right-2 top-2 bg-white border-hidden text-red-800"> ✕
                    </label>
                    <div id="modal-details">


                    </div>
                    <div class="modal-action">
                        <label for="my-modal-5" class="btn bg-red-500 border-hidden">Close!</label>
                    </div>
                </div>
            </div>
        </section>
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
    // Display loader while the cards are being sorted
    const loader = document.getElementById("loader");
    loader.classList.remove("hidden");
    // Use setTimeout to simulate a delay while the cards are being sorted
    setTimeout(() => {
        toolContainer.innerHTML = '';
        cards.forEach((card) => toolContainer.appendChild(card));
        // Hide the loader after the cards are sorted
        loader.classList.add("hidden");
    }, 3000);
};
document.getElementById("sort-date").addEventListener("click", sortCardsByDate);
loadAi();



// function to fetch data from API and show in modal
const showDetails = (id) => {
    const apiUrl = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            // Call the showDetailsData function with the relevant data
            showDetailsData(data.data);
        })
        .catch((err) => {
            console.log("Network Problem: ", err);
            const modalDetailsContainer = document.getElementById("modal-details");
            modalDetailsContainer.innerHTML = 'Network Problem. Please try again later.';
        });
};
const showDetailsData = (data) => {
    const modalDetails = document.createElement("div");
    modalDetails.innerHTML = `
    <div class="flex flex-col md:flex-row ">
        <div class="card bg-blue-100 shadow-xl flex-1 mt-4">
            <div class="card-body">
                <h1 class="text-2xl font-bold ">${data.description}</h1>
                <div class="flex flex-col md:flex-row  justify-around">
                    <button class="btn btn-primary md:mr-4 my-2 w-full md:w-1/3">
                    ${data.pricing[0].price === "0" || data.pricing[0].price === "No cost"? `Free of cost/${data.pricing[0].plan === "Free" ? "Basic" : data.pricing[0].plan}`: `${data.pricing[0].price} ${data.pricing[0].plan}`}
                    </button>
                    <button class="btn btn-primary md:mr-4 my-2 w-full md:w-1/3">
                    ${data.pricing[1].price === "0" || data.pricing[1].price === "No cost"? `Free of cost/${data.pricing[1].plan === "Free" ? "Pro" : data.pricing[1].plan}`: `${data.pricing[1].price} ${data.pricing[1].plan}`}
                    </button>
                    <button class="btn btn-primary md:mr-4 my-2 w-full md:w-1/3">
                    ${data.pricing[2].price === "0" || data.pricing[2].price === "No cost"? `Free of cost/${data.pricing[2].plan === "Free" ? "Enterprise" : data.pricing[2].plan}`: `${data.pricing[2].price} ${data.pricing[2].plan}`}
                    </button>
                </div>
                <div class="flex flex-col md:flex-row  my-4 justify-around">
                    <div>
                        <h1 class="card-title mt-4">Features</h1>
                        <ul>
                            ${Object.values(data.features)
                            .map(feature => `<li>&bull; ${feature.feature_name}</li>`)
                            .join("")}
                        </ul>
                    </div>
                    <div>
                        <h1 class="card-title mt-4">Integrations</h1>
                            ${Object.keys(data.integrations).length > 0
                            ? `<ul>${Object.values(data.integrations)
                            .map(integration => `<li>&bull; ${integration}</li>`)
                            .join("")}</ul>`
                            : "<p>No Data Found</p>"}
                    </div>
                </div>
            </div>
        </div>
        <div class="card bg-yellow-100 shadow-xl flex-1 mt-4 sm:ml-4">
            <div class="card-body">
                <div class="relative">
                    <img class="w-full h-64 rounded-xl" src="${data.image_link[0]}" alt="ChatGPT" />
                        ${data.accuracy.score > 0 ? `<div class="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-bl-lg font-bold">${data.accuracy.score * 100}% accuracy</div>` : ""}
                </div>
                    <p>
                        ${data.input_output_examples.length > 0 ?
                        `<strong>${data.input_output_examples[0].input}</strong> <br>
                        ${data.input_output_examples[0].output}` :
                        "NO, not yet! Take a break."}
                    </p>
            </div>
        </div>
    </div>
    `;
    const modalDetailsContainer = document.getElementById("modal-details");
    modalDetailsContainer.innerHTML = '';
    modalDetailsContainer.appendChild(modalDetails);
};





