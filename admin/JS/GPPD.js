let errors = 'Có lỗi xảy ra!'
async function get(dir) {
    let data_response = await $.ajax({
        url: dir,
        type: 'GET',
        dataType: 'json'
    }).then(function(responseData) {
        return responseData
    }).catch(function(error) {
        // Xử lý lỗi
        return errors
    });
    return data_response
}
async function post(data,dir) {
    let data_response = await $.ajax({
        url: dir,
        type: 'POST',
        data: data,
        dataType: 'text',
        contentType: false,
        processData: false,
    }).then(function(responseData) {
        return responseData
    }).catch(function(error) {
        // Xử lý lỗi
        return errors
    });
    return data_response
}
async function postJSON(data,dir) {
    let data_response = await $.ajax({
        url: dir,
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",
        data: data
    }).then(function(responseData) {
        return responseData
    }).catch(function(error) {
        // Xử lý lỗi
        return errors
    });
    return data_response
}
async function put(data,dir) {
    let data_response = await $.ajax({
        url: dir,
        type: 'PUT',
        data: data,
        dataType: 'json',
        contentType: false,
        processData: false,
    }).then(function(responseData) {
        return responseData
    }).catch(function(error) {
        // Xử lý lỗi
        return errors
    });
    return data_response
}
async function delete_data(data,dir) {
    let data_response = await $.ajax({
        url: dir,
        data: data,
        type: 'DELETE',
        dataType: 'json',
        contentType: false,
        processData: false,
    }).then(function(responseData) {
        return responseData
    }).catch(function(error) {
        // Xử lý lỗi
        console.log(error);
    });
    return data_response
}