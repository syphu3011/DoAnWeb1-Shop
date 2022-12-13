function writeToLocalStorage(arr){
   let setlocal= JSON.stringify(arr)
   localStorage.setItem("data",setlocal)
   length0 = obj1.customer.length
}
let obj1 = JSON.parse(localStorage.getItem("data"))
let arr=[]
let length0 = obj1.customer.length

// Tìm kiếm
function Search(){
   let arr1 = CompareArrK(SearchALLK(),SearchStatusK())
   let arr2 = CompareArrK(SearchBirdayK(),SearchInitK())
   if(document.getElementById("HeadButton3").style.display=='block'){
      TableFindOpen(CompareArrK(arr1,arr2))
   }
   else if (document.getElementById("HeadButton2").style.display=='block'){
      TableFindLock(CompareArrK(arr1,arr2))
   }
   else{
      renderTableFind(CompareArrK(arr1,arr2))
   }
}

function SearchALLK(){
   let findall=document.getElementById("sl-all").value.toLowerCase()
   let string1 =document.getElementById("text-search").value.trim().toLowerCase()
   if(findall=="all"){
      return FindAllK(string1)
   }
   else if(findall=="id"){
      return FindIDK(string1)
   }
   else if(findall=="name"){
      return FindNameK(string1)
   }
   else if(findall=="username"){
      return FindUsernameK(string1)
   }
   else{
      return FindNumberPhoneK(string1)
   }  
}


function SearchInitK(){
   var init = document.getElementById("date-init").value
   if(init==""){
      return FindAllK("")
   }
   else{
      console.log(getDateK(init))
      return FindDateInitK(getDateK(init))
   }
   
}

function SearchStatusK(){
   let findstatus=document.getElementById("sl-status").value.toLowerCase()
   if(findstatus=="all"){
      return FindAllK("")
   }
   else{
      return FindStatusK(findstatus)
   }

}

function SearchBirdayK(){
   var birth = document.getElementById("birth-day").value
   if(birth==""){
      return FindAllK("")
   }
   else{
      console.log(getDateK(birth))
      return FindBirthdayK(getDateK(birth))
   }

}

function FindIDK(tring){
   let array=[]
   for(let i=0;i< length0;i++){
      if(obj1.customer[i].id.toLowerCase().indexOf(tring)!=-1){
         array.push(i)
      }
   }
   return array
}
function FindNameK(tring){
   let array=[]
   for(let i=0;i< length0;i++){
      if(obj1.customer[i].name.toLowerCase().indexOf(tring)!=-1){
         array.push(i)
      }
   }
   return array
}
function FindUsernameK(tring){
   let array=[]
   for(let i=0;i< length0;i++){
      if(obj1.customer[i].username.toLowerCase().indexOf(tring)!=-1){
         array.push(i)
      }
   }
   return array
}

function getDateK(date) {
   let newdate=date.split("-")[2]+"/"+date.split("-")[1]+"/"+date.split("-")[0]
   return newdate
}

function FindBirthdayK(tring){
   let array=[]
   for(let i=0;i< length0;i++){
      if(obj1.customer[i].birth_day.indexOf(tring)!=-1){
         array.push(i)
      }
   }
   return array
}
function FindDateInitK(tring){
   let array=[]
   for(let i=0;i< length0;i++){
      if(obj1.customer[i].date_init.indexOf(tring)!=-1){
         array.push(i)
      }
   }
   return array
}

function FindNumberPhoneK(tring){
   let array=[]
   for(let i=0;i< length0;i++){
      if(obj1.customer[i].number_phone.indexOf(tring)!=-1){
         array.push(i)
      }
   }
   return array
}

function FindStatusK(tring){
   let array=[]
   for(let i=0;i< length0;i++){
      if(obj1.customer[i].status.toLowerCase().indexOf(tring)!=-1){
      array.push(i)
      }
   }
   return array
}
function FindAllK(tring){
   let array=[]
   for(let i=0;i< length0;i++){
      if(obj1.customer[i].id.toLowerCase().indexOf(tring)!=-1
      ||obj1.customer[i].name.toLowerCase().indexOf(tring)!=-1
      ||obj1.customer[i].username.toLowerCase().indexOf(tring)!=-1
      ||obj1.customer[i].number_phone.toLowerCase().indexOf(tring)!=-1
      ||obj1.customer[i].status.toLowerCase().indexOf(tring)!=-1
      ||obj1.customer[i].birth_day.indexOf(tring)!=-1
      ||obj1.customer[i].date_init.indexOf(tring)!=-1){
         array.push(i)
      }
   }
   return array
}
function CompareArrK(ar1,ar2){
   let array=[]
   for(let i=0;i<ar1.length;i++){
      for(let j=0; j<ar2.length;j++){
         if(ar2[j]==ar1[i]){
            array.push(ar1[i])
         }
      }
   }
   return array
}

// Lấy Checkbox
function SetCheckboxK(id){
   if(id.checked){
      arr.push(id.id)
      
   }
   else{
      arr.splice(Location1(id.id),1)
   }
   console.log(arr)
}

function Location1(id){
   for(let i=0;i<arr.length;i++)
      if(id==arr[i])
         return i
}
function LocationID(x){
   for(var i=0;i<length0;i++){
      if(x==obj1.customer[i].id)
         return i;
   }
}


// Khóa tài khoản
function LockAccount(){
   var length1 = arr.length
   for(var i=0;i<length1;i++){
      let x = LocationID(arr[i])
      console.log(x)
      ConfirmLock(x);
   }
   ClosePopupLock()
   CloseBtnLock()
}
function ConfirmOpenLock(i){
   obj1.customer[i].status="còn hoạt động"
   writeToLocalStorage(obj1)
}


// Mở khóa tài khoản
function OpenAccount(){
   var length1 = arr.length
   for(var i=0;i<length1;i++){
      let x = LocationID(arr[i])
      console.log(x)
      ConfirmOpenLock(x);
   }
   ClosePopupOpen()
   CloseBtnLock()
}
function ConfirmLock(i){
      obj1.customer[i].status="đã khóa"
      writeToLocalStorage(obj1)
}

// Fill bảng tìm kiếm
function renderTableFind(find){
   let table = document.getElementById("myTable");
   for(let i = table.rows.length - 1; i > 0; i--)
   table.deleteRow(i);
   for(let i = 0; i < find.length; i++)
   {
      let row = table.insertRow(); 
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      let cell4 = row.insertCell(4);
      let cell5 = row.insertCell(5);
      let cell6 = row.insertCell(6);
      cell0.innerHTML = obj1.customer[find[i]].id
      cell1.innerHTML = obj1.customer[find[i]].name;
      cell2.innerHTML = obj1.customer[find[i]].username ;
      cell3.innerHTML = obj1.customer[find[i]].birth_day;
      cell4.innerHTML = obj1.customer[find[i]].number_phone;
      cell5.innerHTML = obj1.customer[find[i]].date_init
      cell6.innerHTML = obj1.customer[find[i]].status;
   }
}

function TableFindOpen(find){
   let table = document.getElementById("myTable");
   for(let i = table.rows.length - 1; i > 0; i--)
   table.deleteRow(i);
   for(let i = 0; i < find.length; i++)
   {
      if(obj1.customer[i].status.toLowerCase()=="cón hoạt động"){
         continue
      }
      else{
         let row = table.insertRow(); 
         let cell0 = row.insertCell(0);
         let cell1 = row.insertCell(1);
         let cell2 = row.insertCell(2);
         let cell3 = row.insertCell(3);
         let cell4 = row.insertCell(4);
         let cell5 = row.insertCell(5);
         let cell6 = row.insertCell(6);
         let cell7 = row.insertCell(7);
         cell0.innerHTML = obj1.customer[find[i]].id
         cell1.innerHTML = obj1.customer[find[i]].name;
         cell2.innerHTML = obj1.customer[find[i]].username ;
         cell3.innerHTML = obj1.customer[find[i]].birth_day;
         cell4.innerHTML = obj1.customer[find[i]].number_phone;
         cell5.innerHTML = obj1.customer[find[i]].date_init
         cell6.innerHTML = obj1.customer[find[i]].status;
         cell7.innerHTML = `<input id= "`+obj1.customer[i].id+`" 
         style= "cursor: pointer;" type='checkbox' onchange=SetCheckboxK(this)>`;
      }  
   }
}

function TableFindLock(find){
   let table = document.getElementById("myTable");
   for(let i = table.rows.length - 1; i > 0; i--)
   table.deleteRow(i);
   for(let i = 0; i < find.length; i++)
   {
      if(obj1.customer[i].status.toLowerCase()=="đã khóa")
      {
         continue
      }
      else{
      let row = table.insertRow(); 
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      let cell4 = row.insertCell(4);
      let cell5 = row.insertCell(5);
      let cell6 = row.insertCell(6);
      let cell7 = row.insertCell(7);
      cell0.innerHTML = obj1.customer[find[i]].id
      cell1.innerHTML = obj1.customer[find[i]].name;
      cell2.innerHTML = obj1.customer[find[i]].username ;
      cell3.innerHTML = obj1.customer[find[i]].birth_day;
      cell4.innerHTML = obj1.customer[find[i]].number_phone;
      cell5.innerHTML = obj1.customer[find[i]].date_init
      cell6.innerHTML = obj1.customer[find[i]].status;
      cell7.innerHTML = `<input id= "`+obj1.customer[i].id+`" 
      style= "cursor: pointer;" type='checkbox' onchange=SetCheckboxK(this)>`;
      }  
   }
}

//Fill Bảng

function renderTable(){
   let table = document.getElementById("myTable");
   for(let i = table.rows.length - 1; i > 0; i--){
      table.deleteRow(i);
   }
   for(let i = 0; i < length0; i++)
   {
      if(obj1.customer[i].status.toLowerCase()=="đã khóa")
      {
         continue
      }
      else{
      let row = table.insertRow(); 
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      let cell4 = row.insertCell(4);
      let cell5 = row.insertCell(5);
      let cell6 = row.insertCell(6);
      cell0.innerHTML = obj1.customer[i].id
      cell1.innerHTML = obj1.customer[i].name;
      cell2.innerHTML = obj1.customer[i].username ;
      cell3.innerHTML = obj1.customer[i].birth_day;
      cell4.innerHTML = obj1.customer[i].number_phone;
      cell5.innerHTML = obj1.customer[i].date_init
      cell6.innerHTML = obj1.customer[i].status;
      }
   }
}
// Fill checkbox
function renderLock_CheckBoxTable(){
   let table = document.getElementById("myTable");
   for(let i = table.rows.length - 1; i > 0; i--)
   table.deleteRow(i);
   for(let i = 0; i < length0; i++)
   {
      if(obj1.customer[i].status.toLowerCase()=="đã khóa"){
         continue
      }
      else{
         let row = table.insertRow(); 
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      let cell4 = row.insertCell(4);
      let cell5 = row.insertCell(5);
      let cell6 = row.insertCell(6);
      let cell7 = row.insertCell(7);
      cell0.innerHTML = obj1.customer[i].id
      cell1.innerHTML = obj1.customer[i].name;
      cell2.innerHTML = obj1.customer[i].username ;
      cell3.innerHTML = obj1.customer[i].birth_day;
      cell4.innerHTML = obj1.customer[i].number_phone;
      cell5.innerHTML = obj1.customer[i].date_init
      cell6.innerHTML = obj1.customer[i].status;
      cell7.innerHTML = `<input id= "`+obj1.customer[i].id+`" 
      style= "cursor: pointer;" type='checkbox' onchange=SetCheckboxK(this)>`;
      }
   }
}

function renderOpen_CheckBoxTable(){
   let table = document.getElementById("myTable");
   for(let i = table.rows.length - 1; i > 0; i--)
   table.deleteRow(i);
   for(let i = 0; i < length0; i++)
   {
      if(obj1.customer[i].status.toLowerCase()=="còn hoạt động"){
         continue
      }
      else{
         let row = table.insertRow(); 
      let cell0 = row.insertCell(0);
      let cell1 = row.insertCell(1);
      let cell2 = row.insertCell(2);
      let cell3 = row.insertCell(3);
      let cell4 = row.insertCell(4);
      let cell5 = row.insertCell(5);
      let cell6 = row.insertCell(6);
      let cell7 = row.insertCell(7);
      cell0.innerHTML = obj1.customer[i].id
      cell1.innerHTML = obj1.customer[i].name;
      cell2.innerHTML = obj1.customer[i].username ;
      cell3.innerHTML = obj1.customer[i].birth_day;
      cell4.innerHTML = obj1.customer[i].number_phone;
      cell5.innerHTML = obj1.customer[i].date_init
      cell6.innerHTML = obj1.customer[i].status;
      cell7.innerHTML = `<input id= "`+obj1.customer[i].id+`" type='checkbox'
      style= "cursor: pointer;" onchange=SetCheckboxK(this)>`;
      }
   }
}
 
//Đóng mở 
function OpenBtnLock() {
   document.getElementById("HeadButton1").style.display='none'
   document.getElementById("HeadButton2").style.display='block'
   document.getElementById("HeadButton3").style.display='none'
   renderLock_CheckBoxTable()
}

function CloseBtnLock(){
   document.getElementById("HeadButton1").style.display='block'
   document.getElementById("HeadButton2").style.display='none'
   document.getElementById("HeadButton3").style.display='none'
   renderTable()
   arr.splice(0,arr.length)
   writeToLocalStorage(obj1)
}
function OpenBtnOLock(){
   document.getElementById("HeadButton1").style.display='none'
   document.getElementById("HeadButton2").style.display='none'
   document.getElementById("HeadButton3").style.display='block'
   renderOpen_CheckBoxTable() 
}
function OpenFilter(){
   document.getElementById("dialog").style.display='flex'
   document.getElementById('Section').style.display='flex'
}

function CloseFilter(){
   document.getElementById("dialog").style.display='none'
   document.getElementById('Section').style.display='none'
}

function OpenPopupLock(){
   if(arr.length==0){
      alert("Bạn chưa chọn tài khoản để khóa")
   }
   else{
      document.getElementById("dialog").style.display='flex'
      document.getElementById('Confirm-Cancel-Lock').style.display='flex'
   }
   
}
function ClosePopupLock(){
   document.getElementById("dialog").style.display='none'
   document.getElementById('Confirm-Cancel-Lock').style.display='none'
}

function OpenPopupOpen(){
   if(arr.length==0){
      alert("Bạn chưa chọn tài khoản để mở khóa")
   }
   else{
      document.getElementById("dialog").style.display='flex'
      document.getElementById('Confirm-Cancel-Open').style.display='flex'
   }
   
}
function ClosePopupOpen(){
   document.getElementById("dialog").style.display='none'
   document.getElementById('Confirm-Cancel-Open').style.display='none'
}
renderTable()