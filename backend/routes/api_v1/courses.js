/**
 * Created by abhishekyadav on 25/08/17.
 */
const express = require('express');
const router = express.Router();
const db = require('../../db');



router.post('/new',function (req,res) {
    db.actions.courses.createNew(req.body.name,req.body.desc,function (data) {
        res.send(data);
    })

});


router.get('/',function (req,res) {
    db.actions.courses.getAll(function(data){
        res.send(data);
    })
});


router.get('/:id',function (req,res) {
    db.actions.courses.search(req.params.id,function (data) {
        res.send(data);
    })
});



router.put('/:id',function (req,res) {

    db.actions.courses.edit(req.params.id,req.body.values,function(data){
        res.send(data);
    })
});

router.delete('/:id',function (req,res) {
    db.actions.courses.deleteCourse(req.params.id,function(data){
        if(data>0){
            return res.status(200).send({success: true});
        }
        return res.status(204).send();
    })
});

router.get('/:id/lectures',function (req,res) {
    db.actions.courses.getlectures(req.params.id,data=>res.send(data))
})




module.exports = router;
