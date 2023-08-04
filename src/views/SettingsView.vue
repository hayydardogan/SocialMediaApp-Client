<script setup>
import axios from 'axios';
import Navbar from '../components/Navbar.vue'
</script>
<style>
.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}

.account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
}

.account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}

.account-settings .user-profile h5.user-name {
    margin: 0 0 0.5rem 0;
}

.account-settings .user-profile h6.user-email {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 400;
}

.account-settings .about {
    margin: 1rem 0 0 0;
    font-size: 0.8rem;
    text-align: center;
}
</style>
<template>
    <Navbar />
    <!-- <div class="container mt-5" style=" background: #1A233A; border-radius: 25px; color: #bcd0f7; padding-top: 25px; padding-bottom: 50px;">

        <div class="row d-flex justify-content-center">
            <div class="col-6">
                <h1><i class="fa-solid fa-gear"></i> AYARLAR</h1>
                <br>
                <div class="input-group mb-3">
                    <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                    <input type="text" class="form-control " placeholder="Ad" v-model="userInfo.userName">
                    <input type="text" class="form-control" placeholder="Soyad" v-model="userInfo.userSurname">
                </div>
                <div class="input-group mb-3">
                    
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
    </div> -->

    <div class="container mt-5">
        <h1 style="text-align: center;"><i class="fa-solid fa-gears"></i> AYARLAR</h1>
        <br>
        <p class="badge text-bg-success">Önizleme</p>
        <div class="row gutters">

            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                    <div class="card-body" style="padding-top: 50px;">
                        <div class="account-settings">
                            <div class="user-profile">
                                <div class="user-avatar">
                                    <img :src="userInfo.userImage">
                                </div>
                                <h5 class="user-name">{{ userInfo.userName }} {{ userInfo.userSurname }}</h5>
                                <h6 class="user-email mb-2"><i class="fa-solid fa-at"></i> {{ userInfo.userNick }}</h6>
                                <h6 class="user-email"><i class="fa-solid fa-envelope"></i> {{ userInfo.userEmail }}</h6>
                            </div>
                            <div class="about" style="padding-top: 50px;">
                                <h5 class="mb-2 text-primary">Biyografi</h5>
                                <p class="mt-3">{{ userInfo.userBiography }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="row gutters">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 class="mb-3 text-primary">Kişisel Bilgiler</h6>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="fullName">Ad</label>
                                    <input type="text" class="form-control"  placeholder="Adınızı girin" v-model="userInfo.userName">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="eMail">Soyad</label>
                                    <input type="text" class="form-control"  placeholder="Soyadınızı girin" v-model="userInfo.userSurname">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="phone">Kullanıcı Adı</label>
                                    <input type="text" class="form-control" 
                                        placeholder="Kullanıcı adınızı girin" v-model="userInfo.userNick">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="website">E-Posta</label>
                                    <input type="url" class="form-control" 
                                        placeholder="E-Posta adresinizi girin" v-model="userInfo.userEmail">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="website">Avatar</label>
                                    <input type="url" class="form-control"  placeholder="Avatar URL girin" v-model="userInfo.userImage">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="website">Şifre</label>
                                    <input type="url" class="form-control"  placeholder="Şifrenizi girin" v-model="userInfo.userPassword">
                                </div>
                            </div>
                        </div>
                        <div class="row gutters">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 class="mb-3 text-primary">Biyografi</h6>
                            </div>
                            <div >
                                <div class="form-group">
                                    <label for="Street">Hakkımda</label>
                                    <textarea class="form-control" placeholder="Hakkımda yazısı giriniz" style="resize: none;" v-model="userInfo.userBiography"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row gutters" >
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                                <div class="text-right d-flex gap-2" style="display: flex; justify-content: flex-end;">
                                    <button type="button" class="btn btn-secondary btn-sm">Vazgeç</button>
                                    <button type="button" class="btn btn-primary btn-sm">Kaydet</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                userPassword: null,
                userBiography: null
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
                        this.userInfo.userImage = res.data.user.userImage
                        this.userInfo.userBiography = res.data.user.userBiography
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