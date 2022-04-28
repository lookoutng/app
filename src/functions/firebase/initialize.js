import firebase from "firebase/compat/app";


export const firebaseInit = () => {
    
    return firebase.initializeApp({
            // measurementId: "G-MEASUREMENT_ID",
        apiKey: 'AIzaSyCK2fTFYuAuJ-WgZd3JqJGMugWRE8V8M1Y',
        authDomain: 'dailydata-21793.firebaseapp.com',
        databaseURL: 'https://dailydata-21793.firebaseio.com',
        projectId: 'dailydata-21793',
        storageBucket: "'dailydata-21793.appspot.com",
        messagingSenderId: "228418497521",
        appId: '1:228418497521:web:dec1d095f60064269ab250',
        serverKey: 'AAAANS7Nq_E:APA91bG4QzSXUsCdbRNtV3-AoBQ8xBlpLgHrxjpchxGcrdGiNTKhyHFZKSqlxsf_NAymLAkvyfeB5PmIez5xqGPphTkoi_ZTwV2BlEZC2zOMYeCXUQfvU3RE3GTuqr8_iS706qK5Bkg_',
        publicKey: 'BFYu3NoIbmPGNi5ey1f4PmMrp8ATm1FwpuL8brwJzhnqvw817gay89G80lmgNeurtIEerFXqfVcFUtzHgase1uU',

    })
}
