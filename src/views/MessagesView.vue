<script setup>
import Navbar from '../components/Navbar.vue'

</script>

<style>
#output {
    overflow-y: auto;
}
</style>

<template>
    <Navbar />

    <div id="chat-wrap">
        <h2>Sohbet</h2>
        <div id="chat-window">
            <div id="output" v-html="test"></div>
            <div id="feedback"></div>
        </div>
        <input type="text" id="message" placeholder="Mesaj" v-model="message.content" @keydown.enter="sendMessage">
        <button id="submitBtn">Gönder</button>
    </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'
export default {
    data() {
        return {
            url: "http://localhost:3000/api/",
            chatApiUrl: "http://localhost:8080",
            activeUser: {
                userName: null,
                userSurname: null,
                userID: null,
                userNick: null
            },
            message: {
                content: null
            },
            socket: {},
            test: "",
            title: "Sohbet"
        }
    },
    methods: {
        getUserInfo() {
            axios.get(this.url + "getUserInfo", { headers: { token: localStorage.getItem("token") } }).then(res => {
                if (res.status === 200) {
                    this.activeUser.userName = res.data.user.userName;
                    this.activeUser.userSurname = res.data.user.userSurname;
                    this.activeUser.userID = res.data.user._id;
                    this.activeUser.userNick = res.data.user.userNick;
                }

                if (res.status === 401) {
                    console.log("Token geçersiz veya süresi dolmuş.");
                    this.$router.push("/Login");
                }
            }).catch(err => {
                console.log("There is an error : " + err.message);
            })
        },
        sendMessage(e) {
            this.message.content = "";
            this.socket.emit("send_message", { message: e.target.value, sender: this.activeUser.userName + " " + this.activeUser.userSurname })
        }
    },
    created() {
        this.getUserInfo();
        window.document.title = this.title;
    },
    mounted() {
        this.socket = io("http://localhost:8080");
        this.socket.on("welcome_message", (data) => {
            console.log(data);
        });
        this.socket.on("result", (data) => {
            console.log(data);
        });
        this.socket.on("chat", (data) => {
            this.test += data;
        });
    }
}
</script>