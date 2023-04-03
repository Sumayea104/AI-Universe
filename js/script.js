const loadAi = () => {
    const URl = 'https://openapi.programming-hero.com/api/ai/tools';

    fetch(URl)
        .then(res => res.json())
        .then(data => showAi(data.data.tools));
};

const showAi = (tools) => {
    const toolContainer = document.getElementById('AI-container');

    tools.slice(0, 6).forEach((tool) => {
        const aiDiv = document.createElement('div');

        aiDiv.innerHTML = `
        <div class="card w-full  bg-base-100 shadow-2xl">
            <img class="w-full h-64 px-10 pt-10" src="${tool.image}" alt="Shoes" class="rounded-xl" />
            <div class="card-body">
                <h1 class="card-title">Features</h1>
                <ol>
                    ${tool.features.map((feature, index) => `<li>${index + 1}. ${feature}</li>`).join('')}
                </ol>
                <hr>
                <h1 class="card-title">${tool.name}</h1>
                <div class="flex g-4">
                    <i class="fa-sharp fa-solid fa-calendar-days"></i>
                    <p>${tool.published_in}</p>
                    <button class="btn btn-circle btn-outline btn-accent ">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

        toolContainer.appendChild(aiDiv);
    });
};

document.getElementById('sort-date').addEventListener('click', () => {
    const toolContainer = document.getElementById('AI-container');
    const tools = Array.from(toolContainer.children);

    tools.sort((a, b) => {
        const dateA = new Date(a.querySelector('p').textContent);
        const dateB = new Date(b.querySelector('p').textContent);

        return dateB - dateA;
    });

    toolContainer.innerHTML = '';
    tools.forEach(tool => toolContainer.appendChild(tool));
});

loadAi();
