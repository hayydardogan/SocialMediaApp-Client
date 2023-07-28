<script setup>
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
                <div class="btn-group ">
                    <button class="btn btn-success btn-sm dropdown-toggle" type="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        {{ userName }} {{ userSurname }}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right p-0 mt-1">
                        <RouterLink to="/Profile" class="dropdown-item p-2 hover:bg-success"><i
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

    <div class="container mt-5 w-full">

        

        <div class="card bg-light mb-3">
            <div class="card-header d-flex justify-content-between">
                <div style="display: flex; gap: 15px; align-items: center;">
                    <img src="../assets/img/img_avatar.png" class="rounded-circle" style="width: 30px;" />
                    <span>Yusuf Eldemir</span>
                </div>
                <div style="display: flex;align-items: center;">
                    <span>28.07.2023 14:16</span>
                </div>
            </div>
            <div class="card-body">
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae orci pharetra,
                    laoreet est ac, varius erat. Sed eget maximus elit, eu accumsan nulla. Phasellus aliquet maximus nulla,
                    vitae elementum eros mattis non. Fusce erat dolor, hendrerit eleifend maximus in, mattis ut ligula.
                    Integer non pulvinar dolor. Praesent tellus purus, ultrices id auctor tempus, rhoncus et magna.
                    Curabitur semper arcu vitae eros scelerisque suscipit. Aliquam porttitor, tortor vel facilisis interdum,
                    arcu orci consectetur eros, sit amet aliquet risus nulla lobortis velit. Cras consectetur id diam vel
                    molestie. Nunc blandit eros eu sem facilisis, interdum laoreet nibh sollicitudin. Curabitur efficitur,
                    libero a sagittis lobortis, felis massa cursus dolor, in ultrices tellus tellus id elit. Ut purus nunc,
                    sodales at urna non, sagittis commodo orci. Aenean interdum cursus erat, et gravida arcu blandit id.
                    Nulla ut sollicitudin ipsum. Curabitur felis est, fermentum in odio quis, iaculis aliquam quam.</p>
            </div>
            <div class="card-footer">

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'


export default {
    data() {
        return {
            userName: null,
            userSurname: null,
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
                    this.userName = res.data.user.userName
                    this.userSurname = res.data.user.userSurname
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        }
    }
}
</script>
