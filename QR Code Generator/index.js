import inquirer from 'inquirer';
import qr from 'qr-image';
import * as fs from 'fs';

inquirer
  .prompt([
    /* Pass your questions in here */
    { message : "Type in your URL: ",
    name :"URL"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    var URL = answers.URL;
    var qr_img = qr.image(URL, { type: 'png' });
    qr_img.pipe(fs.createWriteStream('qr_img.png'));
    fs.writeFile("URL.txt", URL, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      // Something else went wrong
      console.log("Some Other Error")
    }
  });

