import { collection, getDocs, query, where, addDoc, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore/lite';
import {defineStore} from 'pinia';
import {db} from '../../firebaseConfig';
import {auth} from '../../firebaseConfig';
import { nanoid } from 'nanoid';
import router from '../router';

export const useDatabaseStore = defineStore ('database', {
    state : () => ({
        documents: [],
        loadingDoc: false,
        loading: false
    }),
    actions: {
        async getUrls() {

            if(this.documents.length !==0) {
                return;
            }

            this.loadingDoc=true
            try {

                const q = query(collection(db, 'urls'), where("user", "==", auth.currentUser.uid))
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, doc.data());
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),
                    })
                })
            } catch (error) {
                console.log(error)
            } finally {
                this.loadingDoc = false
            }
            
        },
        async addUrl(name) {
            this.loading = true;
            try {
                const objetoDoc = {
                    name: name,
                    short: nanoid(7),
                    user: auth.currentUser.uid
                };
                const docRef = await addDoc (collection(db, "urls"), objetoDoc);
                this.documents.push({
                    ...objetoDoc,
                    id: docRef.id
                })
            } catch (error) {
                console.log(error.code);
                return error.code
            } finally {

            }
        },
        async leerUrl(id) {
            try {
                const docRef = doc (db, "urls", id);
                const docSnap = await getDoc(docRef);
                if (!docSnap.exists()) {
                    throw new error('No existe el doc')
                };
                if(docSnap.data().user !== auth.currentUser.uid)
                throw new error('No le pertenece ese documento')

                return docSnap.data().name
            } catch (error) {
                console.log(error.message)
            }
        },
        async updateUrl(id, name) {
            this.loading = true;

            try {
                const docRef = doc (db, "urls", id);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    throw new error('No existe el doc')
                };

                if(docSnap.data().user !== auth.currentUser.uid)
                throw new error('No le pertenece ese documento')

                await updateDoc(docRef, {
                    name: name
                })
                this.documents = this.documents.map(item => item.id === id ? ({...item, name: name}) : item)
                router.push('/')
                // return docSnap.data().name
            } catch (error) {
                return error.message
            } finally {
            this.loading = false;
            }
           
        },
        async deleteUrl(id) {
            this.loading = true;

            try {
                const docRef = doc(db, 'urls', id);

                const docSnap = await getDoc(docRef)

                if (!docSnap.exists()) {
                    throw new error('No existe el doc')
                };

                if(docSnap.data().user !== auth.currentUser.uid)
                throw new error('No le pertenece ese documento')

                await deleteDoc(docRef);
                this.documents = this.documents.filter ((item) => item.id !== id);
            } catch (error) {
                return error.message
            } finally {
            this.loading = false;
            }

        }
    },
    }

)

