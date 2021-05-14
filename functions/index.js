const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const cors = require("cors")({ origin: true });
const gardeners = admin.firestore().collection("gardeners");

exports.registerNewGardener = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        let gardener = request.body
        let resp = {}
        if (gardener !== "undefined") {
            const newGardener = {
                firstName: gardener.firstName,
                lastName: gardener.lastName,
                email: gardener.email,
                firebaseGardenerId: gardener.firebaseGardenerId
            }
            gardeners.add(newGardener)
            resp = newGardener
        } else {
            resp = { errorMsg: "missing required information"}
        }
        return response.status(200).send(resp)
    })
})

exports.getGardenerById = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        console.log(request.body)
        const gardener = gardeners.where('firebaseUserId', '==', request.body)
        gardener.get().then((snap) => {
            if (snap.empty) {
                return response.status(404).send("gardener not found")
            } else {
                snap.forEach(doc => {
                    return response.status(200).send(doc.data())
                })
            }
        }).catch((error) => {
            console.log(error);
        });
    })
})

exports.getAllGardeners = functions.https.onRequest((request, response) => {
    cors(request, response, async () => {
        const allGardeners = await gardeners.get()
        const data = []
        allGardeners.forEach((doc) => {
            data.push(doc.data())
        })
        response.status(200).send(data)
    })
})