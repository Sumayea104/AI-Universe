// console.log('hi its ok');
const loadAi = () => {
    const URl = 'https://openapi.programming-hero.com/api/ai/tools';

    fetch(URl)
        .then(res => res.json())
        .then(data => showAi(data.data.tools));
};

const showAi = (tools) => {
    // console.log(data);
    tools.slice(0, 6).forEach((tool) => {
        console.log(tool.image);

    const toolContainer =document.getElementById('AI-container');
    const aiDiv = document.createElement('div');
    // aiDiv.classList.add('col');
    aiDiv.innerHTML = `
    <div  class="card w-full  bg-base-100 shadow-2xl">
    <figure class="px-10 pt-10">
            <img class="w-full h-64" src="${'tool.image'}" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body">
            <h2 class="card-title">Features</h2>
            
            <button class="btn btn-primary">
                <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    </div>
    `

    toolContainer.appendChild(aiDiv);
    });
    
};


loadAi();