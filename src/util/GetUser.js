export function getUserDetails(){
    let user = localStorage.getItem('toDoAppUser');
    // console.log(user)
    return user;
}