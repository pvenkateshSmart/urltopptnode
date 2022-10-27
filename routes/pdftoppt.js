var express = require('express');
var router = express.Router();
//const puppeteer = require("puppeteer");
const path = require('path');
fs = require('fs');
const pdfConverter = require('pdf-poppler');
const PPTX = require('nodejs-pptx');
const axios = require('axios');
/* GET users listing. */
router.post('/', async function (req, res, next) {
    let pptx = new PPTX.Composer();
   

  //  pptx.setLayout('LAYOUT_WIDE');
    //pptx.setLayout({ name:'A3', width:16.5, height:11.7 });

   // pptx.layout = "LAYOUT_WIDE";

    // req.body.path = '220910151129733';
    // req.body.subjepath = 'CHEMISTRY';



    //Folder created if exsits or not based on papercode
    uploadPath = (req.body.path != '') ? './uploads/' + req.body.path : './uploads/' + req.body.path;

    if (!fs.existsSync(uploadPath)) {
        fs.mkdir(path.join(uploadPath), {
            recursive: true
        }, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
    }
    console.log(uploadPath);

    //Folder created if exsits or not based on subject
    uploasubjectdPath = (req.body.subjepath != '') ? './uploads/' + req.body.path + '/' + req.body.subjepath + '/images' : './images/';

    if (!fs.existsSync(uploasubjectdPath)) {
        fs.mkdir(path.join(uploasubjectdPath), {
            recursive: true
        }, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('Directory created successfully!');
        });
    }
    console.log(uploasubjectdPath);
    var SetObjurl = {
        "url": "http://exam.aditya.ac.in/touchstone/downlaod_paper.html?papercode=" + req.body.path + "&subject=" + req.body.subjepath,
        "output": "pdf",  "pdf": {             
            //landscape: true
            "width":"1920",
            "height":"1080"
        },
        "emulateScreenMedia": true
    };

    axios.post('https://apis.aditya.ac.in/url2pdf/render?', SetObjurl, {
            responseType: 'arraybuffer'
        })
        .then((resp) => {
            fs.writeFileSync("./uploads/" + req.body.path + "/" + req.body.subjepath + "/" + req.body.subjepath + ".pdf", resp.data)
            sendtoimages();
        }).catch((err) => {
            console.log(err);
            //console.error(err);
        });
    //return false;
    // pdf create start
    // const browser = await puppeteer.launch();
    // try {
    //     const page = await browser.newPage();

    //     await page.goto("http://exam.aditya.ac.in/touchstone/downlaod_paper.html?papercode=" + req.body.path + "&subject=" + req.body.subjepath, {
    //         waitUntil: "networkidle0"
    //     });
    //     await page.setViewport({
    //         width: 1680,
    //         height: 1050
    //     });
    //     await page.pdf({
    //         path: "./uploads/" + req.body.path + "/" + req.body.subjepath + "/" + req.body.subjepath + ".pdf",
    //         //format: "A4",
    //         //size:"landscap",
    //         printBackground: true
    //     });

    // } catch (err) {
    //     console.log(err.message);
    // } finally {
    //     await browser.close();
    // }
    // pdf create end
    //return false;
    function sendtoimages() {
        for (var i = 0; i < 1; i++) {
            var option = {
                format: 'jpeg',               
                out_dir: './uploads/' + req.body.path + '/' + req.body.subjepath + '/images/',
                out_prefix: path.basename(req.body.subjepath, path.extname('./uploads/' + req.body.path + '/' + req.body.subjepath + '/' + req.body.subjepath + '.pdf')),             
                //orientation: "landscape",
                 scale: 1920,
               // density: 100,
            //  
           // maxBuffer:1920*1080,
                 //   width: 1920,
                 //   height: 1080,
            
                //size: { width: "1920px", height: "1080px" },
                // width: "1920px",
                //  height: "1080px",                 
                page: i
            }
            pdfConverter.convert('./uploads/' + req.body.path + '/' + req.body.subjepath + '/' + req.body.subjepath + '.pdf', option)
                .then(() => {
                    console.log('file converted' + i)
                    generate_pptx();
                })
                .catch(err => {
                    console.log('an error has occurred in the pdf converter ' + err)
                })
        }
    }
    const generate_pptx = async () => {
        const getAllDirFiles = function (dirPath, arrayOfFiles) {
            files = fs.readdirSync(dirPath)

            arrayOfFiles = arrayOfFiles || []

            files.forEach(function (file) {
                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                    arrayOfFiles = getAllDirFiles(dirPath + "/" + file, arrayOfFiles)
                } else {
                    arrayOfFiles.push(file)
                }
            })

            return arrayOfFiles
        }

        const resultlength = getAllDirFiles('./uploads/' + req.body.path + '/' + req.body.subjepath + '/images/').length
        console.log(resultlength);
        //pptx.layout = 'legal'    
        //pptx.setLayout({ name:'Test', width:1920, height:1080 });
       


        await pptx.compose(async pres => {
            
            for (var i = 1; i < resultlength; i++) {
                if (i < 10) {
                    k = '0' + i;
                } else {
                    k = i;
                }

                pres.layout('LAYOUT_WIDE').addSlide(async slide => {
                    slide.addImage(image => {
                        image.file('./uploads/' + req.body.path + '/' + req.body.subjepath + '/images/' + req.body.subjepath + '-' + k + '.jpg').x(0).y(0).cx(0).cy(540);
                    });
                });
            }
        });
        var savepath = './uploads/' + req.body.path + '/' + req.body.subjepath + '/' + req.body.path + '_' + req.body.subjepath + '.pptx';
        console.log(savepath);

        await pptx.save(savepath);
        res.download(savepath, req.body.path + '_' + req.body.subjepath + '.pptx', function (err) {
            console.log('download callback called');
            if (err) {
                console.log('something went wrong');
            }

        })
        // res.send(req.body.path+'_'+req.body.subjepath+' ppt file generated');
    }

});

module.exports = router;