/*
    Cookies:
        - Get cookie by name
*/

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    else return null;
}

const auth_token = getCookie('auth_token');

/*
    Tweets:
        -Tweet anmation when entering the screen
*/

const tweets = document.querySelectorAll('.tweet');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-tweet')
        } else {
            entry.target.classList.remove('show-tweet')
        }
    })
})

tweets.forEach(tweet => observer.observe(tweet))