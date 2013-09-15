function loaded(){
    console.log('onload running');
    $.get('/api/all', function(data){
            var MachineListDiv = document.getElementById('MachineList');
            if (data.success == true) {
                for (rm in data.rooms) {
                    var listContainer = $('<div id="Room' + rm + '">' + rm + '</div>').appendTo('#MachineList');
                    var list = $('<ul/>').appendTo(listContainer);
                    var mchns = data.rooms[rm].machines;
                    var keys = Object.keys(mchns);

                    keys.sort();
                    var len = keys.length;
                    for (var i = 0; i < len; i++) {
                        var k = keys[i];
                        var className = '';

                        var item = $('<li>' + k + ': ' + mchns[k] + '</li>').appendTo(list);

                        if (mchns[k] == 'INUSE') {
                            className = 'InUse';
                        } else if (mchns[k] == 'AVAILABLE'){
                            className = 'Available';
                        } else if (mchns[k] == 'ERROR') {
                            className = 'Error';
                        }
                        item.addClass(className);
                    }

                }
            } else {
                MachineListDiv.innerText = "Error Loading";
            }

        }
    )}

$(document).ready(loaded)