
                 function scan()
                             {
                             cordova.plugins.barcodeScanner.scan(
                                 function (result) {
                                     if(!result.cancelled)
                                     {

                                             navigator.notification.prompt("Введите название ", function(input) {
                                                 var name = input.input1;
                                                 var value = result.text;


                                                 var data = localStorage.getItem("LocalData");
                                                 console.log(data);
                                                 data = JSON.parse(data);
                                                 data[data.length] = [name, value, GetTodayDate()];

                                                 localStorage.setItem("LocalData", JSON.stringify(data));


                                                 location.reload()

                                                 alert("Скан добавлен");

                                             });







                                     }

                                 },
                                 function (error) {
                                     alert("Ошибка сканирования: " + error);
                                 }
                            );
                         }



                         $(document).on("pagebeforeshow", "#display", function() {
                             $("table#allTable tbody").empty();

                             window.data = localStorage.getItem("LocalData");
                             console.log(data);
                             data = JSON.parse(data);

                             var html = "";

                             for(var count = 0; count < data.length; count++)
                             {
                                 html = html + "<tr><td><a  href='javascript:ShowCard("+count+")'>" + data[count][0] + "</a></td><td>"+ data[count][2] +"</td>   <td><a  href='javascript:Delete("+count+")'><button>Удалить</button></a></td>  </tr>";
                             }

                             $("table#allTable tbody").append(html).closest("table#allTable").table("refresh").trigger("create");

                         });



                         function GetTodayDate() {
                             var tdate = new Date();
                             var dd = tdate.getDate(); //yields day
                             var MM = tdate.getMonth(); //yields month
                             var yyyy = tdate.getFullYear(); //yields year
                             var currentDate= dd + "-" +( MM+1) + "-" + yyyy;

                             return currentDate;
                          }

                         function Delete(count) {
                             data.splice(count, 1);
                             localStorage.clear();
                             localStorage.setItem("LocalData", JSON.stringify(data));
                             location.reload()
                         }
                         function ShowCard(count){
                         alert("Название: "+data[count][0]+"\n"+
                               "Значение: "+data[count][1]+"\n"+
                               "Дата: "+data[count][2]);

                         }



                         var sswitch=1;
                         function sswitcher(){


                                 if ( sswitch % 2 == 0 ){
                                     sortirovatSbol();
                                     sswitch++;
                                 }

                                 else { sortirovatSmen();
                                        sswitch++;
                                 }



                         }



                         function SortingAsc() {
                                 for (var i = 0, endI = data.length - 1; i < endI; i++) {
                                     for (var j = 0, endJ = endI - i; j < endJ; j++) {
                                          if (data[j][2] > data[j + 1][2]) {
                                          var swap = data[j];
                                          data[j] = data[j + 1];
                                          data[j + 1] = swap;
                                          }
                                     }
                                 }

                          localStorage.clear();
                          localStorage.setItem("LocalData", JSON.stringify(data));
                          location.reload()
                         }
                         function SortingDesc() {
                                 for (var i = 0, endI = data.length - 1; i < endI; i++) {
                                     for (var j = 0, endJ = endI - i; j < endJ; j++) {
                                          if (data[j][2] < data[j + 1][2]) {
                                          var swap = data[j];
                                          data[j] = data[j + 1];
                                          data[j + 1] = swap;
                                          }
                                     }
                                 }
                          localStorage.clear();
                          localStorage.setItem("LocalData", JSON.stringify(data));
                          location.reload()
                         }

                         function openURL(url)
                         {
                             window.open(url, '_blank', 'location=yes');
                         }

                         //initialize
                         if(localStorage.getItem("LocalData") == null)
                         {
                             var data = [];
                             data = JSON.stringify(data);
                             localStorage.setItem("LocalData", data);
                         }

