let errors = 'Có lỗi xảy ra!'
async function get(data, dir) {
    let data_response = await $.ajax({
        url: dir,
        type: 'POST',
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
async function getText(data, dir) {
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
async function delete_data(data,dir) {
    let data_response = await $.ajax({
        url: dir,
        data: data,
        type: 'POST',
        dataType: 'text',
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
function to_form_data(object) {
    var formData = new FormData();

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            formData.append(key, object[key]);
        }
    }

    return formData;
}

function to_form_data_with_name(objects, name) {
    var formData = new FormData();

    for (const key in objects) {
        formData.append(name, objects[key]);
    }

    return formData;
}
function to_form_data_have_image(object, name_form_for_images, files) {
    var formData = new FormData();

    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            formData.append(key, object[key]);
        }
    }
    for (var index = 0; index < files.length; index++) {
        formData.append(name_form_for_images, files[index]);
     }
    return formData;
}