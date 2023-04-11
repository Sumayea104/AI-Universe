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
    <div class="card w-full bg-base-100 shadow-2xl">
        <img class="w-full h-64 px-10 pt-10" src="${tool.image}" alt="Shoes" class="rounded-xl" />
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
                <label for="my-modal-3" class="btn btn-circle btn-outline btn-accent" onclick="showDetails('${tool.id}')">
                <i class="fa-solid fa-arrow-right"></i>
                </label>
            </div>
        </div>
    </div>

    
        <section>

            <input type="checkbox" id="my-modal-3" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box relative">
                    <label for="my-modal-3"
                        class="btn btn-sm btn-circle absolute right-2 top-2 bg-white border-hidden text-red-800"> ✕
                    </label>
                    <div id="modal-details">


                    </div>
                    <div class="modal-action">
                        <label for="my-modal-3" class="btn bg-error border-hidden">Close!</label>
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

    toolContainer.innerHTML = '';
    cards.forEach((card) => toolContainer.appendChild(card));
};

document.getElementById("sort-date").addEventListener("click", sortCardsByDate);

loadAi();
// function to fetch data from API and show in modal
const showDetails = (id) => {
    const apiUrl = 'https://openapi.programming-hero.com/api/ai/tool/01';
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            // Get the relevant data from the API response
            
            const description = data.data.description;
            
            
            const features = data.data.features;
            const integrations = data.data.integrations;
            
            const pricing = data.data.pricing;
            const accuracy = data.data.accuracy;
        
            // Display the data on the HTML page
            
            document.getElementById('description').innerHTML = description;
            
            document.getElementById('features').innerHTML = JSON.stringify(features);
            document.getElementById('integrations').innerHTML = JSON.stringify(integrations);
            
            document.getElementById('pricing').innerHTML = JSON.stringify(pricing);
            document.getElementById('accuracy-score').innerHTML = accuracy.score;
            document.getElementById('accuracy-description').innerHTML = accuracy.description;
            })
        .catch((err)=> {
            console.log(err);
        });
    };
    const showDetailsData = (data) => {
        const modal = document.getElementById("my-modal-3");
        data.forEach((info) =>{
            const modalDetails = document.createElement("div");
            modalDetails.className = "card lg:card-side bg-base-100 shadow-xl my-12 p-8";
            modalDetails.innerHTML = `
                <div>
                    <h1>${info.data.description}</h1>
                    
                    <div class="flex">
                        <p>${info.data.pricing[0].plan}: ${info.data.pricing[0].price}</p>
                        <p>${info.data.pricing[1].plan}: ${info.data.pricing[1].price}</p>
                        <p>${info.data.pricing[2].plan}: ${info.data.pricing[2].price}</p>
                    </div>
                </div>
                <div class="card-body">
                    <img class="w-full h-64 px-10 pt-10" src="${info.data.image_link[0]}" alt="ChatGPT" class="rounded-xl" />
                    <h2 class="card-title">Use Cases:</h2>
                    <ul>
                        <li>${info.data.use_cases[0].name}: ${info.data.use_cases[0].description}</li>
                        <li>${info.data.use_cases[1].name}: ${info.data.use_cases[1].description}</li>
                        <li>${info.data.use_cases[2].name}: ${info.data.use_cases[2].description}</li>
                    </ul>
                    <p>Accuracy Score: ${info.data.accuracy.score}</p>
                    <p>Accuracy Description: ${info.data.accuracy.description}</p>
                </div>
            `;
            modal.appendChild(modalDetails);
        });
    };
    



showDetails();