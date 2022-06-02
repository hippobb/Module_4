var timeText = document.querySelector("#timer");
var page_detail=document.querySelectorAll(".page");

//var quiz_start=0;
var time=0;
var timer1;
var timer2;
var page=0;
var time2_running=0;
var DataObj = {
  name: "",
  score: "",
};
var high_score = [];

//Load the first page
document.addEventListener('DOMContentLoaded', function() {
  Quiz_page();
}, false);


//Timer for the Quiz
function myTimer(){
    if(time==0){
        clearInterval(timer1);
        page = page_detail.length-2;        
        Quiz_page();
    }
    else {      
        time--;        
        timeText.innerHTML="<h2>Time: "+time;  
    }
}
//Timer for the time switching to new page
function myTimer2(){
  clearInterval(timer2);
  page++;
  time2_running=0;       
  Quiz_page();
  }

 //Start the Quiz timer 
function timer_start(){
  time=75;
  timeText.innerHTML="<h2>Time: "+time;  
  timer1 = setInterval(myTimer ,1000);
}

// Load the Page content
var Quiz_page = function() {
  var match_page=0;
  // find the page conent in Page detail array
  for( var i=0; i<page_detail.length; i++){
     if (page_detail[i].getAttribute("page")==page) {match_page=i;break;}
  }
  //clear the question page content
  if (!!document.getElementById("question_page")) document.getElementById("question_page").remove();

  //clear the result page content
  document.getElementById("result").setAttribute("style" , "border-top: 5px;");
  document.getElementById("result").innerHTML="";

  //Create the content page
  var text_question = document.createElement("div");
  text_question.className = "question_page";
  text_question.id="question_page";

  //Load the content
  var question_h2 = document.createElement("h2");
  question_h2.textContent = page_detail[match_page].getAttribute("content_title");
  question_h2.className = "question title";
  text_question.appendChild(question_h2);

  var question_h3 = document.createElement("p");
  if (page==page_detail.length-2){
    question_h3.textContent = page_detail[match_page].getAttribute("content") + "    " +  time;
  }
  else{
    question_h3.textContent = page_detail[match_page].getAttribute("content");
  }
  question_h3.className = "question content";
  text_question.appendChild(question_h3);

  //Create the button in the content page
  if (page==0) {
    var confirmButton = document.createElement("button");
    confirmButton.textContent = page_detail[match_page].getAttribute("btn_confirm");
    confirmButton.className = "quiz_start";
    text_question.appendChild(confirmButton);
  }
  else if(page_detail[page].hasAttribute("ans_0")){
    var confirmButton = document.createElement("button");
    confirmButton.textContent = page_detail[match_page].getAttribute("ans_0");    
    confirmButton.id = "btn ans_0";
    confirmButton.className = "btn ans_0";
    text_question.appendChild(confirmButton);
    
    var confirmButton = document.createElement("button");
    confirmButton.textContent = page_detail[match_page].getAttribute("ans_1");
    confirmButton.className = "btn ans_1";
    text_question.appendChild(confirmButton);
    
    var confirmButton = document.createElement("button");
    confirmButton.textContent = page_detail[match_page].getAttribute("ans_2");
    confirmButton.className = "btn ans_2";
    text_question.appendChild(confirmButton);

    var confirmButton = document.createElement("button");
    confirmButton.textContent = page_detail[match_page].getAttribute("ans_3");
    confirmButton.className = "btn ans_3";
    text_question.appendChild(confirmButton);
  }
  else if(page==page_detail.length-2){
    clearInterval(timer1);

    timeText.innerHTML="<h2>Time: "+time;    

    var question_h3 = document.createElement("div");
    question_h3.textContent = "Enter initials: ";
    question_h3.className = "question content";
    text_question.appendChild(question_h3);

    var input_text = document.createElement("input");
    input_text.type = "text";
    input_text.className = "input_name";    
    input_text.id = "input_name";
    text_question.appendChild(input_text);

    var confirmButton = document.createElement("button");
    confirmButton.textContent = page_detail[match_page].getAttribute("btn_submit");
    confirmButton.className = "btn_submit";
    text_question.appendChild(confirmButton);  

  }
  else if(page==page_detail.length-1){
    var score_array = JSON.parse(localStorage.getItem("h_score"));
    var listItemEl = document.createElement("ol");
    listItemEl.className="ol score";
    listItemEl.id=listItemEl;
    for (var i = 0; i < score_array.length; i++) {
      var taskInfoEl = document.createElement("li");
      taskInfoEl.className="li score";
      taskInfoEl.innerHTML = score_array[i].name + "    -    " + score_array[i].score;
      listItemEl.appendChild(taskInfoEl);
    }

    text_question.appendChild(listItemEl);
    
    var confirmButton = document.createElement("button");
    confirmButton.textContent = page_detail[match_page].getAttribute("btn_back");
    confirmButton.className = "btn_back";
    text_question.appendChild(confirmButton);

    var confirmButton = document.createElement("button");
    confirmButton.textContent = page_detail[match_page].getAttribute("btn_clear");
    confirmButton.className = "btn_clear";
    text_question.appendChild(confirmButton);
  } 
  document.getElementById("question").appendChild(text_question);
}


//check answer
var check_answer= function(ans){

  if (time2_running==0){
    var match_page=0;
  for( var i=0; i<page_detail.length; i++){
     if (page_detail[i].getAttribute("page")==page) {match_page=i;break;}
     
  }
  if (page_detail[match_page].getAttribute("answer")==ans){
    document.getElementById("result").innerHTML="<h2> Correct! </h2>"; 
    document.getElementById("result").setAttribute("style" , "border-top: 5px;");    
  }
  else{
    document.getElementById("result").innerHTML="<h2> Wrong! </h2>";
  document.getElementById("result").setAttribute("style" , "border-top: 5px solid green;");
  if (time<=10) time = 0; else time=time-10;

  }
  //start the timer for the result display
  timer2 = setInterval(myTimer2 ,500);
  
  time2_running=1;
}
}

//Sort the score

var bubble_sort = function (){
  var score_array = JSON.parse(localStorage.getItem("h_score"));
  var tmp_score;
  var tmp_name;
  if(score_array.length>=1){
    for (var i = 0; i < score_array.length; i++) {
      for (var j = 0; j < score_array.length-1; j++) {
          if (parseInt(score_array[j].score) < parseInt(score_array[j + 1].score)) {
              tmp_score = score_array[j].score;
              tmp_name = score_array[j].name;
              score_array[j].score = score_array[j + 1].score;
              score_array[j].name = score_array[j + 1].name;
              score_array[j + 1].score = tmp_score;            
              score_array[j + 1].name = tmp_name;
          }
      }
    }
    localStorage.removeItem("h_score");
    localStorage.setItem("h_score", JSON.stringify(score_array));
  } 
}

//button action
  var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;
    var ans=0;
    if (targetEl.matches(".quiz_start")) {
      timer_start();
      page++;
      Quiz_page();
    } else if (targetEl.matches(".btn")) {
      if (targetEl.matches(".ans_0")) ans="0"
      if (targetEl.matches(".ans_1")) ans="1"
      if (targetEl.matches(".ans_2")) ans="2"
      if (targetEl.matches(".ans_3")) ans="3";
      check_answer(ans);
    }else if (targetEl.matches(".btn_submit")){      
      if (document.getElementById("input_name").value==""){
        if (!(!!document.getElementById("result alert"))) 
        {
          var result_h3 = document.createElement("p");
          result_h3.id="result alert";
          result_h3.className="result alert";
          result_h3.innerHTML="Please type your name in the box!";
          result_h3.setAttribute("style" , " color: red;");
          document.getElementById("result").appendChild(result_h3);
        }
      }
      else{
        DataObj = {name: document.getElementById("input_name").value, score: time};    
        high_score.push(DataObj);
        localStorage.setItem("h_score", JSON.stringify(high_score));
        bubble_sort();
        page++;
        Quiz_page();
    }
  }
      else if (targetEl.matches(".btn_back")){
      document.getElementById("question_page").remove(); 
      page=0;
      Quiz_page();
    }
    else if (targetEl.matches(".btn_clear")){
      high_score=[];
      //document.getElementById(".listItemEl").remove();
      localStorage.setItem("h_score", JSON.stringify(high_score));
      Quiz_page();
    }
  };

  //view High Score
  var V_H_S = function(){
    clearInterval(timer1);
    time=0;    
    timeText.innerHTML="<h2>Time: "+time;
    page=page_detail.length-1;
    Quiz_page();
  }

  // change the color button when the mouse over
  var taskButtonHandler2 = function(event) {
    // get target element from event
      var targetEl = event.target;
      if (targetEl.matches("a")) document.querySelector("a").setAttribute("style" , "color: var(--darkpurple);");
      if (targetEl.matches(".ans_0")) document.querySelector(".ans_0").setAttribute("style" , " background-color: var(--darkpurple);");
      if (targetEl.matches(".ans_1")) document.querySelector(".ans_1").setAttribute("style" , " background-color: var(--darkpurple);");
      if (targetEl.matches(".ans_2")) document.querySelector(".ans_2").setAttribute("style" , " background-color: var(--darkpurple);");
      if (targetEl.matches(".ans_3")) document.querySelector(".ans_3").setAttribute("style" , " background-color: var(--darkpurple);");
      if (targetEl.matches(".btn_back")) document.querySelector(".btn_back").setAttribute("style" , " background-color: var(--darkpurple);");
      if (targetEl.matches(".btn_clear")) document.querySelector(".btn_clear").setAttribute("style" , " background-color: var(--darkpurple);");
      if (targetEl.matches(".btn_submit")) document.querySelector(".btn_submit").setAttribute("style" , " background-color: var(--darkpurple);");
      if (targetEl.matches(".quiz_start")) document.querySelector(".quiz_start").setAttribute("style" , " background-color: var(--darkpurple);");
 
  }; 
  // Resume the color button when the mouse out
   var taskButtonHandler3 = function(event) {
    // get target element from event
      var targetEl = event.target;
      if (targetEl.matches("a")) document.querySelector("a").setAttribute("style" , "color: purple;");
      if (targetEl.matches(".ans_0")) document.querySelector(".ans_0").setAttribute("style" , " background-color: purple;");
      if (targetEl.matches(".ans_1")) document.querySelector(".ans_1").setAttribute("style" , " background-color: purple;");
      if (targetEl.matches(".ans_2")) document.querySelector(".ans_2").setAttribute("style" , " background-color: purple;");
      if (targetEl.matches(".ans_3")) document.querySelector(".ans_3").setAttribute("style" , " background-color: purple;");
      if (targetEl.matches(".btn_back")) document.querySelector(".btn_back").setAttribute("style" , " background-color: purple;");
      if (targetEl.matches(".btn_clear")) document.querySelector(".btn_clear").setAttribute("style" , " background-color: purple;");
      if (targetEl.matches(".btn_submit")) document.querySelector(".btn_submit").setAttribute("style" , " background-color: purple;");
      if (targetEl.matches(".quiz_start")) document.querySelector(".quiz_start").setAttribute("style" , " background-color: purple;");
  };

// Add event listener to generate button
//generateBtn.addEventListener("click", first_page);
document.querySelector("#question").addEventListener("click", taskButtonHandler);
document.querySelector("#question").addEventListener("mouseover", taskButtonHandler2);
document.querySelector("#question").addEventListener("mouseout", taskButtonHandler3);
document.querySelector("a").addEventListener("mouseover", taskButtonHandler2);
document.querySelector("a").addEventListener("mouseout", taskButtonHandler3);




