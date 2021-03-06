/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();
const db = require('../../db');



router.post('/new',function (req,res) {

    req.body.date = new Date(req.body.date)
    req.body.startTime = new Date(req.body.startTime)
    req.body.endTime = new Date(req.body.endTime)
    db.actions.lectures.createNew(req.body.name,req.body.date,req.body.startTime,req.body.endTime,req.body.topic,req.body.batchId,
        req.body.roomId,function (data) {
        res.send(data);
    })

});


router.get('/',function (req,res) {
    db.actions.lectures.getAll(function(data){
        res.send(data);
    })
});

router.put('/',function (req, res) {
    (function(callback) {
        (req.body.lectures).forEach(function (x) {
            db.actions.lectures.edit(x.id,x,()=>{})
        })
        callback();
    })(data=>res.send({
        "success" : true
    }))
})


router.get('/:id',function (req,res) {
    db.actions.lectures.search(req.params.id,function (data) {
        res.send(data);
    })
});



router.put('/:id',function (req,res) {
    db.actions.lectures.edit(req.params.id,req.body.values,function(data){
        res.send(data);
    })
});

router.delete('/:id',function (req,res) {
    db.actions.lectures.deleteLecture(req.params.id,function(data){
        if(data>0){
            return res.status(200).send({success: true});
        }
        return res.status(204).send();
    })
});



module.exports = router;
