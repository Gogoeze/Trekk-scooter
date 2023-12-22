const endpoint = 'https://api.thingspeak.com/channels/2331405/feeds.json?api_key=4107UDD5DG3998RA&';

    const mockEndpoint = 'https://my-json-server.typicode.com/Gogoeze/demo/db';

    fetch(mockEndpoint)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        // FUNCTION TO GET LAST FEED OF SPECIFIC IDS VARIABLES
        function getLastFeed(entry_id) {
          const matchingObjects = jsonData.feeds.filter(item => item.field1 === entry_id);
          if (matchingObjects.length > 0) {
            let actualMatchingObject = matchingObjects[matchingObjects.length - 1];

            for (var gogo = matchingObjects.length - 1; gogo >= 0; gogo--) {
              if (Number(matchingObjects[gogo].field3) !== 0 && Number(matchingObjects[gogo].field2) !== 0) {
                actualMatchingObject = matchingObjects[gogo];
                break;
              }
            }

            return actualMatchingObject;
          }
          return null;
        }

        const lastFeed1 = getLastFeed("1");
        const lastFeed2 = getLastFeed("2");
        const lastFeed3 = getLastFeed("3");

        // ARRAY OF LAST FEEDS
        // const lastFeedArray = [lastFeed1, lastFeed2, lastFeed3];
        // console.log(lastFeedArray);

        //ID1,2,3.
        // let ID1 = Number(lastFeed1.field1);
        // let ID2 = Number(lastFeed2.field1);
        // let ID3 = Number(lastFeed3.field1);

        //node batterry1,2,3.
        // let nodeBattery1 = Number(lastFeed1.field4);
        let nodeBattery1 = lastFeed1 !== null ? Number(lastFeed1.field4) : "N/A";
        let nodeBattery2 = lastFeed2 !== null ? Number(lastFeed2.field4) : "N/A";
        let nodeBattery3 = lastFeed3 !== null ? Number(lastFeed3.field4) : "N/A";


        // gateway-battery
        let gatewayBattery = lastFeed3 !== null ? Number(lastFeed3.field5) : "N/A";
        let count = lastFeed3 !== null ? Number(lastFeed3.field6) : "N/A";;

        //long&lat node1
        // let long1 = Number(lastFeed1.field2);
        // let lat1 = Number(lastFeed1.field3);

        var entryList = [];

        if (lastFeed1 !== null && Number(lastFeed1.field3) !== 0 && Number(lastFeed1.field2) !== 0) {
          entryList.push([Number(lastFeed1.field3), Number(lastFeed1.field2), 'Node 1']);
        }

        console.log(JSON.stringify(lastFeed1));

        if (lastFeed2 !== null && Number(lastFeed2.field3) !== 0 && Number(lastFeed2.field2) !== 0) {
          entryList.push([Number(lastFeed2.field3), Number(lastFeed2.field2), 'Node 2']);
        }

        console.log(JSON.stringify(lastFeed2));

        if (lastFeed3 !== null && Number(lastFeed3.field3) !== 0 && Number(lastFeed3.field2) !== 0) {
          entryList.push([Number(lastFeed3.field3), Number(lastFeed3.field2), 'Node 3']);
        }

        console.log(JSON.stringify(lastFeed3));

        if (entryList.length === 0) {
          entryList.push([8.9302894, 7.3192647, 'Node 1']);
        }

        console.log(JSON.stringify(entryList));

        //  document.getElementById("id1").innerHTML = ID1;
        //   document.getElementById("id2").innerHTML = ID2;
        //   document.getElementById("id3").innerHTML = ID3;
        document.getElementById("node-battery1").innerHTML = nodeBattery1;
        document.getElementById("node-battery2").innerHTML = nodeBattery2;
        document.getElementById("node-battery3").innerHTML = nodeBattery3;
        document.getElementById("gateway-battery").innerHTML = gatewayBattery;
        document.getElementById("longitude1").innerHTML = lastFeed1 !== null ? Number(lastFeed1.field2) : "N/A";
        document.getElementById("latitude1").innerHTML = lastFeed1 !== null ? Number(lastFeed1.field3) : "N/A";
        document.getElementById("longitude2").innerHTML = lastFeed2 !== null ? Number(lastFeed2.field2) : "N/A";;
        document.getElementById("latitude2").innerHTML = lastFeed2 !== null ? Number(lastFeed2.field3) : "N/A";;
        document.getElementById("longitude3").innerHTML = lastFeed3 !== null ? Number(lastFeed3.field2) : "N/A";
        document.getElementById("latitude3").innerHTML = lastFeed3 !== null ? Number(lastFeed3.field3) : "N/A";
        document.getElementById("count").innerHTML = count;

        // THE MAP
        google.charts.load("current", {
          "packages": ["map"],
          "mapsApiKey": "AIzaSyCjYhtM2Uchr6m8BuU5hBFlTteFeZrHUWA"
        });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
          console.log(JSON.stringify(entryList[0]));
          var data = google.visualization.arrayToDataTable([
            ['Lat', 'Long', 'Name'],
            ...entryList
          ]);
          var options = {
            icons: {
              default: {
                normal: 'https://trek-scooter-bucket.s3.eu-north-1.amazonaws.com/Group+41.png',
                selected: 'https://trek-scooter-bucket.s3.eu-north-1.amazonaws.com/Group+41.png'
              }
            }
          };
          var map = new google.visualization.Map(document.getElementById('map_markers_div'));
          map.draw(data, options);
        }
      })