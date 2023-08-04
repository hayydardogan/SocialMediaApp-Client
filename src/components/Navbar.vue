<template>
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse d-flex justify-content-between">
            <div class="my-logo">
                <RouterLink to="/" class="navbar-brand" style="margin-left: 15px;">SocialMediaApp</RouterLink>
            </div>

            <div style="margin-right: 20px; gap: 15px;" class="d-flex">
                <div>
                    <RouterLink to="/Messages" class="btn btn-success btn-sm position-relative"><i
                            class="fa-regular fa-message"></i><span
                            class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                        </span></RouterLink>
                </div>
                <div>
                    <RouterLink to="/Notifications" class="btn btn-success btn-sm position-relative"><i
                            class="fa-regular fa-bell"></i><span
                            class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                        </span></RouterLink>
                </div>
                <div class="dropdown">
                    <button class="btn btn-success btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {{ activeUser.userName }} {{ activeUser.userSurname }}
                    </button>
                    <div class="dropdown-menu dropdown-menu-end p-0 mt-1">
                        <RouterLink :to="'/Profile/' + activeUser.userNick" class="dropdown-item p-2 hover:bg-success"><i
                                class="fa-solid fa-user"></i> Profil</RouterLink>
                        <RouterLink to="/Settings" class="dropdown-item p-2"><i class="fa-solid fa-gear"></i> Ayarlar
                        </RouterLink>
                        <button class="dropdown-item p-2 bg-danger text-white" @click="logout()"><i
                                class="fa-solid fa-arrow-right-from-bracket"></i>
                            Oturumu Kapat</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            activeUser: {
                userName: null,
                userSurname: null,
                userID: null,
                userNick: null
            },
            url: "http://localhost:3000/api/"
        }
    },
    created() {
        // Kullanıcı giriş yapmadıysa
        if (localStorage.getItem("token") === null) {
            this.$router.push("/Login");
        } else {
            this.getUserInfo();
            
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("token");
            this.$router.push("/Login")
        },
        getUserInfo() {
            
            axios.get(this.url + "getUserInfo", { headers: { token: localStorage.getItem("token") } }).then(res => {
                if (res.status === 200) {
                    this.activeUser.userName = res.data.user.userName
                    this.activeUser.userSurname = res.data.user.userSurname
                    this.activeUser.userID = res.data.user._id,
                    this.activeUser.userNick = res.data.user.userNick
                }


                if (res.status === 401) {
                    console.log("Token geçersiz veya süresi dolmuş.");
                    this.$router.push("/Login");
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })           
        }
    },
    mounted(){
    }
}
</script>