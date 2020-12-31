'use strict'
const { Storage } = require('@google-cloud/storage');
const uuid = require('uuid-v4');

const path = require('path');
const fs = require('fs');

const serviceAccount = require("../config/generateConfigFB.json")


let deleteFile = (file) => {
  fs.unlink(file, (err) => {
    if (err) throw err;
  })
}


let saveFileFB = (file) => {

  return new Promise((resolve, reject) => {

    //if(admin.apps.length == 0) {
    const gcs = new Storage({
      keyFilename: path.join(__dirname, '..', 'helpers', 'generateConfigFB.json'),
      projectId: "habits-ai"
    })
    //  }
    let bucket = gcs.bucket("habits-ai.appspot.com")
    /*     const blob = bucket.file(file.path);
   
       const blobStream = blob.createWriteStream({
           metadata: {
               contentType: file.mimetype,
           },
       }); 
   
       blobStream.on('error', (error) => {
           reject('Something is wrong! Unable to upload at the moment.'+error);
         });
     
         blobStream.on('finish', () => {
           // The public URL can be used to directly access the file via HTTP.
           const url = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
           resolve(url);
         });
     
         blobStream.end(file.buffer);
       }); */
    let myUUID = uuid();


    bucket.upload(file.path, {
      destination: "pruebas/" + file.originalname,
      uploadType: "media",
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: myUUID
        }
      }
    })
      .then((data) => {

        let fileSaved = data[0];

        resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(fileSaved.name) + "?alt=media&token=" + myUUID);
      });

  })


  /*   // put file to firebase  
    var uploadTask = storageRef.put(file.path) 

    // all working for progress bar that in html 
    // to indicate image uploading... report 
    uploadTask.on('state_changed', function(snapshot){ 
      
        switch (snapshot.state) { 
          case admin.storage.TaskState.PAUSED: 
            console.log('Upload is paused'); 
            break; 
          case admin.storage.TaskState.RUNNING: 
            console.log('Upload is running'); 
            break; 
        } 
    }, function(error) {console.log(error); 
    }, function() { 

         // get the uploaded image url back 
         uploadTask.snapshot.ref.getDownloadURL().then( 
          function(downloadURL) { 

         // You get your url from here 
          console.log('File available at', downloadURL); 

        // print the image url  
         console.log(downloadURL); 
        
      }); 
    });  */


}

module.exports = { saveFileFB, deleteFile }

