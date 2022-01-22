/* 
* @Author: Marte
* @Date:   2016-12-02 10:16:43
* @Last Modified by:   Marte
* @Last Modified time: 2017-05-03 15:02:43
*/

function iStyle_TimeTable(start_time,end_time,interval){
    this.start_time = start_time;
    this.end_time = end_time;
    this.interval = interval;
    this.initialize();  
}
iStyle_TimeTable.prototype = {
    initialize:function(){
        var shour = this.start_time.getHours()+0;
        var sminute = this.start_time.getMinutes()+0;
        var ehour = this.end_time.getHours()+0;
        var eminute = this.end_time.getMinutes()+0;
        var interval = this.interval;
        var orderTable = document.getElementById("orderTable");
        var table = document.createElement('table');
		table.setAttribute("id","myTable"); 
        var trNum = (ehour*60+eminute-shour*60-sminute)/interval;
        var $tr = null;
        var input = null;
        var label = null;
        var tagi = null;
		var nTM = 0;
        for(var i = 0;i<trNum;i++){
            $tr = document.createElement('tr');
            if(i==0){
                var tempHour = shour;
                var tempMinute = sminute;
            }
			if(typeof(tempMinute)=="string"){
				nTM = parseInt(tempMinute);
			}
			else{
				nTM = tempMinute;
			}
			if(typeof(tempHour)=="string"){
				nTH = parseInt(tempHour);
			}
			else{
				nTH = tempHour;
			}
            var ss = nTH*60 + nTM +interval;
            var fHour = parseInt(ss/60);
            var fMinute = ss%60;
            var timetd = document.createElement('td');
			if(tempMinute<10 && typeof(tempMinute)=="number"){
				tempMinute =0+ String(tempMinute);
			}
			if(fMinute<10 && typeof(fMinute)=="number"){
				fMinute = 0+String(fMinute);
			}
			if(tempHour<10 && typeof(tempHour)=="number"){
				tempHour =0+ String(tempHour);
			}
			if(fHour<10 && typeof(fHour)=="number"){
				fHour = 0+String(fHour);
			}
            timetd.className='w107';
            timetd.innerHTML=tempHour+':'+tempMinute+'-'+fHour+":"+fMinute;
            tempHour = fHour;
            tempMinute = fMinute;
            $tr.append(timetd);
            for(var j = 0;j<7;j++){
                var $td = document.createElement('td');
                input = $(document.createElement('input'));
                input.attr({
                  'type': 'checkbox',
                  'id': i.toString()+j.toString()
                });
                input.change(function() {                    
                    if($(this).prop("checked")){
                        $(this).next('label').find('i').removeClass('fa-square').addClass('fa-check-square');
                    }
                    else{
                        $(this).next('label').find('i').removeClass('fa-check-square').addClass('fa-square');
                    }
                });
                $td.append(input[0]);
                label = $(document.createElement('label'));
                label.attr('for', i.toString()+j.toString());
                tagi = $(document.createElement('i'));
                tagi.addClass('fa fa-square cb');
                label.append(tagi[0]);
                $td.append(label[0]);
                $tr.append($td);
            }
            table.append($tr);
        }
        orderTable.append(table);

    },
	
	load:function(data,start,curruser){
		start  = start || new Date();
		var fday = start.getDate();
		var fmonth = start.getMonth();
		var shour = this.start_time.getHours()+0;
        var sminute = this.start_time.getMinutes()+0;
        var ehour = this.end_time.getHours()+0;
        var eminute = this.end_time.getMinutes()+0;
		/*if(this.getCountDays(date)==31){
			var end_i = 31-day;	
		}
		else{
			var end_i = 30-day;
		}*/
		//var start_i = day - 1;
		console.log(typeof(data));
		for(var i = 0; i<data.length;i++){
			var dateStr = data[i].date;
			var date = new Date(Date.parse(dateStr))
			var dday = date.getDate();
			/*if(end_i <3){
				
			}*/
			var interval_i = dday - fday;
			var start_time = data[i].startTime;
			var end_time = data[i].endTime;
			var user = data[i].user;
			var interval = this.interval;
			var trNum = (ehour*60+eminute-shour*60-sminute)/interval;
			var rowArr = this.getRow(trNum,start_time,end_time);
			if(interval_i>=0 && interval_i<=7){
			if(user == curruser){
				for(var j = 0;j<=rowArr[1]-rowArr[0];j++){
					var x=document.getElementById('myTable').rows[rowArr[0]+j].cells;
					x[interval_i+1].getElementsByTagName('i')[0].className += ' igreen';
					x[interval_i+1].getElementsByTagName('input')[0].disabled=true;
				}
			}
			else{
				for(var j = 0;j<=rowArr[1]-rowArr[0];j++){
					var x=document.getElementById('myTable').rows[rowArr[0]+j].cells;
					x[interval_i+1].getElementsByTagName('i')[0].className += ' ipink';
					x[interval_i+1].getElementsByTagName('input')[0].disabled=true;
				}
			}
			}
			
		}
		
	},
	getRow:function(trNum,startTime,endTime){
		var rowArr = new Array();
		var tempHour = null;
		var tempMinute = null;
		var shour = this.start_time.getHours()+0;
		var sminute = this.start_time.getMinutes()+0;
		var interval = this.interval;
		var Start = startTime.split(":");
		var End = endTime.split(":");
		for(var i = 0;i<trNum;i++){
			if(i==0){
                tempHour = shour;
                tempMinute = sminute;
            }
            var ss = tempHour*60 + tempMinute +interval;
            var fHour = parseInt(ss/60);
            var fMinute = ss%60;
			
			if(tempHour == Start[0] && tempMinute == Start[1]){
				rowArr[0] = i;
			}
			if(fHour == End[0] && fMinute == End[1]){
				rowArr[1] = i;
			}
			tempHour = fHour;
            tempMinute = fMinute;
		}
		return rowArr;
	},
	getCountDays:function(date) {
          
          /* 获取当前月份 */
        var curMonth = date.getMonth();
         /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        date.setMonth(curMonth + 1);
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        date.setDate(0);
        /* 返回当月的天数 */
		return date.getDate();
 }
	
}   