// console.log('hi its ok');
const loadAi = () => {
    const URl = 'https://openapi.programming-hero.com/api/ai/tools';

    fetch(URl)
    .then(res => res.json());
    .then(data => console.log(data.data.tools));
};
loadAi();