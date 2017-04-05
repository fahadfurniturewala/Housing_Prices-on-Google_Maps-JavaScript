// Put your zillow.com API key here
var zwsid = "X1-ZWz1f627hmabyj_94p25";
var googleapi = "AIzaSyAyGm_LeJtbKoEUfu24GtoNr_VnR4T58FU";

var request = new XMLHttpRequest();
var request2=new XMLHttpRequest();
  var convert;
  var map1;
  var addwindow;
  var mark;
  var value;
  var coor;
  var finaladdress;
  var coor2;


  function initialize() {
	  convert=new google.maps.Geocoder();
		addwindow= new google.maps.InfoWindow;
		mark= new google.maps.Marker();
		map1 = new google.maps.Map(document.getElementById('map'),
			{
				center: {lat: 32.75, lng: -97.13},
				zoom: 17
			});
		google.maps.event.addListener(map1,"click",function(r)
			{	
			coor=r.latLng;		
				reverse();
				
			});
}

function sendRequest () {
    request.onreadystatechange = displayResult;
    var address = document.getElementById("addressline").value;
	var addr=address.split(',');
	var address1=addr[0];
	var rest=addr[1];
   var uri="proxy.php?zws-id="+zwsid+"&address="+address1+"&citystatezip="+rest;
		  var res=encodeURI(uri);
		  request.open("GET",res,true);
    request.withCredentials = "true";
    request.send(null);
	geo();
}

function geo() {
    var address = document.getElementById("addressline").value;
    convert.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		  finaladdress=results[0].formatted_address;
		  coor2=results[0].geometry.location;
		  
		  
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }


 
  function reverse() {
    
    
    convert.geocode({'location': coor}, function(results, status) { {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
			finaladdress=results[0].formatted_address;
			
		  console.log(results);
		
		 var addressst = results[0].address_components[0].long_name;
		var addressnm = results[0].address_components[1].long_name;
		var city = results[0].address_components[3].long_name;
		var state = results[0].address_components[5].long_name;
		var zipcode = results[0].address_components[7].long_name;
		  request2.onreadystatechange=displayResult2;
		  var uri="proxy.php?zws-id="+zwsid+"&address="+addressst+"+"+addressnm+"&citystatezip="+city+"+"+state+"+"+zipcode;
				   
		  var res=encodeURI(uri);
		  request2.open("GET",res,true);
          request2.withCredentials = "true";
          request2.send(null);
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
	}
    });
  
  }






function displayResult () {
    if (request.readyState == 4) {
        var xml = request.responseXML.documentElement;
        var value = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
		var display1=document.createTextNode(finaladdress+":$"+value);
		var br=document.createElement("BR");
		document.getElementById("output").appendChild(br);
		document.getElementById("output").appendChild(display1);
		
		mark.setMap(null);
        map1.setCenter(coor2);
        mark = new google.maps.Marker({
            map: map1,
            position: coor2,
			
        });
		addwindow.setContent(finaladdress+":$"+value);
		addwindow.open(map1,mark);
    }
	}
function displayResult2(){
	if (request2.readyState == 4) {
		var xml2 = request2.responseXML.documentElement;
		if(xml2.getElementsByTagName("response")[0])
		{
        
        var value2 = xml2.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
	    
		var display2=document.createTextNode(finaladdress+":$"+value2);
		var br2=document.createElement("BR");
		document.getElementById("output").appendChild(br2);
		document.getElementById("output").appendChild(display2);
		mark.setMap(null);
          
          mark = new google.maps.Marker({
              position: coor,
              map: map1,
			 
          });
		  addwindow.setContent(finaladdress+":$"+value2);
		addwindow.open(map1,mark);
		}
    }
}

