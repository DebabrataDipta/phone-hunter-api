const loadPhone = async() =>{
    const result = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await result.json();
    const phones = data.data;
    console.log(phones);
}
loadPhone();