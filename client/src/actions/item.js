// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host
// console.log('Current environment:', ENV.env)

export const getItemsList = (App) => {
    // the URL for the request
    const url = `${API_HOST}/api/itemAll`;

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get items");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            console.log(json)
            console.log("initial item")
            App.setState({ ItemAll: json, ItemCurrent: json });
        })
        .catch(error => {
            console.log("error")
            console.log(error);
        });
};


// A function to send a POST request with a new user
export const addItem = (Publish, theApp) => {
    // the URL for the request
    const url = `${API_HOST}/api/itemAll`;

    const all = {
        id: theApp.state.IDcurrent,
        name: Publish.state.Name,
        owener: theApp.state.UserCurrent.Uid,
        region: Publish.state.region,
        location: Publish.state.Place,
        description: Publish.state.Description,
        type: Publish.state.Type
    };

    // console.log(all);

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
        .catch(error => {
            console.log(error);
        });
};

export const removeItem = (item) => {
    // the URL for the request
    const url = `${API_HOST}/api/itemAll`;

    // const all = {
    //     id: theApp.state.IDcurrent,
    //     name: Publish.state.Name,
    //     owener: theApp.state.UserCurrent.Uid,
    //     region: Publish.state.region,
    //     location: Publish.state.Place,
    //     description: Publish.state.Description,
    //     type: Publish.state.Type
    // };
    //
    // console.log(all);

    const deleteItem = {
        id: item.id
    }
    // console.log(deleteItem)

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "delete",
        // The data we are going to send in our request
        body: JSON.stringify(deleteItem),
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













