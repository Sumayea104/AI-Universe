// // Define the loadAi function
// const loadAi = () => {
//     const URL = 'https://openapi.programming-hero.com/api/ai/tools';

//     fetch(URL)
//         .then(res => res.json())
//         .then(data => showAi(data.data.tools));
// };

// // Define the showAi function
// const showAi = (tools) => {
//     // Get the AI container element
//     const toolContainer = document.getElementById('AI-container');

//     // Clear the AI container
//     toolContainer.innerHTML = '';

//     // Sort the tools by date
//     tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));

//     // Loop through the sorted tools
//     tools.slice(0, 6).forEach((tool) => {
//         const aiDiv = document.createElement('div');
//         aiDiv.innerHTML = `
//             <div class="card w-full bg-base-100 shadow-2xl">
//                 <img class="w-full h-64 px-10 pt-10" src="${tool.image}" alt="Shoes" class="rounded-xl" />
//                 <div class="card-body">
//                     <h1 class="card-title">Features</h1>
//                     <ol>
//                         ${tool.features.map((feature, index) => `<li>${index + 1}. ${feature}</li>`).join('')}
//                     </ol>
//                     <hr>
//                     <h1 class="card-title">${tool.name}</h1>
//                     <div class="flex g-4">
//                         <i class="fa-sharp fa-solid fa-calendar-days"></i>
//                         <p>${tool.published_in}</p>
//                         <button class="btn btn-circle btn-outline btn-accent">
//                             <i class="fa-solid fa-arrow-right"></i>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `;
//         toolContainer.appendChild(aiDiv);
//     });

//     // Add click event listener to sort button
//     const sortButton = document.getElementById('sort-date');
//     sortButton.addEventListener('click', () => {
//         // Sort the tools by date
//         tools.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));

//         // Clear the AI container
//         toolContainer.innerHTML = '';

//         // Loop through the sorted tools
//         tools.slice(0, 6).forEach((tool) => {
//             const aiDiv = document.createElement('div');
//             aiDiv.innerHTML = `
//                 <div class="card w-full bg-base-100 shadow-2xl">
//                     <img class="w-full h-64 px-10 pt-10" src="${tool.image}" alt="Shoes" class="rounded-xl" />
//                     <div class="card-body">
//                         <h1 class="card-title">Features</h1>
//                         <ol>
//                             ${tool.features.map((feature, index) => `<li>${index + 1}. ${feature}</li>`).join('')}
//                         </ol>
//                         <hr>
//                         <h1 class="card-title">${tool.name}</h1>
//                         <div class="flex g-4">
//                             <i class="fa-sharp fa-solid fa-calendar-days"></i>
//                             <p>${tool.published_in}</p>
//                             <button class="btn btn-circle btn-outline btn-accent">
//                                 <i class="fa-solid fa-arrow-right"></i>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             `;
//             toolContainer.appendChild(aiDiv);
//         });
//     });
    
// };

// // Show random cards initially
// loadAi();
