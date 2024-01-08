const loadPhone = async(searchText, isShowALL) =>{
    const result = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await result.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones, isShowALL);
}
const displayPhone = (phones, isShowALL) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards 
    phoneContainer.textContent = '';

    // display show all button if there are more then 12 phones 
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowALL){
        showAllContainer.classList.remove('hidden'); 
    }
    else{
        showAllContainer.classList.add('hidden');
    } 
    // console.log('is show all', isShowALL);
    //Display only first 12 phones if not show all
    if(!isShowALL){
        phones = phones.slice(0, 12);
    }     
    phones.forEach(phone => {
        // console.log(phone);
        // 1.create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        // 2.set innerHTML 
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
          </div>
        </div> 
        `;
        // 4. Append Child 
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner 
    toggleLoadingSpinner(false);
}
//
const handleShowDetail = async(id) =>{
    // console.log('clicked', id);
    // load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
} 
const showPhoneDetails = (phone) =>{ 
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img class="py-4" src="${phone.image}" alt=""/>
        <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span>Display Size: </span>${phone.mainFeatures?.displaySize}</p>
        <p><span>Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span>Memory: </span>${phone?.mainFeatures?.memory}</p>
        <p><span>Slug: </span>${phone?.slug}</p>
        <p><span>GPS: </span>${phone?.others?.GPS}</p>
        <p><span>Brand: </span>${phone?.brand}</p>
    `;
    // show the modal 
    showDetailsModal.showModal();
}
// Handle Search Button 
const handleSearch = (isShowALL) =>{
    toggleLoadingSpinner(true);
    const searchField1 = document.getElementById('search-field');
    const searchText1 = searchField1.value;
    console.log(searchText1);
    loadPhone(searchText1, isShowALL);
};
// Handle Search Recap
// const handleSearch2 = () =>{
//     toggleLoadingSpinner(true);
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText);   
// }

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}
// handle showAll 
const handleShowAll = () =>{
    handleSearch(true);
}
// loadPhone();