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
     <div class="vl-parent">
        <loading v-model:active="isLoading"  loader="bars" color="#198754" />

    </div>
    <Navbar />
    

    <div class="container mt-5 mb-5">
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
                                    <img :src="userInfo.userImage" style="position: relative; z-index: 1; border: 2px solid white;">
                                    <img :src="userInfo.userCoverImage" style="border-radius: 25px; width: 80%; position: absolute; left: 30px; top: 15px; z-index: 0;">
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
                                    <input type="text" class="form-control" placeholder="Adınızı girin"
                                        v-model="userInfo.userName">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="eMail">Soyad</label>
                                    <input type="text" class="form-control" placeholder="Soyadınızı girin"
                                        v-model="userInfo.userSurname">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="phone">Kullanıcı Adı</label>
                                    <input type="text" class="form-control" placeholder="Kullanıcı adınızı girin"
                                        v-model="userInfo.userNick">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="website">E-Posta</label>
                                    <input type="url" class="form-control" placeholder="E-Posta adresinizi girin"
                                        v-model="userInfo.userEmail">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="website">Avatar</label>
                                    <input type="url" class="form-control" placeholder="Avatar URL girin"
                                        v-model="userInfo.userImage">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="website">Kapak Fotoğrafı</label>
                                    <input type="url" class="form-control" placeholder="Kapak Fotoğrafı URL girin"
                                        v-model="userInfo.userCoverImage">
                                </div>
                            </div>
                        </div>
                        <div class="row gutters">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 class="mb-3 text-primary">Biyografi</h6>
                            </div>
                            <div>
                                <div class="form-group">
                                    <label for="Street">Hakkımda</label>
                                    <textarea class="form-control" placeholder="Hakkımda yazısı giriniz"
                                        style="resize: none;" v-model="userInfo.userBiography"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row gutters">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                                <div class="text-right d-flex gap-2" style="display: flex; justify-content: flex-end;">
                                    <button type="button" class="btn btn-primary btn-sm"
                                        @click="updateUserInfo()">Kaydet</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 mt-3">

            </div>
            <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12 mt-3">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="row gutters">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <h6 class="mb-3 text-primary">Şifre Değiştirme</h6>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="website">Yeni Şifre</label>
                                    <input type="password" class="form-control" placeholder="Yeni şifrenizi girin"
                                        v-model="passwordVal.newPassword1">
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mb-3">
                                <div class="form-group">
                                    <label for="website">Yeni Şifre (Tekrar)</label>
                                    <input type="password" class="form-control" placeholder="Yeni şifrenizi girin"
                                        v-model="passwordVal.newPassword2">
                                </div>
                            </div>

                        </div>

                        <div class="row gutters">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mt-2">
                                <div class="text-right d-flex gap-2" style="display: flex; justify-content: flex-end;">
                                    <button type="button" class="btn btn-primary btn-sm"
                                        @click="changePassword()">Kaydet</button>
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
import Toastify from 'toastify-js'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
export default {

    data() {
        return {
            userInfo: {
                userName: null,
                userSurname: null,
                userEmail: null,
                userNick: null,
                userImage: null,
                userBiography: null,
                userID: null,
                userCoverImage: null,
                
            },
            url: "http://localhost:3000/api/",
            passwordVal: {
                newPassword1: null,
                newPassword2: null
            },
            isLoading: false,
            fullPage: true,
            title: "Ayarlar"
        }
    },
    methods: {
        getUserInfo() {
            this.isLoading = true;
            axios.get(this.url + "getUserInfo", { headers: { token: localStorage.getItem("token") } }).then(res => {
                if (res.status === 200) {
                    this.userInfo.userName = res.data.user.userName,
                        this.userInfo.userSurname = res.data.user.userSurname,
                        this.userInfo.userEmail = res.data.user.userEmail,
                        this.userInfo.userNick = res.data.user.userNick,
                        this.userInfo.userImage = res.data.user.userImage
                    this.userInfo.userBiography = res.data.user.userBiography,
                        this.userInfo.userID = res.data.user._id,
                        this.userInfo.userCoverImage = res.data.user.userCoverImage
                        this.isLoading = false;
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        changePassword() {
            if (this.passwordVal.newPassword1 != this.passwordVal.newPassword2) {
                Toastify({
                    text: 'Parolalar eşleşmiyor.',
                    duration: 3000,
                    newWindow: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "left", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#0d6efd",
                    },

                }).showToast();
            } else {
                let data = {
                    userID: this.userInfo.userID,
                    newPassword: this.passwordVal.newPassword1
                };

                axios.put(this.url + "changePassword" + "/" + data.userID + "&" + data.newPassword).then(res => {
                    if (res.status === 200) {
                        Toastify({
                            text: 'Şifre başarıyla değiştirildi.',
                            duration: 3000,
                            newWindow: true,
                            gravity: "bottom", // `top` or `bottom`
                            position: "left", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                                background: "#198754",
                            },

                        }).showToast();
                    }
                }).catch(err => {
                    console.log("There is an error : " + err.message);
                })

            }
        },
        updateUserInfo() {
            let data = {
                userName: this.userInfo.userName,
                userSurname: this.userInfo.userSurname,
                userNick: this.userInfo.userNick,
                userEmail: this.userInfo.userEmail,
                userImage: this.userInfo.userImage,
                userBiography: this.userInfo.userBiography,
                userID: this.userInfo.userID,
                userCoverImage : this.userInfo.userCoverImage
            }

            axios.put(this.url + "updateUserInfo", { newInfo : data}).then(res => {
                if (res.status === 200) {
                    Toastify({
                        text: 'Bilgiler başarıyla güncellendi.',
                        duration: 3000,
                        newWindow: true,
                        gravity: "bottom",
                        position: "left", 
                        stopOnFocus: true, 
                        style: {
                            background: "#198754",
                        },

                    }).showToast();
                }
            }).catch(err => {
                Toastify({
                        text: "Bir hata oluştu : " + err.message,
                        duration: 3000,
                        newWindow: true,
                        gravity: "bottom", 
                        position: "left",
                        stopOnFocus: true,
                        style: {
                            background: "#dc3545",
                        },

                    }).showToast();
            })
        }
    },
    created() {
        this.getUserInfo();
        window.document.title = this.title;
    }
}
</script>