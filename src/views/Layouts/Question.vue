<template>
<div id="menu" class="row">
    <ul class="menu">
        <li class="menu__item">
            <a class="menu__link" href="#">Home</a>
        </li>

        <li class="menu__item menu__item--dropdown" v-on:click="toggle('ranking')" v-bind:class="{'open' : dropDowns.ranking.open}">
            <a class="menu__link menu__link--toggle" href="#">
                <span>Rangliste</span>
                <i class="menu__icon fa fa-angle-down"></i>
            </a>

            <ul class="dropdown-menu">
                <li class="dropdown-menu__item" style="color:red;">
                    Delete
                </li>

                <li class="dropdown-menu__item">
                    Edit
                </li>
            </ul>
        </li>

        <li class="menu__item">
            <a class="menu__link" href="#">Belegungskalender</a>
        </li>
    </ul>

</div>
</template>

<script>
import {
    IonList,
    IonItem,
    IonText,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption,
} from '@ionic/vue'
import {
    VueCollapsiblePanelGroup,
    VueCollapsiblePanel,
} from '@dafcoe/vue-collapsible-panel'
import {
    Get,
} from '../../storage'
import axios from 'axios'

export default {
    name: 'QuestionHistory',
    props: ['questions', 'default'],
    components: {
        IonList,
        IonItem,
        IonText,
        IonButton,
        IonInput,
        IonSelect,
        IonSelectOption,
        VueCollapsiblePanelGroup,
        VueCollapsiblePanel,
    },
    props:['id','answered'],
    data() {
        return {
            // questions: [],
            dropDowns: {
                ranking: {
                    open: false
                }
            }
        }
    },
    methods: {
        delete($id){
            axios.delete(this.$hostname + '/api/answer/delete/' + $id, {
                headers: {
                    "Authorization": 'Bearer ' + token,
                    "Accept": 'application/json'
                },
            })
            .then((res) => {
                openToast('Answer deleted')
                dismiss()
            })
            .catch((error) => {
                console.log(error)
                showError(error)
                dismiss()
            })
        },
        update(){

        }
    },
    async mounted() {
        var self = this
        window.addEventListener('click', function (e) {
            if (!e.target.parentNode.classList.contains('menu__link--toggle')) {
                self.close()
            }
        }, false)
        if (this.default) {
            open(this.default)
            location.href = "#question" + this.default
        }
    },
    setup() {

    }
};
</script>

<style scoped>
body {
    margin: 2rem 0;
}

ul {
    list-style: none;
}

.menu {
    display: flex;

    &__item {
        position: relative;
        padding-right: 3rem;

        &--dropdown {}
    }

    &__link {
        //color: $menu_link_color;
        text-transform: uppercase;

        &:hover {
            //color: $menu_link_hover_color;
        }

        &--toggle {}
    }

    &__icon {
        margin: 0 !important;
    }
}

.open .dropdown-menu {
    display: block;
}

.dropdown-menu {
    font-size: 0.9rem;
    position: absolute;
    min-width: 130px;
    top: 2.2rem;
    display: none;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}

.dropdown-menu__item:first-child .dropdown-menu__link {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.dropdown-menu__item:last-child .dropdown-menu__link {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
}

.dropdown-menu__link {
    display: block;

    padding: 1rem;
    color: blue;
    background-color: #fafafa;

    &:hover {
        color: green;
        background-color: #ccc;
    }
}
</style>
