// console.log('hi its ok');
const loadAi = () => {
    const URl = 'https://openapi.programming-hero.com/api/ai/tools';

    fetch(URl)
        .then(res => res.json())
        .then(data => showAi(data.data.tools));
};

const showAi = (data) => {
    console.log(data);
}
loadAi();