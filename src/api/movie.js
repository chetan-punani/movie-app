import axios from './index.js'

export function getAllMovies() {
    return axios({
        url: `/movies.json`,
        method: "get"
    })
}

export function getMoviesById(id) {
    return axios({
        url: `/movies/${id}.json`,
        method: "get"
    })
}
