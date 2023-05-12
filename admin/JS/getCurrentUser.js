function getCurrentUser() {
    let split_cookie = document.cookie.split(":")
    return {id_user: split_cookie[0], password: split_cookie[1]}
}