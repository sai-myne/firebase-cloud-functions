var app = new Vue({
    el: '#app',
    data: {
        requests: []
    },
    methods: {
        upvoteRequest(id){
            const upvote = firebase.app().functions('asia-southeast2').httpsCallable('upvote');
            upvote({ id })
                .catch(error => {
                    showNotification(error.message);
                });
        }
    },
    mounted(){
        const ref = firebase.firestore().collection('requests').orderBy('upvotes', 'desc');
        ref.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach(doc => {
                requests.push({...doc.data(), id: doc.id})
            });
            this.requests = requests;
        });
    }
})



