<script setup>
import Navbar from '../components/Navbar.vue'
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");


body {
    background-color: #eee;

}

.card {
    padding: 20px;
    border: none;
}

.inputs {
    position: relative;
}

.form-control {
    text-indent: 15px;
    border: none;
    height: 45px;
    border-radius: 0px;
    border-bottom: 1px solid #eee;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #eee;
    outline: 0;
    box-shadow: none;
    border-bottom: 1px solid #198754;
}


.form-control:focus {
    color: #198754;
}

.inputs i {

    position: absolute;
    top: 14px;
    left: 4px;
    color: #b8b9bc;
}

.star img {

    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
    margin-right: 10px;
    border-radius: 5px;

}

.time-text {
    font-size: 12px;
    color: #7c7b7b;
}

.dots {

    height: 7px;
    width: 7px;
    background-color: #b6b4b4;
    display: flex;
    border-radius: 50%;
    margin-left: 7px;
    margin-right: 7px;
}

.resultItem {
    padding: 10px;
}

.resultItem:hover {
    background-color: #eee;
    cursor: pointer;
}
</style>

<template>
    <Navbar />

    <div class="container">
        <div class="row d-flex justify-content-center mt-5 ">
            <div class="col-md-8">
                <div class="card">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="font-weight-bold">Kullanıcı Ara</span>
                    </div>
                    <div class="mt-3 inputs">
                        <i class="fa fa-search"></i>
                        <input type="text" class="form-control" @input="getResult()" placeholder="Bir şeyler yaz"
                            v-model="searchText">
                    </div>
                    <div class="mt-3" v-for="x in result">
                        <RouterLink :to="'/Profile/' + x.userNick" style="text-decoration: none; color:#0f0f0f ;"
                            class="resultItem d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-row align-items-center">
                                <span class="star"><img :src="x.userImage" alt=""></span>
                                <div class="d-flex flex-column">
                                    <span>{{ x.userName }} {{ x.userSurname }}</span>
                                    <div class="d-flex flex-row align-items-center time-text">
                                        <span>@{{ x.userNick }}</span>
                                        <span class="dots"></span>
                                        <span>{{ x.userBiography }}</span>
                                    </div>
                                </div>
                            </div>
                        </RouterLink>
                    </div>
                </div>

            </div>


        </div>


    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            result: [],
            searchText: null,
            url: "http://localhost:3000/api/",
            title: "Kullanıcı ara"
        }
    },
    methods: {
        getResult() {
            if (this.searchText.length >= 3) {
                axios.get(this.url + "searchUser" + "/" + this.searchText).then(res => {
                    if (res.status === 200) {
                        this.result = res.data.result;
                    }
                }).catch(err => {
                    console.log("There is an error : " + err.message);
                })
            } else {
                this.result = []
            }
        }
    },
    created() {
        window.document.title = this.title;
    }
}
</script>