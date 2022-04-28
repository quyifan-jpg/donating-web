// environment configutations
import ENV from './../config.js'

const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

export const getUsersList = (App) => {
    // the URL for the request
    const url = `${API_HOST}/api/userAll`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get users");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            console.log(json)
            App.setState({ UserAll: json });
        })
        .catch(error => {
            console.log(error);
        });
};

export const loginUser = (NavigationBar, theApp) =>{
    const url = `${API_HOST}/api/login`;

    const theUser ={
        Username: NavigationBar.state.loginUsername,
        password: NavigationBar.state.loginPassword
    }
    console.log(theUser)
    console.log("set request")
    const request = new Request(url, {
        method: "POST",
        // The data we are going to send in our request
        body: JSON.stringify(theUser),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });
    fetch(request)
    .then( (res) => {
        if (res.status === 200) {
            return res.json();
        }
        else{
            console.log("failed")
            return res.json()
        }
    })
    .then(json => {
        const newUser = json.UserCurrent
        // newUser.Uid = newUser._id
        theApp.setState({ UserCurrent: newUser });
        console.log(theApp)
    })
    .catch(error => {
        console.log(error);
    });
}


// A function to send a POST request with a new user
export const addUser = (NavigationBar, theApp) => {
    // the URL for the request
    const url = `${API_HOST}/api/register`;

    const all = {
        Username: NavigationBar.state.registerUsername,
        password: NavigationBar.state.registerPassword};

    // console.log(all)

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        // The data we are going to send in our request
        body: JSON.stringify(all),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            // newUser.Uid = newUser._id
            console.log(theApp.state.UserAll)
            console.log(json)
            theApp.state.UserAll.push(json)
            console.log(theApp)
        })
        .catch(error => {
            console.log(error);
        });
};

export const checkSession = (app) => {
    const url = `${API_HOST}/users/check-session`;

        fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.UserCurrent) {
                const newUser = json.UserCurrent
                app.setState({ UserCurrent: newUser });
                console.log("refesh")
            }
        })
        .catch(error => {
            console.log(error);
        });
    
    
};

export const changePasswordEmailPhoneNumber = (userID, newPassword, newEmail, newPhoneNumber) => {
    const url = `${API_HOST}/api/userAll`;

    const updateUser = {
        id: userID,
        password: newPassword,
        email: newEmail,
        phone_number: newPhoneNumber
    }
    console.log(updateUser)

    fetch(url, {
        method: "PATCH",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateUser)
    }).then(function (res) {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
}


export const removeUser = (userID) => {
    // the URL for the request
    const url = `${API_HOST}/api/userAll`;

    const deleteUser = {
        id: userID
    }
    // console.log(deleteItem)

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "delete",
        // The data we are going to send in our request
        body: JSON.stringify(deleteUser),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

