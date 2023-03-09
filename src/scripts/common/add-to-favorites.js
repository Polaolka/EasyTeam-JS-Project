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
