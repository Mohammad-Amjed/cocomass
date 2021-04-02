

    function chunkArr(arr, n) {
        if (n <= 0) throw new Error("n must be greater than 0");
        return Array
          .from({length: Math.ceil(arr.length/n)})
          .map((_, i) => arr.slice(n*i, n*(i+1)))
      }
      
      /**
       * Fetch documents with the given IDs from the given collection query or
       * collection group query.
       *
       * **Note:** If a particular document ID is not found, it is silently omitted
       * from results.
       *
       * This utility function has two modes:
       * * If `forEachCallback` is omitted, this function returns an array containing
       *   all found documents.
       * * If `forEachCallback` is given, this function returns undefined, but found
       *   document is passed to `forEachCallback`.
       *
       * @param {firebase.firestore.Query} collectionQueryRef A collection-based query
       * to search for documents
       * @param {string[]} arrayOfIds An array of document IDs to retrieve
       * @param {((firebase.firestore.QueryDocumentSnapshot) => void) | undefined} [forEachCallback=undefined]
       * A callback to be called with a `QueryDocumentSnapshot` for each document found.
       * @param {*} [forEachThisArg=null] The `this` binding for the callback.
       * @return {*} an array of `QueryDocumentSnapshot` objects (in no callback mode) or `undefined` (in callback mode)
       *
       * @author Samuel Jones 2021 (samthecodingman) [MIT License]
       */
      async function fetchDocumentsWithId(collectionQueryRef, arrayOfIds, forEachCallback = undefined, forEachThisArg = null) {
        // in batches of 10, fetch the documents with the given ID from the collection
        const fetchDocsPromises = chunkArr(arrayOfIds, 10)
          .map((idsInChunk) => (
            collectionQueryRef
              .where(firebase.firestore.FieldPath.documentId(), "in", idsInChunk)
              .get()
          ))
      
        // after all documents have been retrieved:
        //  - if forEachCallback has been given, call it for each document and return nothing
        //  - if forEachCallback hasn't been given, return all of the QueryDocumentSnapshot objects collected into one array
        return Promise.all(fetchDocsPromises)
          .then((querySnapshotArray) => {
            if (forEachCallback !== void 0) {
              // callback mode: call the callback for each document returned
              for (let querySnapshot of querySnapshotArray) {
                querySnapshot.forEach(forEachCallback, forEachThisArg)
              }
      
              return;
            }
      
            // no callback mode: get all documents as an array
            const allDocumentSnapshotsArray = [];
            for (let querySnapshot of querySnapshotArray) {
              querySnapshot.forEach(doc => allDocumentSnapshotsArray.push(doc))
            }
            return allDocumentSnapshotsArray;
          });
      }




useEffect(() => {
   
    db.collection("users").doc("4sfrRMB5ROMxXDvmVdwL").collection("basket").onSnapshot((docs) => {
        const cartItems = [], itemPriceObject = {};
        // cartItems will be ({ id: string, quantity: number, price: number | null, lineTotal: number })[]
        // itemPriceObject will be a map of IDs to their price (a Record<string, number | null>) (used to deduplicate IDs & store prices)
        
        docs.forEach(doc => {
          const cartItem = doc.data()
          cartItems.push(cartItem)
          itemPriceObject[cartItem.id] = null
        });
   

    const idsArray = Object.keys(itemPriceObject);
    fetchDocumentsWithId(
        db.collection("products"),
        idsArray,
        (itemDoc) => {
          itemPriceObject[itemDoc.id] = itemDoc.get("price")  
                  .then(() => {
            // if here, all prices (that are available) have been retrieved
            // MAY BE NULL! Consider these items to be "not available"
      
            const totalSum = 0
            
            // put prices in their items, calculate line cost and add to total
            cartItems.forEach(item => {
              item.price = itemPriceObject[item.id]
              item.lineTotal = item.price === null ? 0 : item.price * item.quantity
              totalSum += item.lineTotal
            })
            
            // set items & total sum
            setItems(cartItems)
            setTotal(totalSum)
          })
          .catch((error) => {
            // failed to retrieve some documents from the database
            // TODO: update UI
          }); // more efficient than itemDoc.data().price
        }
      )
    })
}, [])

