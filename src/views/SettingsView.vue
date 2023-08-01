<script setup>
import axios from 'axios';
import Navbar from '../components/Navbar.vue'
</script>
<template>
    <Navbar />
    <div class="container mt-5">

        <div class="row d-flex justify-content-center">
            <div class="col-6">
                <h1><i class="fa-solid fa-gear"></i> AYARLAR</h1>
                <br>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                    <input type="text" class="form-control " placeholder="Ad" v-model="userInfo.userName">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                    <input type="text" class="form-control" placeholder="Soyad" v-model="userInfo.userSurname">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                    <input type="email" class="form-control" placeholder="E-Posta" v-model="userInfo.userEmail">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="fa-solid fa-at"></i></span>
                    <input type="text" class="form-control" placeholder="Kullanıcı Adı" v-model="userInfo.userNick">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                    <input type="text" class="form-control" placeholder="******" v-model="userInfo.userPassword">
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-sm btn-primary"><i class="fa-solid fa-check"></i> GÜNCELLE</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            userInfo: {
                userName: null,
                userSurname: null,
                userEmail: null,
                userNick: null,
                userImage: null,
                userPassword: null
            },
            url: "http://localhost:3000/api/",
        }
    },
    methods: {
        getUserInfo() {
            axios.get(this.url + "getUserInfo", { headers: { token: localStorage.getItem("token") } }).then(res => {
                if (res.status === 200) {
                    this.userInfo.userName = res.data.user.userName,
                    this.userInfo.userSurname = res.data.user.userSurname,
                    this.userInfo.userEmail = res.data.user.userEmail,
                    this.userInfo.userNick = res.data.user.userNick,
                    this.userInfo.userImage = res.data.user.userImage,
                    this.userInfo.userPassword = res.data.user.userPassword
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        }
    },
    created() {
        this.getUserInfo();
    }
}
</script>