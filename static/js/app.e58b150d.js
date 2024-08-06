(function(){"use strict";var e={3570:function(e,t,o){var s=o(3751),n=o(641);const r={class:"min-h-screen bg-gray-50 flex items-center justify-center"};function i(e,t,o,i,a,l){const c=(0,n.g2)("Login"),u=(0,n.g2)("Register"),d=(0,n.g2)("ChatInterface");return(0,n.uX)(),(0,n.CE)("div",r,[(0,n.bF)(s.eB,{name:"fade",mode:"out-in"},{default:(0,n.k6)((()=>["login"===a.currentView?((0,n.uX)(),(0,n.Wv)(c,{key:0,onLoginSuccess:l.onLoginSuccess,onShowRegister:l.showRegister},null,8,["onLoginSuccess","onShowRegister"])):"register"===a.currentView?((0,n.uX)(),(0,n.Wv)(u,{key:1,onShowLogin:l.showLogin},null,8,["onShowLogin"])):((0,n.uX)(),(0,n.Wv)(d,{key:2,onLogout:l.logout},null,8,["onLogout"]))])),_:1})])}const a=e=>((0,n.Qi)("data-v-6f16e34a"),e=e(),(0,n.jt)(),e),l={class:"min-h-screen w-full flex items-center justify-center bg-airou-pattern"},c={class:"w-full max-w-4xl p-8 flex flex-col items-center"},u=a((()=>(0,n.Lk)("h1",{class:"text-4xl font-bold text-airou-brown mb-8 airou-main-title"},"Cs Airou Cat",-1))),d={class:"bg-airou-light-cream p-8 rounded-xl shadow-lg w-full max-w-md airou-bg"},h=a((()=>(0,n.Lk)("h2",{class:"text-3xl font-bold text-center mb-6 airou-title"},"Welcome back, nya~!",-1))),p=a((()=>(0,n.Lk)("i",{class:"fas fa-paw mr-2"},null,-1))),m={class:"text-center mt-4"},f=a((()=>(0,n.Lk)("div",{class:"mt-8 text-center text-airou-brown"},[(0,n.Lk)("p",{class:"mb-2 text-airou-brown"},"Purr-fect for cat lovers and chat enthusiasts!"),(0,n.Lk)("p",null,"Join our feline-friendly community today!")],-1)));function g(e,t,o,r,i,a){return(0,n.uX)(),(0,n.CE)("div",l,[(0,n.Lk)("div",c,[u,(0,n.bF)(s.eB,{name:"fade"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",d,[h,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),placeholder:"Meow-mail address",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-airou-brown rounded-full focus:outline-none focus:ring-2 focus:ring-airou-orange airou-input"},null,512),[[s.Jo,i.username]]),(0,n.bo)((0,n.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e),placeholder:"Paw-ssword",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-airou-brown rounded-full focus:outline-none focus:ring-2 focus:ring-airou-orange airou-input"},null,512),[[s.Jo,i.password]]),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.login&&a.login(...e)),class:"w-full bg-airou-yellow text-airou-brown py-2 rounded-full hover:bg-airou-orange transition duration-300 airou-button"},[p,(0,n.eW)(" Log In! ")]),(0,n.Lk)("div",m,[(0,n.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,s.D$)((t=>e.$emit("show-register")),["prevent"])),class:"text-airou-brown hover:underline airou-link"}," New to here? Join us! ")])])])),_:1}),f])])}var b={name:"LoginForm",data(){return{username:"",password:""}},methods:{login(){fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{"登录成功"===e.message?this.$emit("login-success"):alert(e.message)})).catch((e=>{console.error("Error:",e)}))}}},v=o(6262);const y=(0,v.A)(b,[["render",g],["__scopeId","data-v-6f16e34a"]]);var w=y;const x=e=>((0,n.Qi)("data-v-7b277a88"),e=e(),(0,n.jt)(),e),C={class:"min-h-screen w-full flex items-center justify-center bg-airou-pattern"},k={class:"w-full max-w-4xl p-8 flex flex-col items-center"},L=x((()=>(0,n.Lk)("h1",{class:"text-4xl font-bold text-airou-brown mb-8 airou-main-title"},"Airou Chat",-1))),E={class:"bg-airou-light-cream p-8 rounded-xl shadow-lg w-full max-w-md airou-bg"},_=x((()=>(0,n.Lk)("h2",{class:"text-3xl font-bold text-center mb-6 airou-title"},"Join the Airou Crew!",-1))),I=x((()=>(0,n.Lk)("i",{class:"fas fa-cat mr-2"},null,-1))),T={class:"text-center mt-4"},S=x((()=>(0,n.Lk)("div",{class:"mt-8 text-center text-airou-brown"},[(0,n.Lk)("p",{class:"mb-2"},"Join our purr-fect community of cat lovers!"),(0,n.Lk)("p",null,"Start your feline adventure today!")],-1)));function j(e,t,o,r,i,a){return(0,n.uX)(),(0,n.CE)("div",C,[(0,n.Lk)("div",k,[L,(0,n.bF)(s.eB,{name:"fade"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",E,[_,(0,n.bo)((0,n.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),placeholder:"Meow-mail address",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-airou-brown rounded-full focus:outline-none focus:ring-2 focus:ring-airou-orange airou-input"},null,512),[[s.Jo,i.username]]),(0,n.bo)((0,n.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e),placeholder:"Paw-ssword",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-airou-brown rounded-full focus:outline-none focus:ring-2 focus:ring-airou-orange airou-input"},null,512),[[s.Jo,i.password]]),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.register&&a.register(...e)),class:"w-full bg-airou-yellow text-airou-brown py-2 rounded-full hover:bg-airou-orange transition duration-300 airou-button"},[I,(0,n.eW)(" Create your Account! ")]),(0,n.Lk)("div",T,[(0,n.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,s.D$)((t=>e.$emit("show-login")),["prevent"])),class:"text-airou-brown hover:underline airou-link"}," Already have an account? Log in! ")])])])),_:1}),S])])}var $={name:"RegisterForm",data(){return{username:"",password:""}},methods:{register(){fetch("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{alert(e.message),"注册成功"===e.message&&this.$emit("show-login")})).catch((e=>{console.error("Error:",e)}))}}};const P=(0,v.A)($,[["render",j],["__scopeId","data-v-7b277a88"]]);var A=P,M=o(33);const J=e=>((0,n.Qi)("data-v-71430cbc"),e=e(),(0,n.jt)(),e),B={class:"flex h-screen w-screen bg-airou-cream"},O={class:"w-64 bg-airou-light-brown border-r border-airou-brown flex flex-col rounded-r-xl shadow-lg"},F={class:"p-4"},W=J((()=>(0,n.Lk)("i",{class:"fas fa-paw mr-2"},null,-1))),X={class:"flex-1 overflow-y-auto"},Q=["onClick","disabled"],R={class:"flex items-center flex-grow"},N=J((()=>(0,n.Lk)("i",{class:"fas fa-paw mr-3"},null,-1))),z={class:"text-sm"},U=["onClick"],V=J((()=>(0,n.Lk)("i",{class:"fas fa-times"},null,-1))),q=[V],H={class:"p-4 border-t border-airou-brown flex items-center justify-between"},D=J((()=>(0,n.Lk)("i",{class:"fas fa-cat mr-2"},null,-1))),K=J((()=>(0,n.Lk)("i",{class:"fas fa-chevron-left"},null,-1))),G=[K],Y={class:"flex-1 flex flex-col"},Z={class:"flex-1 overflow-y-auto px-4 pb-2 bg-airou-light-cream",ref:"chatMessages"},ee={class:"max-w-4xl mx-auto"},te={class:"px-4 pb-4 bg-airou-light-cream"},oe={class:"max-w-4xl mx-auto"},se={class:"flex items-center bg-white rounded-full shadow-lg"},ne=J((()=>(0,n.Lk)("i",{class:"fas fa-bars"},null,-1))),re=[ne],ie={class:"flex items-center pr-2"},ae=J((()=>(0,n.Lk)("i",{class:"fas fa-paper-plane"},null,-1))),le=[ae],ce=J((()=>(0,n.Lk)("i",{class:"fas fa-paperclip"},null,-1))),ue=[ce],de=J((()=>(0,n.Lk)("div",{class:"text-xs text-airou-brown mt-2 text-center"}," Airou may produce unexpected purrs. Use with caution! ",-1))),he={key:0,class:"fixed inset-0 bg-airou-brown bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"},pe={class:"bg-airou-light-cream p-5 rounded-xl shadow-xl w-1/3"},me={class:"flex justify-between items-center mb-4"},fe=J((()=>(0,n.Lk)("h2",{class:"text-xl font-bold text-airou-brown"},"Paw-settings",-1))),ge=J((()=>(0,n.Lk)("i",{class:"fas fa-times"},null,-1))),be=[ge],ve={class:"space-y-4"},ye=J((()=>(0,n.Lk)("i",{class:"fas fa-paw mr-2"},null,-1))),we=J((()=>(0,n.Lk)("i",{class:"fas fa-fish mr-2"},null,-1))),xe=J((()=>(0,n.Lk)("i",{class:"fas fa-paw mr-2"},null,-1))),Ce=J((()=>(0,n.Lk)("i",{class:"fas fa-fish mr-2"},null,-1))),ke=J((()=>(0,n.Lk)("i",{class:"fas fa-cat mr-2"},null,-1)));function Le(e,t,o,r,i,a){const l=(0,n.g2)("ChatMessageComponent"),c=(0,n.g2)("PythonInterpreter"),u=(0,n.g2)("CCompiler"),d=(0,n.g2)("CppCompiler"),h=(0,n.g2)("JavaCompiler");return(0,n.uX)(),(0,n.CE)("div",B,[(0,n.bF)(s.eB,{name:"slide-fade-show"},{default:(0,n.k6)((()=>[(0,n.bo)((0,n.Lk)("div",O,[(0,n.Lk)("div",F,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.newConversation&&a.newConversation(...e)),class:"w-full bg-airou-yellow text-airou-brown py-2 px-4 rounded-full hover:bg-airou-orange transition duration-300 flex items-center justify-center airou-button"},[W,(0,n.eW)(" New Chat ")])]),(0,n.Lk)("div",X,[(0,n.bF)(s.F,{name:"conversation",tag:"div"},{default:(0,n.k6)((()=>[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(i.conversations,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{key:e.history_num,class:(0,M.C4)(["p-3 hover:bg-airou-light-green cursor-pointer transition duration-300 flex items-center justify-between mb-2 mx-2 rounded-xl conversation-item",{"bg-airou-brown text-white":i.currentConversationIndex===e.history_num}]),onClick:t=>a.switchConversation(e.history_num),disabled:i.isLoading,style:(0,M.Tr)({"--i":t})},[(0,n.Lk)("div",R,[N,(0,n.Lk)("span",z,(0,M.v_)(e.title||"New Chat"),1)]),(0,n.Lk)("button",{onClick:(0,s.D$)((t=>a.deleteConversation(e.history_num)),["stop"]),class:"text-red-400 hover:text-red-600"},q,8,U)],14,Q)))),128))])),_:1})]),(0,n.Lk)("div",H,[(0,n.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>a.openSettings&&a.openSettings(...e)),class:"text-left py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center text-sm airou-button"},[D,(0,n.eW)(" Settings ")]),(0,n.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.toggleSidebar&&a.toggleSidebar(...e)),class:"p-2 rounded-full hover:bg-airou-yellow transition duration-300"},G)])],512),[[s.aG,i.showSidebar]])])),_:1}),(0,n.Lk)("div",Y,[(0,n.Lk)("div",Z,[(0,n.Lk)("div",ee,[(0,n.bF)(s.F,{name:"message-fade",tag:"div"},{default:(0,n.k6)((()=>[((0,n.uX)(!0),(0,n.CE)(n.FK,null,(0,n.pI)(i.messages,((e,t)=>((0,n.uX)(),(0,n.CE)("div",{key:t,class:"mb-6"},[(0,n.bF)(l,{message:e},null,8,["message"])])))),128))])),_:1})])],512),(0,n.Lk)("div",te,[(0,n.Lk)("div",oe,[(0,n.Lk)("div",se,[i.showSidebar?(0,n.Q3)("",!0):((0,n.uX)(),(0,n.CE)("button",{key:0,onClick:t[3]||(t[3]=(...e)=>a.toggleSidebar&&a.toggleSidebar(...e)),class:"p-2 text-airou-brown hover:text-airou-orange rounded-full"},re)),(0,n.bo)((0,n.Lk)("textarea",{"onUpdate:modelValue":t[4]||(t[4]=e=>i.userInput=e),onKeyup:t[5]||(t[5]=(0,s.jR)(((...e)=>a.sendMessage&&a.sendMessage(...e)),["enter"])),placeholder:"Type your thoughts...",class:"flex-1 px-4 py-3 focus:outline-none resize-none bg-transparent",rows:"1"},null,544),[[s.Jo,i.userInput]]),(0,n.Lk)("div",ie,[(0,n.Lk)("button",{onClick:t[6]||(t[6]=(...e)=>a.sendMessage&&a.sendMessage(...e)),class:"p-2 text-airou-brown hover:text-airou-orange rounded-full"},le),(0,n.Lk)("input",{type:"file",ref:"fileInput",onChange:t[7]||(t[7]=(...e)=>a.handleFileUpload&&a.handleFileUpload(...e)),multiple:"",style:{display:"none"}},null,544),(0,n.Lk)("button",{onClick:t[8]||(t[8]=t=>e.$refs.fileInput.click()),class:"p-2 text-airou-brown hover:text-airou-orange rounded-full"},ue)])]),de])])]),i.showSettings?((0,n.uX)(),(0,n.CE)("div",he,[(0,n.Lk)("div",pe,[(0,n.Lk)("div",me,[fe,(0,n.Lk)("button",{onClick:t[9]||(t[9]=(...e)=>a.closeSettings&&a.closeSettings(...e)),class:"text-airou-brown hover:text-airou-orange"},be)]),(0,n.Lk)("div",ve,[(0,n.Lk)("button",{onClick:t[10]||(t[10]=(...e)=>a.logout&&a.logout(...e)),class:"w-full bg-airou-pink text-airou-brown py-2 px-4 rounded-full hover:bg-airou-orange transition duration-300 flex items-center justify-center airou-button"},[ye,(0,n.eW)(" Log out ")]),(0,n.Lk)("button",{onClick:t[11]||(t[11]=(...e)=>a.runPythonInterpreter&&a.runPythonInterpreter(...e)),class:"w-full bg-airou-light-green text-airou-brown py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center justify-center airou-button"},[we,(0,n.eW)(" Python Interpreter ")]),(0,n.Lk)("button",{onClick:t[12]||(t[12]=e=>i.showCCompiler=!0),class:"w-full bg-airou-light-blue text-airou-brown py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center justify-center airou-button"},[xe,(0,n.eW)(" C Compiler ")]),(0,n.Lk)("button",{onClick:t[13]||(t[13]=e=>i.showCppCompiler=!0),class:"w-full bg-airou-orange text-airou-brown py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center justify-center airou-button"},[Ce,(0,n.eW)(" C++ Compiler ")]),(0,n.Lk)("button",{onClick:t[14]||(t[14]=e=>i.showJavaCompiler=!0),class:"w-full bg-airou-yellow text-airou-brown py-2 px-4 rounded-full hover:bg-airou-orange transition duration-300 flex items-center justify-center airou-button"},[ke,(0,n.eW)(" Java Compiler ")])])])])):(0,n.Q3)("",!0),(0,n.bF)(c,{show:i.showPythonInterpreter,onClose:a.closePythonInterpreter,ref:"pythonInterpreter"},null,8,["show","onClose"]),(0,n.bF)(u,{visible:i.showCCompiler,onClose:t[15]||(t[15]=e=>i.showCCompiler=!1),ref:"cCompiler"},null,8,["visible"]),(0,n.bF)(d,{visible:i.showCppCompiler,onClose:t[16]||(t[16]=e=>i.showCppCompiler=!1),ref:"cppCompiler"},null,8,["visible"]),(0,n.bF)(h,{visible:i.showJavaCompiler,onClose:t[17]||(t[17]=e=>i.showJavaCompiler=!1),ref:"javaCompiler"},null,8,["visible"])])}var Ee=o(2053),_e=o.p+"static/img/cat.e32955f4.png";const Ie={class:"mb-6"},Te={key:0,src:_e,alt:"AI Avatar",class:"ai-avatar"},Se=["innerHTML"];function je(e,t,o,r,i,a){return(0,n.uX)(),(0,n.CE)("div",Ie,[(0,n.bF)(s.eB,{name:"message-pop"},{default:(0,n.k6)((()=>[(0,n.Lk)("div",{class:(0,M.C4)(["flex",{"justify-end":"user"===o.message.sender}])},["ai"===o.message.sender?((0,n.uX)(),(0,n.CE)("img",Te)):(0,n.Q3)("",!0),(0,n.Lk)("div",{class:(0,M.C4)(["message-bubble",a.messageClass])},[(0,n.Lk)("div",{class:"message-content",innerHTML:a.formattedMessage},null,8,Se)],2)],2)])),_:1})])}o(2838);var $e=o(7453),Pe=o(508),Ae=o(8716),Me=o.n(Ae),Je={name:"ChatMessageComponent",props:{message:{type:Object,required:!0}},setup(){const e=(0,n.WQ)("runPythonCode"),t=(0,n.WQ)("setCCode"),o=(0,n.WQ)("setCppCode"),s=(0,n.WQ)("setJavaCode");return{runPythonCode:e,setCCode:t,setCppCode:o,setJavaCode:s}},computed:{formattedMessage(){return"ai"===this.message.sender?($e.xI.setOptions({highlight:function(e,t){return t&&Pe.A.getLanguage(t)?Pe.A.highlight(t,e).value:Pe.A.highlightAuto(e).value},langPrefix:"hljs language-"}),(0,$e.xI)(this.message.content)):this.message.content},messageClass(){return"user"===this.message.sender?"user-message":"ai-message"}},mounted(){this.$nextTick((()=>{this.highlightCodeBlocks()}))},updated(){this.$nextTick((()=>{this.highlightCodeBlocks()}))},methods:{highlightCodeBlocks(){this.$el.querySelectorAll("pre code").forEach((e=>{Pe.A.highlightElement(e),this.addCodeToolbar(e)})),new(Me())(".copy-btn",{target:function(e){return e.parentNode.parentNode.querySelector("code")}}),this.$el.querySelectorAll(".run-btn").forEach((e=>{e.addEventListener("click",(()=>{const t=e.parentNode.parentNode.querySelector("code"),o=t.innerText,s=t.classList[0].split("-")[1];"python"===s?this.runPythonCode(o):"c"===s?this.setCCode(o):"cpp"===s?this.setCppCode(o):"java"===s&&this.setJavaCode(o)}))}))},addCodeToolbar(e){const t=e.parentNode,o=e.classList[0].split("-")[1],s=document.createElement("div");s.className="code-toolbar";const n=document.createElement("span");n.className="lang-tag",n.textContent=o,s.appendChild(n);const r=document.createElement("button");if(r.className="copy-btn",r.textContent="Copy",s.appendChild(r),"python"===o||"c"===o||"java"===o||"cpp"===o){const e=document.createElement("button");e.className="run-btn",e.textContent="Run",s.appendChild(e)}t.insertBefore(s,t.firstChild),t.style.paddingTop="30px"}}};const Be=(0,v.A)(Je,[["render",je],["__scopeId","data-v-78432350"]]);var Oe=Be;const Fe={key:0,class:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"},We={class:"bg-white p-5 rounded-lg shadow-xl w-3/4 h-3/4 flex flex-col"},Xe={class:"flex justify-between items-center mb-4"},Qe=(0,n.Lk)("h2",{class:"text-xl font-bold"},"Python Interpreter",-1),Re=(0,n.Lk)("i",{class:"fas fa-times"},null,-1),Ne=[Re],ze=(0,n.Lk)("div",{id:"python-terminal",class:"flex-grow bg-black text-white p-4 rounded overflow-auto"},null,-1);function Ue(e,t,o,s,r,i){return o.show?((0,n.uX)(),(0,n.CE)("div",Fe,[(0,n.Lk)("div",We,[(0,n.Lk)("div",Xe,[Qe,(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>i.close&&i.close(...e)),class:"text-gray-500 hover:text-gray-700"},Ne)]),ze])])):(0,n.Q3)("",!0)}var Ve={name:"PythonInterpreter",props:{show:{type:Boolean,required:!0}},data(){return{pyodide:null,initialized:!1,codeBuffer:"",isMultiline:!1,indentLevel:0}},methods:{close(){this.$emit("close")},async loadPyodide(){if(!this.pyodide){const e=document.getElementById("python-terminal");e.innerHTML+="Loading Pyodide...<br>",this.pyodide=await loadPyodide(),this.loadTerminalPrompt()}},async runPythonInterpreter(){await this.$nextTick(),this.pyodide||await this.loadPyodide(),this.loadTerminalPrompt(),this.createInputElement()},loadTerminalPrompt(){const e=document.getElementById("python-terminal");e.innerHTML="Python 3.9.5 (default, May 3 2021, 19:12:05)<br>",e.innerHTML+="[Pyodide] on WebAssembly/JavaScript<br>",e.innerHTML+='Type "help", "copyright", "credits" or "license" for more information.<br>'},createInputElement(){const e=document.getElementById("python-terminal"),t=document.createElement("span");t.textContent=this.isMultiline?"... ":">>> ",e.appendChild(t);const o=document.createElement("input");o.type="text",o.style.background="transparent",o.style.border="none",o.style.outline="none",o.style.color="white",o.style.width="95%",e.appendChild(o),o.focus(),o.addEventListener("keydown",(async s=>{if("Enter"===s.key){const s=o.value;e.removeChild(o),e.removeChild(t),e.innerHTML+=`${t.textContent}${s}<br>`,await this.handleCommand(s)}else if("Tab"===s.key){s.preventDefault();const e=o.selectionStart,t=o.selectionEnd;o.value=o.value.substring(0,e)+"    "+o.value.substring(t),o.selectionStart=o.selectionEnd=e+4}}))},async handleCommand(e){if(""===e.trim()&&this.isMultiline)await this.runPythonCommand(this.codeBuffer),this.isMultiline=!1,this.indentLevel=0,this.codeBuffer="";else if(""===e.trim())return void this.createInputElement();this.isMultiline?(this.codeBuffer+="    ".repeat(this.indentLevel)+e+"\n",e.trim().endsWith(":")?this.indentLevel++:("return"===e.trim()||e.trim().startsWith("break")||e.trim().startsWith("continue"))&&(this.indentLevel=Math.max(0,this.indentLevel-1))):e.trim().endsWith(":")?(this.isMultiline=!0,this.indentLevel=1,this.codeBuffer=e+"\n"):await this.runPythonCommand(e),this.createInputElement()},async runPythonCommand(e){const t=document.getElementById("python-terminal");try{const o=this.processIndentation(e),s=await this.pyodide.runPythonAsync(`\n      import sys\n      from io import StringIO\n      \n      def custom_repr(obj):\n          if isinstance(obj, type):\n              return obj.__name__\n          return repr(obj)\n      \n      old_stdout = sys.stdout\n      sys.stdout = mystdout = StringIO()\n      try:\n          try:\n              result = eval(${JSON.stringify(o)}, globals())\n              if result is not None:\n                  print(custom_repr(result))\n          except SyntaxError:\n              exec(${JSON.stringify(o)}, globals())\n      except Exception as e:\n          print(str(e))\n      sys.stdout = old_stdout\n      mystdout.getvalue()\n    `);void 0!==s&&""!==s.trim()&&(t.innerHTML+=s+"<br>")}catch(o){t.innerHTML+=o.toString()+"<br>"}},processIndentation(e){return e.replace(/\t/g,"    ")},async runCode(e){this.pyodide||await this.loadPyodide(),await this.runPythonCommand(e),this.createInputElement()}},mounted(){this.runPythonInterpreter()}};const qe=(0,v.A)(Ve,[["render",Ue]]);var He=qe;const De=e=>((0,n.Qi)("data-v-8a69ab62"),e=e(),(0,n.jt)(),e),Ke={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},Ge={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},Ye=De((()=>(0,n.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),Ze=[Ye],et=De((()=>(0,n.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"C Compiler",-1))),tt={class:"mb-4 relative"},ot=De((()=>(0,n.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),st=De((()=>(0,n.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),nt={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},rt=De((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),it={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},at={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},lt=De((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),ct={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function ut(e,t,o,r,i,a){return o.visible?((0,n.uX)(),(0,n.CE)("div",Ke,[(0,n.Lk)("div",Ge,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},Ze),et,(0,n.Lk)("div",tt,[ot,(0,n.bo)((0,n.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>i.code=e),onKeydown:t[2]||(t[2]=(...e)=>a.handleTab&&a.handleTab(...e)),placeholder:"Enter your C code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[s.Jo,i.code]])]),(0,n.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>a.compileAndRun&&a.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[st,(0,n.eW)(" Compile and Run ")]),i.output?((0,n.uX)(),(0,n.CE)("div",nt,[rt,(0,n.Lk)("pre",it,(0,M.v_)(i.output),1)])):(0,n.Q3)("",!0),i.error?((0,n.uX)(),(0,n.CE)("div",at,[lt,(0,n.Lk)("pre",ct,(0,M.v_)(i.error),1)])):(0,n.Q3)("",!0)])])):(0,n.Q3)("",!0)}var dt={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await Ee.A.post("/compile_run_c",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}},setCode(e){this.code=e}}};const ht=(0,v.A)(dt,[["render",ut],["__scopeId","data-v-8a69ab62"]]);var pt=ht,mt=o(953);const ft=e=>((0,n.Qi)("data-v-a85162a2"),e=e(),(0,n.jt)(),e),gt={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},bt={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},vt=ft((()=>(0,n.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),yt=[vt],wt=ft((()=>(0,n.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"Cpp Compiler",-1))),xt={class:"mb-4 relative"},Ct=ft((()=>(0,n.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),kt=ft((()=>(0,n.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),Lt={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},Et=ft((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),_t={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},It={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},Tt=ft((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),St={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function jt(e,t,o,r,i,a){return o.visible?((0,n.uX)(),(0,n.CE)("div",gt,[(0,n.Lk)("div",bt,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},yt),wt,(0,n.Lk)("div",xt,[Ct,(0,n.bo)((0,n.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>i.code=e),onKeydown:t[2]||(t[2]=(...e)=>a.handleTab&&a.handleTab(...e)),placeholder:"Enter your Cpp code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[s.Jo,i.code]])]),(0,n.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>a.compileAndRun&&a.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[kt,(0,n.eW)(" Compile and Run ")]),i.output?((0,n.uX)(),(0,n.CE)("div",Lt,[Et,(0,n.Lk)("pre",_t,(0,M.v_)(i.output),1)])):(0,n.Q3)("",!0),i.error?((0,n.uX)(),(0,n.CE)("div",It,[Tt,(0,n.Lk)("pre",St,(0,M.v_)(i.error),1)])):(0,n.Q3)("",!0)])])):(0,n.Q3)("",!0)}var $t={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await Ee.A.post("/compile_run_cpp",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}},setCode(e){this.code=e}}};const Pt=(0,v.A)($t,[["render",jt],["__scopeId","data-v-a85162a2"]]);var At=Pt;const Mt=e=>((0,n.Qi)("data-v-42709198"),e=e(),(0,n.jt)(),e),Jt={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},Bt={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},Ot=Mt((()=>(0,n.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),Ft=[Ot],Wt=Mt((()=>(0,n.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"Java Compiler",-1))),Xt={class:"mb-4 relative"},Qt=Mt((()=>(0,n.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),Rt=Mt((()=>(0,n.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,n.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),Nt={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},zt=Mt((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),Ut={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},Vt={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},qt=Mt((()=>(0,n.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),Ht={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function Dt(e,t,o,r,i,a){return o.visible?((0,n.uX)(),(0,n.CE)("div",Jt,[(0,n.Lk)("div",Bt,[(0,n.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},Ft),Wt,(0,n.Lk)("div",Xt,[Qt,(0,n.bo)((0,n.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>i.code=e),onKeydown:t[2]||(t[2]=(...e)=>a.handleTab&&a.handleTab(...e)),placeholder:"Enter your Java code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[s.Jo,i.code]])]),(0,n.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>a.compileAndRun&&a.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[Rt,(0,n.eW)(" Compile and Run ")]),i.output?((0,n.uX)(),(0,n.CE)("div",Nt,[zt,(0,n.Lk)("pre",Ut,(0,M.v_)(i.output),1)])):(0,n.Q3)("",!0),i.error?((0,n.uX)(),(0,n.CE)("div",Vt,[qt,(0,n.Lk)("pre",Ht,(0,M.v_)(i.error),1)])):(0,n.Q3)("",!0)])])):(0,n.Q3)("",!0)}var Kt={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await Ee.A.post("/compile_run_java",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}},setCode(e){this.code=e}}};const Gt=(0,v.A)(Kt,[["render",Dt],["__scopeId","data-v-42709198"]]);var Yt=Gt,Zt={name:"ChatInterface",data(){return{messages:[],userInput:"",conversations:(0,mt.Kh)([]),currentConversationIndex:0,isLoading:!1,showPythonInterpreter:!1,showSidebar:!0,showSettings:!1,showCCompiler:!1,showCppCompiler:!1,showJavaCompiler:!1}},provide(){return{runPythonCode:this.runPythonCode,setCCode:this.setCCode,setCppCode:this.setCppCode,setJavaCode:this.setJavaCode}},components:{ChatMessageComponent:Oe,PythonInterpreter:He,CCompiler:pt,CppCompiler:At,JavaCompiler:Yt},mounted(){this.loadConversations(),this.scrollToBottom()},methods:{async sendMessage(){if(""===this.userInput.trim())return;const e={sender:"user",content:this.userInput};this.messages.push(e),this.userInput="",this.scrollToBottom(),this.isLoading=!0;try{const t=await fetch("/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:e.content})}),o=t.body.getReader(),s=new TextDecoder("utf-8");let n="";while(1){const{done:e,value:t}=await o.read();if(e)break;const r=s.decode(t);n+=r,this.updateLastAIMessage(n),this.forceUpdateMessages()}await this.updateConversationTitle(),this.scrollToBottom(),this.forceUpdateMessages()}catch(t){console.error("Error:",t)}finally{this.isLoading=!1}},async updateConversationTitle(){try{const e=await fetch("/update_conversation_title",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({history_num:this.currentConversationIndex})}),t=await e.json(),{history_num:o,new_title:s}=t,n=this.conversations.findIndex((e=>e.history_num===o));-1!==n&&(this.conversations[n].title=s),console.log("now coversation",this.conversations[n]),console.log("now title",this.conversations[n].title),console.log("new title",this.conversations[n].title),this.$forceUpdate()}catch(e){console.error("Error updating conversation title:",e)}},updateLastAIMessage(e){const t=this.messages[this.messages.length-1];"ai"===t.sender?t.content=e:this.messages.push({sender:"ai",content:e}),this.$nextTick((()=>{this.highlightCodeBlocks()}))},scrollToBottom(){this.$nextTick((()=>{const e=this.$refs.chatMessages;e.scrollTop=e.scrollHeight}))},logout(){Ee.A.get("/logout").then((()=>{this.$emit("logout")})).catch((e=>{console.error("Logout error:",e)}))},async loadConversations(){try{const e=await Ee.A.get("/get_conversations"),t=e.data.conversations.map((e=>({history_num:e.history_num,title:e.name||"New Chat"})));this.conversations=t,this.conversations.length>0?this.conversations.some((e=>e.history_num===this.currentConversationIndex))?await this.switchConversation(this.currentConversationIndex):await this.switchConversation(this.conversations[0].history_num):(this.messages=[],this.currentConversationIndex=null)}catch(e){console.error("Error loading conversations:",e)}},async newConversation(){try{const e=await Ee.A.post("/new_conversation");this.conversations.push({history_num:e.data.history_num,title:""}),console.log("num count",e.data.history_num),this.switchConversation(e.data.history_num)}catch(e){console.error("Error creating new conversation:",e)}},async switchConversation(e){if(!(this.currentConversationIndex===e&&this.messages.length>0)){this.currentConversationIndex=e,this.isLoading=!0;try{const t=await Ee.A.post("/switch_conversation",{history_num:e});t.data.chat_history?this.messages=t.data.chat_history.map((e=>({sender:"HumanMessage"===e.type?"user":"ai",content:e.content}))):this.messages=[],this.$nextTick((()=>{this.scrollToBottom(),this.forceUpdateMessages()}))}catch(t){console.error("Error switching conversation:",t)}finally{this.isLoading=!1}}},forceUpdateMessages(){this.messages=this.messages.map((e=>({...e})))},async handleFileUpload(){const e=this.$refs.fileInput.files;if(0===e.length)return;const t=new FormData;for(let s=0;s<e.length;s++)t.append("files",e[s]);try{const e=await Ee.A.post("/upload",t,{headers:{"Content-Type":"multipart/form-data"}});console.log(e.data.message),this.messages.push({sender:"system",content:"Files uploaded successfully"})}catch(o){console.error("Error uploading files:",o),this.messages.push({sender:"system",content:"File upload failed"})}},async deleteConversation(e){try{await Ee.A.post("/delete_conversation",{history_num:e});const t=this.conversations.findIndex((t=>t.history_num===e));this.conversations.splice(t,1),this.loadConversations(),console.log("conversations length",this.conversations.length),console.log("delete num",e),e===this.currentConversationIndex?this.conversations.length>0?0===e?(this.currentConversationIndex=-1,await this.switchConversation(e),console.log("deleteConversation hit case 1")):e===this.conversations.length?(await this.switchConversation(e-1),console.log("deleteConversation hit case 2")):(this.currentConversationIndex=-1,await this.switchConversation(e),console.log("deleteConversation hit case 3")):(this.messages=[],this.currentConversationIndex=-1):this.switchConversation(this.currentConversationIndex-1)}catch(t){console.error("Error deleting conversation:",t)}},toggleSidebar(){this.showSidebar?this.showSidebar=!1:this.$nextTick((()=>{this.showSidebar=!0}))},openSettings(){this.showSettings=!0},closeSettings(){this.showSettings=!1},runPythonInterpreter(){this.showPythonInterpreter=!0,this.$nextTick((()=>{this.$refs.pythonInterpreter.runPythonInterpreter()}))},runPythonCode(e){this.showPythonInterpreter=!0,this.$nextTick((()=>{this.$refs.pythonInterpreter.runCode(e)}))},closePythonInterpreter(){this.showPythonInterpreter=!1},setCCode(e){this.showCCompiler=!0,this.$nextTick((()=>{this.$refs.cCompiler.setCode(e)}))},setCppCode(e){this.showCppCompiler=!0,this.$nextTick((()=>{this.$refs.cppCompiler.setCode(e)}))},setJavaCode(e){this.showJavaCompiler=!0,this.$nextTick((()=>{this.$refs.javaCompiler.setCode(e)}))}}};const eo=(0,v.A)(Zt,[["render",Le],["__scopeId","data-v-71430cbc"]]);var to=eo,oo={name:"App",components:{Login:w,Register:A,ChatInterface:to},data(){return{currentView:"login"}},methods:{onLoginSuccess(){this.currentView="chat"},showRegister(){this.currentView="register"},showLogin(){this.currentView="login"},logout(){this.currentView="login"}}};const so=(0,v.A)(oo,[["render",i]]);var no=so,ro=o(5798);const io=[{path:"/login",component:w},{path:"/register",component:A},{path:"/chat",component:to}],ao=(0,ro.aE)({history:(0,ro.LA)(),routes:io});var lo=ao;(0,s.Ef)(no).use(lo).mount("#app")}},t={};function o(s){var n=t[s];if(void 0!==n)return n.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,s,n,r){if(!s){var i=1/0;for(u=0;u<e.length;u++){s=e[u][0],n=e[u][1],r=e[u][2];for(var a=!0,l=0;l<s.length;l++)(!1&r||i>=r)&&Object.keys(o.O).every((function(e){return o.O[e](s[l])}))?s.splice(l--,1):(a=!1,r<i&&(i=r));if(a){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[s,n,r]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var s in t)o.o(t,s)&&!o.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/"}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,s){var n,r,i=s[0],a=s[1],l=s[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(n in a)o.o(a,n)&&(o.m[n]=a[n]);if(l)var u=l(o)}for(t&&t(s);c<i.length;c++)r=i[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(u)},s=self["webpackChunkai_chat_app"]=self["webpackChunkai_chat_app"]||[];s.forEach(t.bind(null,0)),s.push=t.bind(null,s.push.bind(s))}();var s=o.O(void 0,[504],(function(){return o(3570)}));s=o.O(s)})();
//# sourceMappingURL=app.e58b150d.js.map