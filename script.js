const modal = document.getElementById("modal")
const modalShow = document.getElementById("show-modal")
const modalClose = document.getElementById("close-modal")
const bookmarkForm = document.getElementById("bookmark-form")
const websiteNameEl = document.getElementById("website-name")
const websiteUrlEl = document.getElementById("website-url")
const bookmarksContainer = document.getElementById("bookmarks-container")

let bookmarks = []

//Show Modal, Focus on Input
function showModal() {
    modal.classList.add("show-modal")
    websiteNameEl.focus()
}

// Modal Event Listeners
modalShow.addEventListener("click", showModal)
modalClose.addEventListener("click", () => modal.classList.remove("show-modal"))
window.addEventListener("click", (e) => (e.target === modal ? modal.classList.remove("show-modal") : false))

// Validate form
function validate(nameValue, urlValue) {
    const expression = /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/gm
    const regex = new RegExp(expression)
    if (!nameValue || !urlValue) {
        alert("Please submit values for both fields. ")
        return false;
    }
    if(!urlValue.match(regex)) {
        alert("Please provide a valid URL web address")
        return false
    }
    // Valid
    return true
}

// Build Bookmarks in the DOM 
function buildBookmarks() {
    // Build items 
    bookmarks.forEach((bookmark) => {
        const { name, url } = bookmark
        // Item 
        const item = document.createElement("div")
        item.classList.add("item")
        // Close Icon
        const closeIcon = document.createElement("i")
        closeIcon.classList.add("fa-solid", "fa-xmark")
        closeIcon.setAttribute("title", "Delete Bookmark")
        closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`)
        // Favicon / Link Container
        const linkInfo = document.createElement("div")
        linkInfo.classList.add("name")
        // Favicon
        const favicon = document.createElement("img") 
        favicon.setAttribute("src", `https://s2.googleusercontent.com/s2/favicons?domain=${url}`)
        favicon.setAttribute("alt", "Favicon")
        // Link 
        const link = document.createElement("a")
        link.setAttribute("href", `${url}`)
        link.setAttribute("target", "_blank")
        link.textContent = name
        // Append to bookmarks container.
        linkInfo.append(favicon, link)
        item.append(closeIcon, linkInfo)
        bookmarksContainer.appendChild(item)
    })
}

// Fetch Bookmark
function fetchBookmarks() {
    // Get bookmarks from localStorage if available
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmark"))
    }
    else {
        //Create bookmarks array in localStorage
        bookmarks = [
            {
                name: "Jacito Design", 
                url: "https://jacinto.design"
            }
        ]
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    }
    buildBookmarks()
}

// Handle Data from form
function storeBookMark(e) {
    e.preventDefault()
    const nameValue = websiteNameEl.value
    let urlValue = websiteUrlEl.value
    if(!urlValue.includes("http://", "https://")) {
        urlValue = `https://${urlValue}`
    }
    if(!validate(nameValue, urlValue)) {
        return false
    }
    const bookmark = {
        name: nameValue,
        url: urlValue
    }
    bookmarks.push(bookmark)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    fetchBookmarks()

    bookmarkForm.reset()
    websiteNameEl.focus()
}

// Event Listener
bookmarkForm.addEventListener("submit", storeBookMark)

// On load, fetc bookmarks 
fetchBookmarks()