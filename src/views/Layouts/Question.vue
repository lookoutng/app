<template>
<div>
    <div class="dropdown">
        <ion-button class="dropbtn">
            <Icon icon="mdi:dots-vertical" class="ignore" @click="toggle()" />
        </ion-button>
        <div id="myDropdown" class="dropdown-content  bodoni text14">
            <ion-text class="ignore" @click="edit" v-if="!editable[0]">
                Edit
            </ion-text>
            <ion-text class="ignore" color="danger" @click="deleteAns()">
                Delete
            </ion-text>
        </div>
    </div>

</div>
</template>

<script>
import {
    alertController
} from '@ionic/vue'
import {
    Get,
    dismiss,
    openToast,
    showError
} from '../../storage'
import axios from 'axios'
import {
    Icon
} from '@iconify/vue'

export default {
    name: 'QuestionHistory',
    props:['editable'],
    components: {
        Icon
    },
    data() {
        return {}
    },
    methods: {
        edit(){
            this.$emit('edit')
            setTimeout(this.toggle(),2000)

        },
        async deleteAns() {
            this.toggle()
            const alert = await alertController
                .create({
                    cssClass: 'alert bodoni text12',
                    message: 'The Action is destructive',
                    buttons: [{
                        text: 'Ok',
                        role: 'OK'
                    }, 'Cancel'],
                    backdropDismiss: true,
                });
            await alert.present();

            const role = await alert.onDidDismiss();
            console.log('onDidDismiss resolved with role', role);

            if (role.role == "OK") {

                const token = await Get('token')
                axios.delete(this.$hostname + '/api/question/delete/' + this.$route.params.id, {
                        headers: {
                            "Authorization": 'Bearer ' + token,
                            "Accept": 'application/json'
                        },
                    })
                    .then((res) => {
                        openToast(res.data.message)
                        dismiss()
                        setTimeout(function(){
                            location.replace("/user/question")
                        },2000)
                    })
                    .catch((error) => {
                        console.log(error)
                        showError(error)
                        dismiss()
                    })
            }
        },
        toggle() {
            document.getElementById("myDropdown").classList.toggle("show");
        }
    },
    setup() {

        // Close the dropdown menu if the user clicks outside of it
        window.onclick = function (event) {
            if (!event.target.matches('.dropbtn') && !event.target.matches('.ignore')) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }
};
</script>

<style scoped>
/* Dropdown Button */
.dropbtn {
    --background: white !important;
    --padding-end: 3px !important;
    --padding-start: 3px !important;
    color: black;
    font-size: 20px;
    border: none;
    cursor: pointer;
}

/* Dropdown button on hover & focus */
.dropbtn:hover,
.dropbtn:focus {
    --background: white !important;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
    position: relative;
    display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    background-color: white;
    border-radius: 4px;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content ion-text {
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content ion-text:hover,
.dropdown-content ion-text:active {
    background: lightgray;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

/* Change color of dropdown links on hover */

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {
    display: block;
}
</style>
