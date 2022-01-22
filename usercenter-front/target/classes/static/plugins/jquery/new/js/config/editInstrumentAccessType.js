function check(){
    //判断是否完整填写
    var accessIsTrainingYes=document.getElementById("accessIsTrainingYes").checked;
    var accessIsTrainingNo=document.getElementById("accessIsTrainingNo").checked;
    var accessIsExamYes=document.getElementById("accessIsExamYes").checked;
    var accessIsExamNo=document.getElementById("accessIsExamNo").checked;
    var accessIsSapYes=document.getElementById("accessIsSapYes").checked;
    var accessIsSapNo=document.getElementById("accessIsSapNo").checked;
    var canSave=true;
    if(!accessIsTrainingYes && !accessIsTrainingNo){
        canSave=false;
    }
    if(!accessIsExamYes && !accessIsExamNo){
        canSave=false;
    }
    if(!accessIsSapYes && !accessIsSapNo){
        canSave=false;
    }
    if(!canSave){
        alert("请填写完整！");
    }
    return canSave;
    // return false;
}