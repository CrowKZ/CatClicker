/**
* BEGINING
*/

var model ={
  currentCat : 0,
  init: function() {
    if (!localStorage.cats) {
      var data = [];
      initCats(data)
      localStorage.cats = JSON.stringify(data);
    }
    this.currentCat = 0;
  },
  addCat: function(obj) {
    var data = JSON.parse(localStorage.cats);
    data.push(obj);
    localStorage.cats = JSON.stringify(data);
  },
  getCat: function() {
    var data = JSON.parse(localStorage.cats);
    return data[this.currentCat];
  },
  getAllCats: function() {
    var data = JSON.parse(localStorage.cats);
    return data;
  },
  addClick: function() {
    var data = JSON.parse(localStorage.cats);
    data[this.currentCat].Counter++;
    localStorage.cats = JSON.stringify(data);
    return data[this.currentCat];
  },
  setCurrent: function(value){
    this.currentCat = value;
  },
  saveCat: function(cat){
    var data = JSON.parse(localStorage.cats);
    data[this.currentCat] = cat;
    localStorage.cats = JSON.stringify(data);
  }
};

function initCats(array) {
  array.push(    {      code:0,      name:'Cat_1',      img:'img/1.jpg',      Counter:0,  }  )
  array.push(    {      code:1,      name:'Cat_2',      img:'img/2.jpg',      Counter:0,  }  )
  array.push(    {      code:2,      name:'Cat_3',      img:'img/3.jpg',      Counter:0,  }  )
  array.push(    {      code:3,      name:'Cat_4',      img:'img/4.jpg',      Counter:0,  }  )
  array.push(    {      code:4,      name:'Cat_5',      img:'img/5.jpg',      Counter:0,  }  )
  return array;
}

var octopus = {
  init: function() {
    model.init();
    viewMenu.init();
    viewCat.init();
  },
  addClick: function() {
    var cat = model.addClick();
    viewCat.render(cat);
  },
  setCurrent: function(value) {
    model.setCurrent(value);
    viewCat.show();
  },
  getCurrentCat: function() {
    return model.getCat();
  },
  saveCat: function(cat) {
    model.saveCat(cat);
    viewCat.show();
  },
  getAllCats: function () {
    return model.getAllCats();
  }
};
  
var viewMenu = {
  init:function(){
    var appSelector = document.getElementById('app');
    var menu = document.createElement("div");
    menu.className = "Menu";
    var menuHeader = document.createElement("span");
    menuHeader.className = "menuHeader";
    menuHeader.innerText = "List Of C's";
    menu.appendChild(menuHeader);
    var menuBody = document.createElement("div");
    menuBody.className = "menuBody";
    menuBody.id = "menuBody";
    menu.appendChild(menuBody);
    appSelector.appendChild(menu);
    var admArea = document.createElement("div");
    var admBtn = document.createElement("span");
    admBtn.className = 'AdminBtn';
    admBtn.innerText = 'Admin';
    admBtn.addEventListener('click',()=>{
      this.admShow();
    });

    admArea.appendChild(admBtn);
    var admForm = document.createElement("div");
    admForm.className = "admForm";
    admForm.id = "admForm";
    admForm.innerHTML = "<p>Name</p> <input id='cName'><br> <p>Image</p> <input id='cImg'><br> <p>Counter</p><input id='cCounter'>";

    var admSave = document.createElement("span");
    admSave.className = 'AdminBtn';
    admSave.innerText = 'Save';
    admForm.appendChild(admSave);
    admSave.addEventListener('click',()=>{
      this.admSave();
    });

    var admCancel = document.createElement("span");
    admCancel.className = 'AdminBtn';
    admCancel.innerText = 'Cancel';
    admForm.appendChild(admCancel);
    admCancel.addEventListener('click',()=>{
      this.admCancel();
    });

    admArea.appendChild(admForm);
    menu.appendChild(admArea);
    document.getElementById('admForm').hidden = true;
    this.render();
    
  },
  render: function(){
    var menu = document.getElementById('menuBody');
    var cats = octopus.getAllCats();
    cats.forEach(element => {
      let menuItem = document.createElement("span");
      menuItem.className = "MenuItem";
      menuItem.innerHTML = element.name;
      menuItem.addEventListener('click',(function(curCat){
        return function(){
          var x = document.getElementsByClassName("MenuItemSelected");
          for (let i = 0; i < x.length; i++) {
            x[i].className="MenuItem";
          }
          this.className = "MenuItemSelected";
          octopus.setCurrent(curCat);
        };
      })(element.code));
      menu.appendChild(menuItem);
    });
  },
  admShow: function(){
    document.getElementById('admForm').hidden = false;
    let cat = octopus.getCurrentCat();
    document.getElementById('cName').value = cat.name;
    document.getElementById('cImg').value = cat.img;
    document.getElementById('cCounter').value = cat.Counter;
  },
  admCancel: function(){
    document.getElementById('admForm').hidden = true;
    document.getElementById('cName').value = "";
    document.getElementById('cImg').value = "";
    document.getElementById('cCounter').value = "";
  },
  admSave: function(){
    document.getElementById('admForm').hidden = true;
    let cat = octopus.getCurrentCat();
    cat.name = document.getElementById('cName').value;
    cat.img = document.getElementById('cImg').value;
    cat.Counter = document.getElementById('cCounter').value;
    octopus.saveCat(cat);
  }

};

  

var viewCat = {
  init:function(){
    var appSelector = document.getElementById('app');
    var catBlock = document.createElement("div");
    catBlock.id = "catBlock";
    catBlock.className = "catBlock";
    appSelector.appendChild(catBlock);
    this.render();
  },
  render: function(){
    function renderHeader() {
      var appHeader = document.createElement("div");
      appHeader.className = "catHead";
      appHeader.id = "catHead";
      return appHeader;
    }
      
    function renderMain() {
      var appMain = document.createElement("div");
      appMain.id = "cc_main";
      appMain.className = "catMain";
      appMain.appendChild(renderImg());
      appMain.addEventListener('click', ()=>octopus.addClick()); 
      return appMain;
    }
      
    function renderImg() {
      var imgBlock = document.createElement("img");
      imgBlock.className = "catImg";
      imgBlock.id = "catImg";
      return imgBlock;
    }
      
    function renderCounter(value) {
      var appCounter = document.createElement("div");
      appCounter.className = "catCounter";
      appCounter.id = "catCounter";
      return appCounter;
    }
    var catBlock = document.getElementById('catBlock');
    catBlock.innerHTML = "";
    catBlock.appendChild(renderHeader());
    catBlock.appendChild(renderMain());
    catBlock.appendChild(renderCounter());
    this.show()
  },
  show: function() {
    let cat = octopus.getCurrentCat();
    document.getElementById('catHead').innerText = cat.name;
    document.getElementById('catImg').src = cat.img;
    document.getElementById('catCounter').innerText = "Clicks: "+ cat.Counter;
  }
};

document.addEventListener('DOMContentLoaded', ()=>{octopus.init();}, false);
