// Import all the necessary libraries
const functions = require('firebase-functions');
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')
var geofirex = require('geofirex');

// Get Firebase account keys and details
var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)  // Initialise the firebase-admin SDK
});

const geo = geofirex.init(admin);  //Initialise Geofirex with your Firebase project 

// projectURL/postData   POST Request function 
exports.postData = functions.https.onRequest((req, res)=>{
 cors(req, res, ()=>{




    if(req.method === 'POST'){

        var docID = req.body.lat + '_' + req.body.long; //Document ID = lat_long
        const trees = geo.collection('trees');  //Collection ID = 'trees'
    
        const point = geo.point(Number(req.body.lat), Number(req.body.long));  //convert lat and long to geohash
    
	// store all data coming from req.body (x-www-form-urlencoded method)
        trees.setDoc(docID, { 
            genericName: req.body.generic_name,
            scientificName: req.body.scientific_name,
            type: req.body.type,
            leafStructure: req.body.leaf_structure,
            rootStructure: req.body.root_structure,
            age: req.body.age,
            flower: req.body.flower,
            fruit: req.body.fruit,
            position: point.data,
            
    		// Environmental Risks
            cutBranches: req.body.cut_branches,
            sap: req.body.sap,
            branchCrack: req.body.cracked_branches,
            brownmud: req.body.brownmud,
            tumors: req.body.tumors,
            fungus: req.body.fungus,
            wilting: req.body.wilting,
            saprophyte: req.body.saprophyte,
            fire: req.body.fire,
            stripped: req.body.stripped,
            construction: req.body.construction,
            branchesCut: req.body.brachesCut,
            overgrownBranches: req.body.overgrownBranches,
            cutTrees: req.body.cutTrees,
            landBurn: req.body.landBurn,
            highway: req.body.highway,
            industrial: req.body.industrial,
            publicLand: req.body.publicLand,
            widened: req.body.widened,
            habitatedPrivate: req.body.habitatedPrivate,
            unhabitatedPrivate: req.body.unhabitatedPrivate,
            centerProperty: req.body.centerProperty,
            perimeterProperty: req.body.perimeterProperty,
            forest: req.body.forest,
        });

        res.status(200).json({
            message: 'Data sent'
        })
    }else{

        res.status(500).json({
            message: 'Invalid Request'
        })

    }

 })
 
})


//ProjectURL/getData   (GET request function)
exports.getData = functions.https.onRequest((req, res)=>{

    var userLat = Number(req.body.userLat);     //Get current user location 
    var userLong = Number(req.body.userLong);
    const center = geo.point(userLat, userLong);
    const radius = Number(req.body.radius);      //Set bound radius around user in kilometers

    const query = geo.collection('trees').within(center, radius, field);

    if(req.method === 'GET'){
        res.send(query)
    }else{
        res.status(500).json({
            message: 'Invalid Request'
        })
    }
})
