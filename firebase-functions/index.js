const functions = require('firebase-functions');
const cors = require('cors')({origin: true})
const admin = require('firebase-admin')
const geofirestore = require('geofirestore');


var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const defaultFirestore = admin.firestore();

// Create a Firestore reference for Geofirestore 
const  geoFirestore = new geofirestore.GeoFirestore(defaultFirestore);
// Create a Collection reference
const geoCollection = geoFirestore.collection('trees');







exports.postData = functions.https.onRequest((req, res)=>{
 cors(req, res, ()=>{




    if(req.method === 'POST'){

        var lat = Number(req.body.lat);
        var long = Number(req.body.long);
    
        geoCollection.add( { 
            
            info : {
                genericName: req.body.generic_name,
                scientificName: req.body.scientific_name,
                type: req.body.type,
                leafStructure: req.body.leaf_structure,
                rootStructure: req.body.root_structure,
                age: req.body.age,
                flower: req.body.flower,
                fruit: req.body.fruit
                    },
            healthChecks: {
                cutBranches: req.body.cut_branches,
                sap: req.body.sap,
                branchCrack: req.body.cracked_branches,
                brownmud: req.body.brownmud,
                tumours: req.body.tumours,
                fungus: req.body.fungus,
                wilting: req.body.wilting,
                saprophyte: req.body.saprophyte,
                fire: req.body.fire,
                stripped: req.body.stripped,
                construction: req.body.construction,
                branchesCut: req.body.branchesCut,
             },
            environmentalRisks: {
                overgrownBranches: req.body.overgrownBranches,
                cutTrees: req.body.cutTrees,
                landBurn: req.body.landBurn,
                highway: req.body.highway,
                industrial: req.body.industrial,
                publicLand: req.body.publicLand,
                widened: req.body.widened,
                inhabitedPrivate: req.body.inhabitedPrivate,
                uninhabitedPrivate: req.body.uninhabitedPrivate,
                centerProperty: req.body.centerProperty,
                perimeterProperty: req.body.perimeterProperty,
                forest: req.body.forest,
            },
            
            coordinates: new admin.firestore.GeoPoint(lat, long)
        }).then((ref)=>{
            return console.log(ref)
        }).catch((err)=>{
            return console.log(err)
        })

        res.status(200).json({
            message: 'Data Sent'
        })
    }else{
        res.status(500).json({
            message:'Invalid Request'
        })
    }
 
})

})


exports.getData = functions.https.onRequest((req, res)=>{

    cors(req, res, ()=>{

        if(req.method === 'POST'){

            var radius = Number(req.body.radius)
            var userLat = Number(req.body.userLat)
            var userLong = Number(req.body.userLong)

            var query = geoCollection.near({ center: new admin.firestore.GeoPoint(userLat, userLong), radius: radius });

            query.get().then((snap)=>{
                return res.send(snap.docs)
            }).catch((err)=>{
                throw res.send(err)
            })

        }else{
            res.status(500).json({
                message: 'Invalid Request'
            })
        }
    })
})
