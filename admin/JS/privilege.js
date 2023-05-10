let dataArr = {};

function renderTablePrivilege() {
  $("#table-privilege").html(`
    <tr class="first-row">
      <th>id bảng</th>
      <th>xem</th>
      <th>thêm</th>
      <th>sửa</th>
      <th>xóa</th>
    </tr>
  `);

  $.ajax({
    url: './Server/privilege/privilege_table.php',
    type: 'GET',
    success: function(privilege) {
      let table = document.getElementById("table-privilege");
      privilege = JSON.parse(privilege);
      alreadyPrivilege1 = [];
      alreadyPrivilege2 = [];
      dataArr = privilege.privilege_general;
      // console.log(dataArr)
      dataArr.forEach(function (element) {
        if (alreadyPrivilege1.includes(element.id_table)) {
          let temp = alreadyPrivilege2[alreadyPrivilege1.indexOf(element.id_table)];
          temp += element.id_feature;
          alreadyPrivilege2[alreadyPrivilege1.indexOf(element.id_table)] = temp;
        } else {
          alreadyPrivilege1.push(element.id_table);
          alreadyPrivilege2.push(element.id_feature);
        }
      });
      alreadyPrivilege1.forEach(function (element) {
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        let cell4 = row.insertCell(4);
        cell0.innerHTML = `${element}`
        
        let mirror = alreadyPrivilege2[alreadyPrivilege1.indexOf(element)]
        
        if (mirror.includes("xem"))
          cell1.innerHTML = `
            <input onclick="toggleEdit(this.id)" type="checkbox" id="${element}-xem" checked>
          `;
        else
          cell1.innerHTML = `
            <input onclick="toggleEdit(this.id)" type="checkbox" id="${element}-xem">
          `;

        if (mirror.includes("them"))
          cell2.innerHTML = `
            <input onclick="toggleEdit(this.id)" type="checkbox" id="${element}-them" checked>
          `;
        else
          cell2.innerHTML = `
            <input onclick="toggleEdit(this.id)" type="checkbox" id="${element}-them">
          `;
          
        if (mirror.includes("sua"))
          cell3.innerHTML = `
            <input onclick="toggleEdit(this.id)" type="checkbox" id="${element}-sua" checked>
          `;
        else
          cell3.innerHTML = `
            <input onclick="toggleEdit(this.id)" type="checkbox" id="${element}-sua">
          `;

        if (mirror.includes("xoa"))
          cell4.innerHTML = `
            <input onclick="toggleEdit(this.id)" type="checkbox" id="${element}-xoa" checked>
          `;
        else
          cell4.innerHTML = `
            <input onclick="toggleEdit(this.id)" type="checkbox" id="${element}-xoa">
          `;
      })
      
    },
    error: function(data) {
      console.log(data.message);
    }
  });

  

}

renderTablePrivilege()

function toggleEdit(id) {
  let isChecked = $(`#${id}`).prop("checked");
  let tempArr = id.split("-");
  let id_table = tempArr[0];
  let id_feature = tempArr[1];
  console.log(id_table)
  console.log(id_feature)
  if (isChecked) {
    $.post(
      './Server/privilege/privilege_table.php', 
      {
        id_table: id_table,
        id_feature: id_feature,
        action: "check"
      }
    ).done(function (res) {
      console.log(JSON.parse(res))
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error:', textStatus);
    });
  } else {
    $.post(
      './Server/privilege/privilege_table.php', 
      {
        id_table: id_table,
        id_feature: id_feature,
        action: "uncheck"
      }
    ).done(function (res) {
      console.log(JSON.parse(res))
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error:', textStatus);
    });
  }
} 






$("#pri-detail-exit").click(function () {
  $("#popup-content-pane-privilege").css("display", "none");
})

$("#pri-detail-add").click(function () {
  let table = document.getElementById("table-privilege-detail");
  let row = table.insertRow();
  let cell0 = row.insertCell(0);
  let cell1 = row.insertCell(1);
  let cell2 = row.insertCell(2);
  let cell3 = row.insertCell(3);
  cell0.innerHTML = `<input type="text" id="add-pri-det-1">`
  cell1.innerHTML = `<input type="text" id="add-pri-det-2">`
  cell2.innerHTML = `<input type="text" id="add-pri-det-3">`
  cell3.innerHTML = `
  <button id="submit-pri-detail">Lưu</button>
  `
  $("#add-pri-det-1").focus();
  $("#submit-pri-detail").click(function () {
    let id_table = $("#add-pri-det-1").val();
    let id_feature = $("#add-pri-det-2").val();
    let id_user = $("#add-pri-det-3").val();
    let table = document.getElementById("table-privilege-detail");
    table.deleteRow(table.rows.length - 1);
    
    $.post(
      './Server/privilege/privilege_general_detail.php', 
      {
        id_table: id_table,
        id_feature: id_feature,
        id_user: id_user
      }
    ).done(function (res) {
      if (res.message === "Chỉ định quyền thành công.") {
        alert(res.message);
      }
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error:', textStatus);
    });
    
  })
})

$("#pri-detail-f5").click(function () {
  renderTablePrivilegeDetail();
})

$('#request-privilege').click(function () {
  renderTablePrivilegeDetail();
  $("#popup-content-pane-privilege").css("display", "flex");
})


function renderTablePrivilegeDetail(alreadyPrivilege1, alreadyPrivilege2) {

  $.ajax({
    url: './Server/privilege/privilege_general_detail.php',
    type: 'GET',
    success: function(privilege) {
      // console.log(privilege);
      let table = document.getElementById("table-privilege-detail");
      for (let i = table.rows.length - 1; i > 0; i--)
        table.deleteRow(i);
      privilege = JSON.parse(privilege);
      alreadyPrivilege1 = [];
      alreadyPrivilege2 = [];
      dataArr = privilege.privilege_general_detail;
      // console.log(dataArr)
      dataArr.forEach(function (element) {
        let row = table.insertRow();
        let cell0 = row.insertCell(0);
        let cell1 = row.insertCell(1);
        let cell2 = row.insertCell(2);
        let cell3 = row.insertCell(3);
        cell0.innerHTML = `${element.id_table}`
        cell1.innerHTML = `${element.id_feature}`
        cell2.innerHTML = `${element.id_user}`
        cell3.innerHTML = `
        <button id="del-pri-${element.id_table}-${element.id_feature}-${element.id_user}" onclick="deletePriDet(this.id)">Xóa</button>
        `
    });
    },
    error: function(data) {
      console.log(data.message);
    }
  });

  

}

function deletePriDet (id) {
  let substr = id.split("-");
  let id_table = substr[2]
  let id_feature = substr[3]
  let id_user = substr[4]

  // console.log({
  //   id_table: id_table,
  //   id_feature: id_feature,
  //   id_user: id_user
  // })

  $.ajax({
    url: './Server/privilege/privilege_general_detail.php', 
    type: 'PUT',
    data: JSON.stringify({ 
      id_table: id_table,
      id_feature: id_feature,
      id_user: id_user
    }), 
    contentType: 'application/json',
    dataType: 'json',
    success: function(response) {
      console.log(response); 
    },
    error: function(xhr, status, error) {
      console.error(error); 
    }
  });
}

renderTablePrivilegeDetail(1, 2)