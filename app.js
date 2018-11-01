var layers;
var array = ["crime","sex","literacy"];
			function highlightFeature(e){
				var layer = e.target;
				layer.setStyle(
					{
						weight : 5,
						color : 'black',
						fillColor : 'yellow',
						fillOpacity : 0.2
					}
				);
				if(!L.Browser.ie && !L.Browser.opera){
					layer.bringToFront();
				}
				var chk = e.latlng.toString();
				var pattern = /\d{2}.\d{4,}/;
				var res = chk.split(",");
				var la = pattern.exec(res[0])[0];
				var lo = pattern.exec(res[1])[0];
				$.getJSON('https://nominatim.openstreetmap.org/reverse', {
    				lat: la,
    				lon: lo,
    				format: 'json',
				}, function (result) {
						var t = result.address.state;	
						var html = '<b>'+t+'</b><div><p id="crime"></p><p id="sex"></p><p id="lit"></p></div>'
						layer.bindPopup(
						html,
							{minWidth : 256}
			
			);

				});
			}
			function resetHighlight(e){
				layers.resetStyle(e.target);
			}
	function zoomToFeature(e){
				var layer = e.target;
				layer.setStyle(
					{
						weight : 5,
						color : 'black',
						fillColor : 'yellow',
						fillOpacity : 0.2
					}
				);
				var la  = e.latlng.lat;
				var lo  = e.latlng.lng;
				$.getJSON('https://nominatim.openstreetmap.org/reverse', {
    				lat: la,
    				lon: lo,
    				format: 'json',
				}, function (result) {

						var t = result.address.state;	
					//console.log(t);
						//var html = '<b>'+t+'</b><div><p id="crime">Crime rate: 53</p></div>'

					//getCol(t);
					if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var tex= this.responseText;
                console.log(tex);
                document.getElementById('crime').innerHTML="Crime Rate: "+tex;
        	}
        };
        xmlhttp.open("GET","crime.php?q="+t,true);
        xmlhttp.send();	
//starting ajax for second one

if (window.XMLHttpRequest) {
            xmlhtt = new XMLHttpRequest();
        } else {
            xmlhtt = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhtt.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var tex= this.responseText;
                //console.log(tex);
                document.getElementById('sex').innerHTML="female per 100 males:  "+tex;
        	}
        };
        xmlhtt.open("GET","sex.php?q="+t,true);
        xmlhtt.send();
//starting ajax for third one
if (window.XMLHttpRequest) {
            xmlht = new XMLHttpRequest();
        } else {
            xmlht = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlht.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var tex= this.responseText;
                //console.log(tex);
                document.getElementById('lit').innerHTML=tex;
        	}
        };
        xmlht.open("GET","literacy.php?q="+t,true);
        xmlht.send();
    });

}
				
		
	function getCol(name)
	{
			
}
		function getStateColor(name){
		getCol(name);
			

			return 'green';
		}
		function stateStyle(feature)
		{
			//console.log(feature);
			return{
				fillColor:getStateColor(feature.properties.NAME_1),
				weight:2,
				opacity:1,
				color:'white',
				dashArray:3,
				fillOpacity:0.7
			}
		}
		function countriesOnEachFeature(feature, layer){
				layer.on(
					{
						mouseover : highlightFeature,
						mouseout : resetHighlight,
						click : zoomToFeature
					}
				);
			}
var map = L.map('map').setView([28.535517,77.391029],5);
	function setMap(){
		
		layers=L.geoJson(
			data,
			{
				style:stateStyle,
				onEachFeature : countriesOnEachFeature
			}
			).addTo(map);
	}
		
			setMap();
			document.getElementsByClassName( 'leaflet-control-attribution' )[0].style.display = 'none';