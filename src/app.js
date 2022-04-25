const express = require('express');
const app = express();
const listReservation = [
    {
        resourceID : 1,
        start_time: '2018-05-12T14:30:00.000Z',
        end_time:'2018-05-12T17:45:00.000Z'
    }

]
const openSchedule = [
    {
        days: "Monday",
        timeStart: "08:00",
        timeEnd: "17:00"
    },
    {
        days: "Tuesday",
        timeStart: "08:00",
        timeEnd: "17:00"
    },
]
// Running 
app.get('/available',(req,res) =>{

 res.send({
 })
 console.log("Get querry is called");
})

app.post('book',(req,res)=>{
    const reservation  = req.body;
    if checkOpen(reservation.date,reservation.start_time, reservation.end_time)== false{
        res.send({
            available: 'false'
        })
    }
    if (checkResourceAvailable(reservation.resourceID)===false){
        res.send({
            available: 'false'
        })
    }
    if(checkSlotAvalable(reservation.date,reservation.start_time, reservation.end_time)===false){
        res.send({
            available: 'false'
        })
    }
    else{
        listReservation.push(req.body);
        res.send({
            available: 'true'
        })
    }
    
})
app.listen(8080, ()=>{
    console.log("Server is running")
})
function checkOpen(date,start_time, end_time){
    const isFound = openSchedule.some(element => {
        if (element.days === date) {
          if((element.end_time<element.end_time) ||element.start_time>start_time)){
              return true
          }
        }
        return false
      });
}
function checkSlotAvalable(date,start_time, end_time){
    var duration = end_time - start_time;
    var check =true;
    listReservation.forEach((element)=>{
        var diff = element.end_time -element.start_time;
        if (start_time >element.end_time) &&(end_time< element.end_time){
            check = false;
        }
        if(isBetween(start_time,element.start_time,element.end_time)||isBetween(end_time,element.start_time,element.end_time)){
            check = false;
        }
    })
    return check;
}
function checkResourceAvailable(id_source){
    return (id_source ==1337 ? true : false)
}