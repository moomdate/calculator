 var temp=0;
 var tung;
 var lung;
 opera;
 function myNum(data){
 	if(temp==0)
 		temp=data;
 	else
 		temp=(temp)+data;

 	document.getElementById("led").innerHTML=temp;
 	//console.log(temp);
 }
 function myOpera(data){
 	if(data!='='){
 		opera=data;
		document.getElementById("opera").innerHTML=opera; //operator
		tung = temp;
		temp = 0;
	}else{
		lung = temp;
		temp = 0;
		if(opera=='+'){
			result = (parseInt(tung)+parseInt(lung));
		}else if(opera=='-'){
			result = (parseInt(tung)-parseInt(lung));
		}else if(opera=='*'){
			result = (parseInt(tung)*parseInt(lung));
		}else if(opera=='/'){
			result = (parseInt(tung)/parseInt(lung));
		}
		opera = null;
		clearOpe();
		clearLcd();
		document.getElementById("led").innerHTML=result;
	}
}
function clearAll(){
	clearLcd();
	clearOpe();
	temp=0;
	 tung=0;
	 lung=0;
	 opera=null;
}
function clearLcd(){
	document.getElementById("led").innerHTML="";
}
function clearOpe(){
	document.getElementById("opera").innerHTML=""; 
}