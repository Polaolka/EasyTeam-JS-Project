// const galleryElement = document.querySelector('.gallery__wrapper');
// const addToFavBtn = document.querySelector('.buttons__btn--add-to');

// galleryElement.addEventListener('click', handleAddToFavClick);
// function handleAddToFavClick(e) {
//     if (e.target !== addToFavBtn) {
//         console.log('No');
//         return
//     }
//     console.log(e.target);

// }

export function addToFavHandler() {
    const id = this.attributes['data-id'].value
    const favIds = JSON.parse(localStorage.getItem('favIds') ?? '{}')
    if (favIds[id]) {
        delete favIds[id];
        this.classList.remove('is-favorite')
    } else {
        favIds[id] = true;
        this.classList.add('is-favorite')
    }

    localStorage.setItem('favIds', JSON.stringify(favIds));

}
// export function addToFavHandler(e) {
//     const id = e.target.dataset.id
//     console.log('id: ', id);
//     const favIds = JSON.parse(localStorage.getItem('favIds') ?? '{}')
//     if (favIds[id]) {
//         delete favIds[id];
//         // this.classList.remove('is-favorite')
//     } else {
//         favIds[id] = true;
//         // this.classList.add('is-favorite')
//     }

//     console.log('favIds: ', favIds);
//     localStorage.setItem('favIds', JSON.stringify(favIds));