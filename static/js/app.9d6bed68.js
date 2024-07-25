(function(){"use strict";var e={3752:function(e,t,n){var s=n(3751),o=n(641);const r={class:"app-container"},a={class:"content-wrapper"};function i(e,t,n,i,u,c){const l=(0,o.g2)("Login"),h=(0,o.g2)("Register"),d=(0,o.g2)("ChatInterface");return(0,o.uX)(),(0,o.CE)("div",r,[(0,o.Lk)("div",a,[(0,o.bF)(s.eB,{name:"fade",mode:"out-in"},{default:(0,o.k6)((()=>["login"===u.currentView?((0,o.uX)(),(0,o.Wv)(l,{key:0,onLoginSuccess:c.onLoginSuccess,onShowRegister:c.showRegister},null,8,["onLoginSuccess","onShowRegister"])):"register"===u.currentView?((0,o.uX)(),(0,o.Wv)(h,{key:1,onShowLogin:c.showLogin},null,8,["onShowLogin"])):((0,o.uX)(),(0,o.Wv)(d,{key:2,onLogout:c.logout},null,8,["onLogout"]))])),_:1})])])}const u=(0,o.Lk)("h1",null,"AI Chat Login",-1),c={class:"switch-form"};function l(e,t,n,r,a,i){return(0,o.uX)(),(0,o.CE)("div",null,[u,(0,o.bo)((0,o.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>a.username=e),placeholder:"Username",required:""},null,512),[[s.Jo,a.username]]),(0,o.bo)((0,o.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>a.password=e),placeholder:"Password",required:""},null,512),[[s.Jo,a.password]]),(0,o.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>i.login&&i.login(...e))},"Login"),(0,o.Lk)("div",c,[(0,o.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,s.D$)((t=>e.$emit("show-register")),["prevent"]))},"Don't have an account? Register")])])}var h={name:"LoginForm",data(){return{username:"",password:""}},methods:{login(){fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{"登录成功"===e.message?this.$emit("login-success"):alert(e.message)})).catch((e=>{console.error("Error:",e)}))}}},d=n(6262);const g=(0,d.A)(h,[["render",l]]);var p=g;const m=(0,o.Lk)("h1",null,"Register",-1),f={class:"switch-form"};function v(e,t,n,r,a,i){return(0,o.uX)(),(0,o.CE)("div",null,[m,(0,o.bo)((0,o.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>a.username=e),placeholder:"Username",required:""},null,512),[[s.Jo,a.username]]),(0,o.bo)((0,o.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>a.password=e),placeholder:"Password",required:""},null,512),[[s.Jo,a.password]]),(0,o.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>i.register&&i.register(...e))},"Register"),(0,o.Lk)("div",f,[(0,o.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,s.D$)((t=>e.$emit("show-login")),["prevent"]))},"Already have an account? Login")])])}var L={name:"RegisterForm",data(){return{username:"",password:""}},methods:{register(){fetch("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{alert(e.message),"注册成功"===e.message&&this.$emit("show-login")})).catch((e=>{console.error("Error:",e)}))}}};const w=(0,d.A)(L,[["render",v]]);var k=w;const y=e=>((0,o.Qi)("data-v-0a993fbd"),e=e(),(0,o.jt)(),e),b={class:"chat-container"},C=y((()=>(0,o.Lk)("h1",null,"Chat with AI",-1))),M={class:"chat-content"},O={id:"chat-messages",ref:"chatMessages"},E={class:"input-area"},j={id:"chat-input"},I={class:"action-buttons"},A={id:"upload-container"},S=y((()=>(0,o.Lk)("label",{for:"upload-input",id:"upload-label"},"+",-1)));function T(e,t,n,r,a,i){const u=(0,o.g2)("ChatMessageComponent");return(0,o.uX)(),(0,o.CE)("div",b,[C,(0,o.Lk)("div",M,[(0,o.Lk)("div",O,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(a.chatMessages,((e,t)=>((0,o.uX)(),(0,o.Wv)(u,{key:t,message:e},null,8,["message"])))),128))],512),(0,o.Lk)("div",E,[(0,o.Lk)("div",j,[(0,o.bo)((0,o.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>a.userInput=e),onKeypress:t[1]||(t[1]=(0,s.jR)(((...e)=>i.sendMessage&&i.sendMessage(...e)),["enter"])),placeholder:"Type your message..."},null,544),[[s.Jo,a.userInput]]),(0,o.Lk)("div",I,[(0,o.Lk)("div",A,[(0,o.Lk)("input",{type:"file",id:"upload-input",ref:"uploadInput",multiple:"",onChange:t[2]||(t[2]=(...e)=>i.handleFileUpload&&i.handleFileUpload(...e))},null,544),S]),(0,o.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>i.sendMessage&&i.sendMessage(...e)),class:"send-button"},"➜")])])])]),(0,o.Lk)("button",{onClick:t[4]||(t[4]=(...e)=>i.logout&&i.logout(...e)),class:"logout-button"},"Logout")])}var R=n(33);const V=["innerHTML"];function _(e,t,n,s,r,a){return(0,o.uX)(),(0,o.CE)("div",{class:(0,R.C4)(["message","user"===n.message.sender?"user-message":"ai-message"])},[(0,o.Lk)("div",{class:"message-content",innerHTML:a.formattedMessage},null,8,V)],2)}n(3817);var x=n(7453),U=n(508),X={name:"ChatMessageComponent",props:{message:{type:Object,required:!0}},computed:{formattedMessage(){return"ai"===this.message.sender?(0,x.xI)(this.message.content,{highlight:function(e,t){const n=U.A.getLanguage(t)?t:"plaintext";return U.A.highlight(e,{language:n}).value}}):this.message.content}},mounted(){"ai"===this.message.sender&&this.$nextTick((()=>{this.$el.querySelectorAll("pre code").forEach((e=>{U.A.highlightElement(e)}))}))}};const $=(0,d.A)(X,[["render",_],["__scopeId","data-v-ff6a34e6"]]);var F=$,J={name:"ChatInterface",components:{ChatMessageComponent:F},data(){return{userInput:"",chatMessages:[]}},methods:{sendMessage(){if(""===this.userInput.trim())return;this.appendMessage("user",this.userInput);const e=this.userInput;this.userInput="",fetch("/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:e})}).then((e=>{const t=e.body.getReader();let n="";const s=()=>{t.read().then((({done:e,value:t})=>{if(e)return void this.appendMessage("ai",n);const o=(new TextDecoder).decode(t);n+=o,this.updateLastAiMessage(n),s()}))};s()})).catch((e=>{console.error("Error:",e)}))},appendMessage(e,t){this.chatMessages.push({sender:e,content:t})},updateLastAiMessage(e){this.chatMessages.length>0&&"ai"===this.chatMessages[this.chatMessages.length-1].sender&&(this.chatMessages[this.chatMessages.length-1].content=e)},scrollToBottom(){const e=this.$refs.chatMessages;e.scrollTop=e.scrollHeight},handleFileUpload(e){const t=e.target.files,n=new FormData;for(let s=0;s<t.length;s++)n.append("files",t[s]);fetch("/upload",{method:"POST",body:n}).then((e=>e.json())).then((e=>{alert(e.message)})).catch((e=>{console.error("Error:",e)}))},logout(){fetch("/logout").then((e=>e.json())).then((e=>{alert(e.message),this.$emit("logout")})).catch((e=>{console.error("Error:",e)}))},loadChatHistory(){fetch("/get_chat_history").then((e=>e.json())).then((e=>{e.chat_history.forEach((e=>{this.chatMessages.push(e)}))})).catch((e=>{console.error("Error:",e)}))}},mounted(){this.loadChatHistory()}};const P=(0,d.A)(J,[["render",T],["__scopeId","data-v-0a993fbd"]]);var q=P,D={name:"App",components:{Login:p,Register:k,ChatInterface:q},data(){return{currentView:"login"}},methods:{onLoginSuccess(){this.currentView="chat"},showRegister(){this.currentView="register"},showLogin(){this.currentView="login"},logout(){this.currentView="login"}}};const H=(0,d.A)(D,[["render",i]]);var W=H,N=n(5798);const B=[{path:"/login",component:p},{path:"/register",component:k},{path:"/chat",component:q}],K=(0,N.aE)({history:(0,N.LA)(),routes:B});var Q=K;(0,s.Ef)(W).use(Q).mount("#app")}},t={};function n(s){var o=t[s];if(void 0!==o)return o.exports;var r=t[s]={exports:{}};return e[s](r,r.exports,n),r.exports}n.m=e,function(){var e=[];n.O=function(t,s,o,r){if(!s){var a=1/0;for(l=0;l<e.length;l++){s=e[l][0],o=e[l][1],r=e[l][2];for(var i=!0,u=0;u<s.length;u++)(!1&r||a>=r)&&Object.keys(n.O).every((function(e){return n.O[e](s[u])}))?s.splice(u--,1):(i=!1,r<a&&(a=r));if(i){e.splice(l--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[s,o,r]}}(),function(){n.d=function(e,t){for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={524:0};n.O.j=function(t){return 0===e[t]};var t=function(t,s){var o,r,a=s[0],i=s[1],u=s[2],c=0;if(a.some((function(t){return 0!==e[t]}))){for(o in i)n.o(i,o)&&(n.m[o]=i[o]);if(u)var l=u(n)}for(t&&t(s);c<a.length;c++)r=a[c],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(l)},s=self["webpackChunkai_chat_app"]=self["webpackChunkai_chat_app"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=n.O(void 0,[504],(function(){return n(3752)}));s=n.O(s)})();
//# sourceMappingURL=app.9d6bed68.js.map