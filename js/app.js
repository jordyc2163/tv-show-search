/**
 * 
 * @param {string} query Show being searched which will be added to the api url
 * @returns api list of objects
 */
const getShows = async (query) => {
    const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${query}`)
    const data = response.data
    return data
}


/**
 * 
 * @param {string} data takes info from individual objects returned from the api call
 */
const createFig = (data) => {
    const fig = document.createElement('figure')
    const img = document.createElement('img')
    const caption = document.createElement('figcaption')
    const div = document.createElement('div')
    const innerDiv = document.createElement('div')

    // div content
    div.setAttribute('class', 'card')
    div.setAttribute('style', 'width: 18rem;')
    innerDiv.setAttribute('class', 'card-body')

    const icon = document.createElement('i')
    icon.setAttribute('class', 'bi bi-star-fill text-warning')
    const h5 = document.createElement('h5')
    h5.setAttribute('class', 'card-title')
    h5.append('Rating ')
    h5.appendChild(icon)
 

    const para = document.createElement('p')
    para.setAttribute('class', 'card-text')

    if(data.show.rating.average){
        para.innerText = `${data.show.rating.average}/10`
    }
    else{
        para.innerText = `None`
    }
    

    const anchorTag = document.createElement('a')
    anchorTag.setAttribute('class', 'btn btn-primary')
    anchorTag.setAttribute('href', `${data.show.url}`)
    anchorTag.innerText = 'View Show'
    
    innerDiv.append(h5, para, anchorTag)
    div.append(innerDiv)


    // figure attributes
    fig.setAttribute('class', 'figure')

    // img attributes
    img.setAttribute('class', 'figure-img img-fluid rounded')
    if(data.show.image.medium !== null){
        console.log('this is medium', data.show.image.medium)
        img.setAttribute('src', `${data.show.image.medium}`)
    }
    else{
        console.log('this is original', data.show.image.original)
        img.setAttribute('src', `${data.show.image.original}`)
    }
    
    img.setAttribute('alt', `${data.show.name} image cover`)

    // caption attributes
    caption.setAttribute('class', 'figure-caption')

    // show summary returns elements in the form of a string, we can parse it back to html using DOMParser()
    const text = data.show.summary

    caption.innerHTML = text


    fig.appendChild(img)
    fig.append(div)
    fig.appendChild(caption)

    return fig
}

/**
 * 
 * @param {string} query name of the show to be searched
 * @param {string} el the element type to append shows onto, defaults to 'ul'
 */
 const addData = async (data, el = 'ul') => {
    try{
        console.log(data)
    const li = document.createElement('li')

    li.setAttribute('class', 'list-group-item')
    li.appendChild(await createFig(data))
    const element = document.querySelector(`${el}`)
    element.appendChild(li)
    }
    catch(e){
        console.log('it happened in addData', e)
    }
    
}

const button = document.querySelector('button')
const input = document.querySelector('input')
const ul = document.querySelector('ul')

// clears the list
const clearBoard = () => {
    ul.innerHTML = ''
}


button.addEventListener('click', async (event) => {
    event.preventDefault()
    clearBoard()
    const query = input.value
    const allShows = await getShows(query)
    for(show of allShows){
        if(show.show.image === null){
            continue
        }
        else{
            addData(show)
        }
    }
})