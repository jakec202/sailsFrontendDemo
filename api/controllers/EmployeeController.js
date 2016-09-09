/**
 * EmployeeController
 *
 * @description :: Server-side logic for managing employees
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Client = require('node-rest-client').Client;
var client = new Client();
var endpoint = "http://localhost:1337/users"

module.exports = {

  /**
   * `EmployeeController.create()`
   */
  create: function (req, res) {
        
        if(req.method != "POST"){
          return res.view('create');
        }

        var args = {
            data: req.body,
            headers: { "Content-Type": "application/json" }
        };
         
        client.post(endpoint, args, function (data, response) {
            // return res.view('create', {success: { message: "Record added successfully"}});
            if(response.statusCode != "201"){
                return res.view('create', {error:{message: response.statusMessage + ": " + data.reason}});
            }

            return res.view('create', {success:{message: "Record created successfully"}});

        })
 
  },


  /**
   * `EmployeeController.read()`
   */
  read: function (req, res) {

    client.get(endpoint, function (data, response) {
        return res.view('read', {users: data});
    }).on('error', function (err) {
        return res.view('read', {error: { message: "There was an error getting the employees"}});
    });

  },


  /**
   * `EmployeeController.update()`
   */
  update: function (req, res) {
      if(req.method != "POST"){ 
        client.get(endpoint, function (data, response) {
        return res.view('update', {users: data});
    }).on('error', function (err) {
        return res.view('update', {error: { message: "There was an error getting the employees"}});
    });
    }else{
    
    var args = {
      data: req.body,
      header: {"Content-Type": "application/json"}
    };
    client.post(endpoint + "/" + req.body.id, args, function (data, response){
      if(response.statusCode != "200"){
        return res.view('update', {error:{message: response.statusMessage + ": " + data.response}});
    }
    return res.redirect('back');
    return res.view('update', {success:{message: "Record updated successfully"}});
   })
  }
    }, 
  


  /**
   * `EmployeeController.delete()`
   */
  delete: function (req, res) {
    if(req.method != "POST"){
           client.get(endpoint, function (data, response) {
        return res.view('delete', {users: data});
    }).on('error', function (err) {
        return res.view('delete', {error: { message: "There was an error getting the employees"}});
    });
    }else{
    var args = {
      data: req.body,
      header: {"Content-Type": "application/json"}
    };
    client.delete(endpoint + "/" + req.body.id, args, function (data, response){
      if(response.statusCode != "200"){
        return res.view('delete', {error:{message: response.statusMessage + ": " + data.response}});
    }

    return res.view('delete', {success:{message: "Record deleted successfully"}});
   })
  }
}
}

