(function(){"use strict";var e={7154:function(e,t,o){var n=o(3751),s=o(641);const r={class:"min-h-screen bg-gray-50 flex items-center justify-center"};function i(e,t,o,i,a,l){const c=(0,s.g2)("Login"),d=(0,s.g2)("Register"),u=(0,s.g2)("ChatInterface");return(0,s.uX)(),(0,s.CE)("div",r,[(0,s.bF)(n.eB,{name:"fade",mode:"out-in"},{default:(0,s.k6)((()=>["login"===a.currentView?((0,s.uX)(),(0,s.Wv)(c,{key:0,onLoginSuccess:l.onLoginSuccess,onShowRegister:l.showRegister},null,8,["onLoginSuccess","onShowRegister"])):"register"===a.currentView?((0,s.uX)(),(0,s.Wv)(d,{key:1,onShowLogin:l.showLogin},null,8,["onShowLogin"])):((0,s.uX)(),(0,s.Wv)(u,{key:2,onLogout:l.logout},null,8,["onLogout"]))])),_:1})])}const a=e=>((0,s.Qi)("data-v-c8240ab8"),e=e(),(0,s.jt)(),e),l={class:"bg-white p-8 rounded-lg shadow-md w-full max-w-md anime-bg"},c=a((()=>(0,s.Lk)("h1",{class:"text-3xl font-bold text-center mb-6 anime-title"},"Welcome back!",-1))),d={class:"text-center mt-4"};function u(e,t,o,r,i,a){return(0,s.uX)(),(0,s.Wv)(n.eB,{name:"fade"},{default:(0,s.k6)((()=>[(0,s.Lk)("div",l,[c,(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),placeholder:"Email address",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 anime-input"},null,512),[[n.Jo,i.username]]),(0,s.bo)((0,s.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e),placeholder:"Password",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 anime-input"},null,512),[[n.Jo,i.password]]),(0,s.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.login&&a.login(...e)),class:"w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition duration-300 anime-button"}," Log in "),(0,s.Lk)("div",d,[(0,s.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,n.D$)((t=>e.$emit("show-register")),["prevent"])),class:"text-pink-600 hover:underline anime-link"}," New to here? Join us! ")])])])),_:1})}var h={name:"LoginForm",data(){return{username:"",password:""}},methods:{login(){fetch("/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{"登录成功"===e.message?this.$emit("login-success"):alert(e.message)})).catch((e=>{console.error("Error:",e)}))}}},p=o(6262);const m=(0,p.A)(h,[["render",u],["__scopeId","data-v-c8240ab8"]]);var g=m;const f=e=>((0,s.Qi)("data-v-071e7494"),e=e(),(0,s.jt)(),e),b={class:"bg-white p-8 rounded-lg shadow-md w-full max-w-md anime-bg"},v=f((()=>(0,s.Lk)("h1",{class:"text-3xl font-bold text-center mb-6 anime-title"},"Create your account!",-1))),y={class:"text-center mt-4"};function w(e,t,o,r,i,a){return(0,s.uX)(),(0,s.Wv)(n.eB,{name:"fade"},{default:(0,s.k6)((()=>[(0,s.Lk)("div",b,[v,(0,s.bo)((0,s.Lk)("input",{type:"text","onUpdate:modelValue":t[0]||(t[0]=e=>i.username=e),placeholder:"Email address",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 anime-input"},null,512),[[n.Jo,i.username]]),(0,s.bo)((0,s.Lk)("input",{type:"password","onUpdate:modelValue":t[1]||(t[1]=e=>i.password=e),placeholder:"Password",required:"",class:"w-full px-4 py-2 mb-4 border-2 border-purple-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 anime-input"},null,512),[[n.Jo,i.password]]),(0,s.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.register&&a.register(...e)),class:"w-full bg-purple-500 text-white py-2 rounded-full hover:bg-purple-600 transition duration-300 anime-button"}," Sign up "),(0,s.Lk)("div",y,[(0,s.Lk)("a",{href:"#",onClick:t[3]||(t[3]=(0,n.D$)((t=>e.$emit("show-login")),["prevent"])),class:"text-purple-600 hover:underline anime-link"}," Already part of our crew? Log in! ")])])])),_:1})}var x={name:"RegisterForm",data(){return{username:"",password:""}},methods:{register(){fetch("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.username,password:this.password})}).then((e=>e.json())).then((e=>{alert(e.message),"注册成功"===e.message&&this.$emit("show-login")})).catch((e=>{console.error("Error:",e)}))}}};const k=(0,p.A)(x,[["render",w],["__scopeId","data-v-071e7494"]]);var C=k,L=o(33);const E=e=>((0,s.Qi)("data-v-629d63de"),e=e(),(0,s.jt)(),e),I={class:"flex h-screen w-screen bg-airou-cream"},_={class:"w-1/5 bg-airou-light-brown border-r border-airou-brown flex flex-col rounded-r-xl shadow-lg"},S={class:"p-4"},T=E((()=>(0,s.Lk)("i",{class:"fas fa-paw mr-2"},null,-1))),P={class:"flex-1 overflow-y-auto"},M=["onClick","disabled"],j={class:"flex items-center flex-grow"},$=E((()=>(0,s.Lk)("i",{class:"fas fa-paw mr-3"},null,-1))),A={class:"text-sm"},B=["onClick"],O=E((()=>(0,s.Lk)("i",{class:"fas fa-times"},null,-1))),J=[O],X={class:"p-4 border-t border-airou-brown flex items-center justify-between"},W=E((()=>(0,s.Lk)("i",{class:"fas fa-cat mr-2"},null,-1))),F=E((()=>(0,s.Lk)("i",{class:"fas fa-chevron-left"},null,-1))),R=[F],Q={class:"flex-1 overflow-y-auto px-4 py-6 bg-airou-light-cream",ref:"chatMessages"},N={class:"border-t border-airou-brown p-4 bg-airou-light-brown"},z={class:"flex items-center bg-white rounded-full shadow-md"},U=E((()=>(0,s.Lk)("i",{class:"fas fa-paw"},null,-1))),V=[U],q=E((()=>(0,s.Lk)("i",{class:"fas fa-paper-plane"},null,-1))),H=[q],D=E((()=>(0,s.Lk)("i",{class:"fas fa-paperclip"},null,-1))),K=[D],G=E((()=>(0,s.Lk)("div",{class:"text-xs text-airou-brown mt-2 text-center"}," Airou may produce unexpected purrs. Use with caution! ",-1))),Y={key:0,class:"fixed inset-0 bg-airou-brown bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"},Z={class:"bg-airou-light-cream p-5 rounded-xl shadow-xl w-1/3"},ee={class:"flex justify-between items-center mb-4"},te=E((()=>(0,s.Lk)("h2",{class:"text-xl font-bold text-airou-brown"},"Paw-settings",-1))),oe=E((()=>(0,s.Lk)("i",{class:"fas fa-times"},null,-1))),ne=[oe],se={class:"space-y-4"},re=E((()=>(0,s.Lk)("i",{class:"fas fa-paw mr-2"},null,-1))),ie=E((()=>(0,s.Lk)("i",{class:"fas fa-fish mr-2"},null,-1))),ae=E((()=>(0,s.Lk)("i",{class:"fas fa-paw mr-2"},null,-1))),le=E((()=>(0,s.Lk)("i",{class:"fas fa-fish mr-2"},null,-1))),ce=E((()=>(0,s.Lk)("i",{class:"fas fa-cat mr-2"},null,-1)));function de(e,t,o,r,i,a){const l=(0,s.g2)("ChatMessageComponent"),c=(0,s.g2)("PythonInterpreter"),d=(0,s.g2)("CCompiler"),u=(0,s.g2)("CppCompiler"),h=(0,s.g2)("JavaCompiler");return(0,s.uX)(),(0,s.CE)("div",I,[(0,s.bF)(n.eB,{name:"slide-fade-show"},{default:(0,s.k6)((()=>[(0,s.bo)((0,s.Lk)("div",_,[(0,s.Lk)("div",S,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.newConversation&&a.newConversation(...e)),class:"w-full bg-airou-yellow text-airou-brown py-2 px-4 rounded-full hover:bg-airou-orange transition duration-300 flex items-center justify-center airou-button"},[T,(0,s.eW)(" New Meow-venture ")])]),(0,s.Lk)("div",P,[(0,s.bF)(n.F,{name:"conversation",tag:"div"},{default:(0,s.k6)((()=>[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(i.conversations,((e,t)=>((0,s.uX)(),(0,s.CE)("div",{key:e.history_num,class:(0,L.C4)(["p-3 hover:bg-airou-light-green cursor-pointer transition duration-300 flex items-center justify-between mb-2 mx-2 rounded-xl conversation-item",{"bg-airou-brown text-white":i.currentConversationIndex===e.history_num}]),onClick:t=>a.switchConversation(e.history_num),disabled:i.isLoading,style:(0,L.Tr)({"--i":t})},[(0,s.Lk)("div",j,[$,(0,s.Lk)("span",A,(0,L.v_)(e.title||"New Meow-venture"),1)]),(0,s.Lk)("button",{onClick:(0,n.D$)((t=>a.deleteConversation(e.history_num)),["stop"]),class:"text-red-400 hover:text-red-600"},J,8,B)],14,M)))),128))])),_:1})]),(0,s.Lk)("div",X,[(0,s.Lk)("button",{onClick:t[1]||(t[1]=(...e)=>a.openSettings&&a.openSettings(...e)),class:"text-left py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center text-sm airou-button"},[W,(0,s.eW)(" Paw-settings ")]),(0,s.Lk)("button",{onClick:t[2]||(t[2]=(...e)=>a.toggleSidebar&&a.toggleSidebar(...e)),class:"p-2 rounded-full hover:bg-airou-yellow transition duration-300"},R)])],512),[[n.aG,i.showSidebar]])])),_:1}),(0,s.Lk)("div",{class:(0,L.C4)(["flex-1 flex flex-col",{"w-full":!i.showSidebar,"w-4/5":i.showSidebar}])},[(0,s.Lk)("div",Q,[(0,s.bF)(n.F,{name:"message-fade",tag:"div"},{default:(0,s.k6)((()=>[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(i.messages,((e,t)=>((0,s.uX)(),(0,s.CE)("div",{key:t,class:"mb-6"},[(0,s.bF)(l,{message:e},null,8,["message"])])))),128))])),_:1})],512),(0,s.Lk)("div",N,[(0,s.Lk)("div",z,[i.showSidebar?(0,s.Q3)("",!0):((0,s.uX)(),(0,s.CE)("button",{key:0,onClick:t[3]||(t[3]=(...e)=>a.toggleSidebar&&a.toggleSidebar(...e)),class:(0,L.C4)(["p-2 text-airou-brown",{"transform rotate-180":!i.showSidebar}])},V,2)),(0,s.bo)((0,s.Lk)("textarea",{"onUpdate:modelValue":t[4]||(t[4]=e=>i.userInput=e),onKeyup:t[5]||(t[5]=(0,n.jR)(((...e)=>a.sendMessage&&a.sendMessage(...e)),["enter"])),placeholder:"Meow your thoughts...",class:"flex-1 px-4 py-2 focus:outline-none resize-none rounded-full",rows:"1"},null,544),[[n.Jo,i.userInput]]),(0,s.Lk)("button",{onClick:t[6]||(t[6]=(...e)=>a.sendMessage&&a.sendMessage(...e)),class:"p-2 text-airou-brown hover:text-airou-orange"},H),(0,s.Lk)("input",{type:"file",ref:"fileInput",onChange:t[7]||(t[7]=(...e)=>a.handleFileUpload&&a.handleFileUpload(...e)),multiple:"",style:{display:"none"}},null,544),(0,s.Lk)("button",{onClick:t[8]||(t[8]=t=>e.$refs.fileInput.click()),class:"p-2 text-airou-brown hover:text-airou-orange"},K)]),G])],2),i.showSettings?((0,s.uX)(),(0,s.CE)("div",Y,[(0,s.Lk)("div",Z,[(0,s.Lk)("div",ee,[te,(0,s.Lk)("button",{onClick:t[9]||(t[9]=(...e)=>a.closeSettings&&a.closeSettings(...e)),class:"text-airou-brown hover:text-airou-orange"},ne)]),(0,s.Lk)("div",se,[(0,s.Lk)("button",{onClick:t[10]||(t[10]=(...e)=>a.logout&&a.logout(...e)),class:"w-full bg-airou-pink text-airou-brown py-2 px-4 rounded-full hover:bg-airou-orange transition duration-300 flex items-center justify-center airou-button"},[re,(0,s.eW)(" Cat-ch you later ")]),(0,s.Lk)("button",{onClick:t[11]||(t[11]=(...e)=>a.runPythonInterpreter&&a.runPythonInterpreter(...e)),class:"w-full bg-airou-light-green text-airou-brown py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center justify-center airou-button"},[ie,(0,s.eW)(" Python Purr-preter ")]),(0,s.Lk)("button",{onClick:t[12]||(t[12]=e=>i.showCCompiler=!0),class:"w-full bg-airou-light-blue text-airou-brown py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center justify-center airou-button"},[ae,(0,s.eW)(" C Whisker Spells ")]),(0,s.Lk)("button",{onClick:t[13]||(t[13]=e=>i.showCppCompiler=!0),class:"w-full bg-airou-orange text-airou-brown py-2 px-4 rounded-full hover:bg-airou-yellow transition duration-300 flex items-center justify-center airou-button"},[le,(0,s.eW)(" C++ Compiler ")]),(0,s.Lk)("button",{onClick:t[14]||(t[14]=e=>i.showJavaCompiler=!0),class:"w-full bg-airou-yellow text-airou-brown py-2 px-4 rounded-full hover:bg-airou-orange transition duration-300 flex items-center justify-center airou-button"},[ce,(0,s.eW)(" Java Compiler ")])])])])):(0,s.Q3)("",!0),(0,s.bF)(c,{show:i.showPythonInterpreter,onClose:a.closePythonInterpreter,ref:"pythonInterpreter"},null,8,["show","onClose"]),(0,s.bF)(d,{visible:i.showCCompiler,onClose:t[15]||(t[15]=e=>i.showCCompiler=!1)},null,8,["visible"]),(0,s.bF)(u,{visible:i.showCppCompiler,onClose:t[16]||(t[16]=e=>i.showCppCompiler=!1)},null,8,["visible"]),(0,s.bF)(h,{visible:i.showJavaCompiler,onClose:t[17]||(t[17]=e=>i.showJavaCompiler=!1)},null,8,["visible"])])}var ue=o(2053),he=o.p+"static/img/cat.55cd9d2d.png";const pe={class:"mb-6"},me={key:0,src:he,alt:"AI Avatar",class:"ai-avatar"},ge=["innerHTML"];function fe(e,t,o,r,i,a){return(0,s.uX)(),(0,s.CE)("div",pe,[(0,s.bF)(n.eB,{name:"message-pop"},{default:(0,s.k6)((()=>[(0,s.Lk)("div",{class:(0,L.C4)(["flex",{"justify-end":"user"===o.message.sender}])},["ai"===o.message.sender?((0,s.uX)(),(0,s.CE)("img",me)):(0,s.Q3)("",!0),(0,s.Lk)("div",{class:(0,L.C4)(["max-w-2xl rounded-2xl p-4 shadow-lg message-bubble","user"===o.message.sender?"user-message":"ai-message"])},[(0,s.Lk)("div",{class:"message-content",innerHTML:a.formattedMessage},null,8,ge)],2)],2)])),_:1})])}o(2838);var be=o(7453),ve=o(508),ye=o(8716),we=o.n(ye),xe={name:"ChatMessageComponent",props:{message:{type:Object,required:!0}},setup(){const e=(0,s.WQ)("runPythonCode"),t=(0,s.WQ)("showPythonInterpreter");return{runPythonCode:e,showPythonInterpreter:t}},computed:{formattedMessage(){return"ai"===this.message.sender?(be.xI.setOptions({highlight:function(e,t){return t&&ve.A.getLanguage(t)?ve.A.highlight(t,e).value:ve.A.highlightAuto(e).value},langPrefix:"hljs language-"}),(0,be.xI)(this.message.content)):this.message.content}},mounted(){this.$nextTick((()=>{this.highlightCodeBlocks()}))},updated(){this.$nextTick((()=>{this.highlightCodeBlocks()}))},methods:{highlightCodeBlocks(){this.$el.querySelectorAll("pre code").forEach((e=>{ve.A.highlightElement(e);const t=e.parentNode,o=e.classList[0].split("-")[1],n=document.createElement("div");n.className="code-toolbar";const s=document.createElement("span");s.className="lang-tag",s.textContent=o,n.appendChild(s);const r=document.createElement("button");if(r.className="copy-btn",r.textContent="Copy",n.appendChild(r),"python"===o){const e=document.createElement("button");e.className="run-btn",e.textContent="Run",n.appendChild(e)}t.insertBefore(n,t.firstChild),t.style.paddingTop="30px"})),new(we())(".copy-btn",{target:function(e){return e.parentNode.parentNode.querySelector("code")}});const e=e=>{this.showPythonInterpreter.value=!0,this.runPythonCode(e)};this.$el.querySelectorAll(".run-btn").forEach((t=>{t.addEventListener("click",(()=>{const o=t.parentNode.parentNode.querySelector("code"),n=o.innerText;e(n)}))}))}}};const ke=(0,p.A)(xe,[["render",fe],["__scopeId","data-v-71a45e9d"]]);var Ce=ke;const Le={key:0,class:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"},Ee={class:"bg-white p-5 rounded-lg shadow-xl w-3/4 h-3/4 flex flex-col"},Ie={class:"flex justify-between items-center mb-4"},_e=(0,s.Lk)("h2",{class:"text-xl font-bold"},"Python Interpreter",-1),Se=(0,s.Lk)("i",{class:"fas fa-times"},null,-1),Te=[Se],Pe=(0,s.Lk)("div",{id:"python-terminal",class:"flex-grow bg-black text-white p-4 rounded overflow-auto"},null,-1);function Me(e,t,o,n,r,i){return o.show?((0,s.uX)(),(0,s.CE)("div",Le,[(0,s.Lk)("div",Ee,[(0,s.Lk)("div",Ie,[_e,(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>i.close&&i.close(...e)),class:"text-gray-500 hover:text-gray-700"},Te)]),Pe])])):(0,s.Q3)("",!0)}var je={name:"PythonInterpreter",props:{show:{type:Boolean,required:!0}},data(){return{pyodide:null,initialized:!1,codeBuffer:"",isMultiline:!1,indentLevel:0}},methods:{close(){this.$emit("close")},async loadPyodide(){if(!this.pyodide){const e=document.getElementById("python-terminal");e.innerHTML+="Loading Pyodide...<br>",this.pyodide=await loadPyodide(),this.loadTerminalPrompt()}},async runPythonInterpreter(){await this.$nextTick(),this.pyodide||await this.loadPyodide(),this.loadTerminalPrompt(),this.createInputElement()},loadTerminalPrompt(){const e=document.getElementById("python-terminal");e.innerHTML="Python 3.9.5 (default, May 3 2021, 19:12:05)<br>",e.innerHTML+="[Pyodide] on WebAssembly/JavaScript<br>",e.innerHTML+='Type "help", "copyright", "credits" or "license" for more information.<br>'},createInputElement(){const e=document.getElementById("python-terminal"),t=document.createElement("span");t.textContent=this.isMultiline?"... ":">>> ",e.appendChild(t);const o=document.createElement("input");o.type="text",o.style.background="transparent",o.style.border="none",o.style.outline="none",o.style.color="white",o.style.width="95%",e.appendChild(o),o.focus(),o.addEventListener("keydown",(async n=>{if("Enter"===n.key){const n=o.value;e.removeChild(o),e.removeChild(t),e.innerHTML+=`${t.textContent}${n}<br>`,await this.handleCommand(n)}else if("Tab"===n.key){n.preventDefault();const e=o.selectionStart,t=o.selectionEnd;o.value=o.value.substring(0,e)+"    "+o.value.substring(t),o.selectionStart=o.selectionEnd=e+4}}))},async handleCommand(e){if(""===e.trim()&&this.isMultiline)await this.runPythonCommand(this.codeBuffer),this.isMultiline=!1,this.indentLevel=0,this.codeBuffer="";else if(""===e.trim())return void this.createInputElement();this.isMultiline?(this.codeBuffer+="    ".repeat(this.indentLevel)+e+"\n",e.trim().endsWith(":")?this.indentLevel++:("return"===e.trim()||e.trim().startsWith("break")||e.trim().startsWith("continue"))&&(this.indentLevel=Math.max(0,this.indentLevel-1))):e.trim().endsWith(":")?(this.isMultiline=!0,this.indentLevel=1,this.codeBuffer=e+"\n"):await this.runPythonCommand(e),this.createInputElement()},async runPythonCommand(e){const t=document.getElementById("python-terminal");try{const o=this.processIndentation(e),n=await this.pyodide.runPythonAsync(`\n      import sys\n      from io import StringIO\n      \n      def custom_repr(obj):\n          if isinstance(obj, type):\n              return obj.__name__\n          return repr(obj)\n      \n      old_stdout = sys.stdout\n      sys.stdout = mystdout = StringIO()\n      try:\n          try:\n              result = eval(${JSON.stringify(o)}, globals())\n              if result is not None:\n                  print(custom_repr(result))\n          except SyntaxError:\n              exec(${JSON.stringify(o)}, globals())\n      except Exception as e:\n          print(str(e))\n      sys.stdout = old_stdout\n      mystdout.getvalue()\n    `);void 0!==n&&""!==n.trim()&&(t.innerHTML+=n+"<br>")}catch(o){t.innerHTML+=o.toString()+"<br>"}},processIndentation(e){return e.replace(/\t/g,"    ")},async runCode(e){this.pyodide||await this.loadPyodide(),await this.runPythonCommand(e),this.createInputElement()}},mounted(){this.runPythonInterpreter()}};const $e=(0,p.A)(je,[["render",Me]]);var Ae=$e;const Be=e=>((0,s.Qi)("data-v-0600662c"),e=e(),(0,s.jt)(),e),Oe={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},Je={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},Xe=Be((()=>(0,s.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),We=[Xe],Fe=Be((()=>(0,s.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"C Compiler",-1))),Re={class:"mb-4 relative"},Qe=Be((()=>(0,s.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),Ne=Be((()=>(0,s.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),ze={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},Ue=Be((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),Ve={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},qe={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},He=Be((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),De={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function Ke(e,t,o,r,i,a){return o.visible?((0,s.uX)(),(0,s.CE)("div",Oe,[(0,s.Lk)("div",Je,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},We),Fe,(0,s.Lk)("div",Re,[Qe,(0,s.bo)((0,s.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>i.code=e),onKeydown:t[2]||(t[2]=(...e)=>a.handleTab&&a.handleTab(...e)),placeholder:"Enter your C code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[n.Jo,i.code]])]),(0,s.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>a.compileAndRun&&a.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[Ne,(0,s.eW)(" Compile and Run ")]),i.output?((0,s.uX)(),(0,s.CE)("div",ze,[Ue,(0,s.Lk)("pre",Ve,(0,L.v_)(i.output),1)])):(0,s.Q3)("",!0),i.error?((0,s.uX)(),(0,s.CE)("div",qe,[He,(0,s.Lk)("pre",De,(0,L.v_)(i.error),1)])):(0,s.Q3)("",!0)])])):(0,s.Q3)("",!0)}var Ge={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await ue.A.post("/compile_run_c",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}}}};const Ye=(0,p.A)(Ge,[["render",Ke],["__scopeId","data-v-0600662c"]]);var Ze=Ye,et=o(953);const tt=e=>((0,s.Qi)("data-v-28b577d8"),e=e(),(0,s.jt)(),e),ot={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},nt={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},st=tt((()=>(0,s.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),rt=[st],it=tt((()=>(0,s.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"Cpp Compiler",-1))),at={class:"mb-4 relative"},lt=tt((()=>(0,s.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),ct=tt((()=>(0,s.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),dt={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},ut=tt((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),ht={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},pt={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},mt=tt((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),gt={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function ft(e,t,o,r,i,a){return o.visible?((0,s.uX)(),(0,s.CE)("div",ot,[(0,s.Lk)("div",nt,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},rt),it,(0,s.Lk)("div",at,[lt,(0,s.bo)((0,s.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>i.code=e),onKeydown:t[2]||(t[2]=(...e)=>a.handleTab&&a.handleTab(...e)),placeholder:"Enter your Cpp code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[n.Jo,i.code]])]),(0,s.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>a.compileAndRun&&a.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[ct,(0,s.eW)(" Compile and Run ")]),i.output?((0,s.uX)(),(0,s.CE)("div",dt,[ut,(0,s.Lk)("pre",ht,(0,L.v_)(i.output),1)])):(0,s.Q3)("",!0),i.error?((0,s.uX)(),(0,s.CE)("div",pt,[mt,(0,s.Lk)("pre",gt,(0,L.v_)(i.error),1)])):(0,s.Q3)("",!0)])])):(0,s.Q3)("",!0)}var bt={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await ue.A.post("/compile_run_cpp",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}}}};const vt=(0,p.A)(bt,[["render",ft],["__scopeId","data-v-28b577d8"]]);var yt=vt;const wt=e=>((0,s.Qi)("data-v-1eb033af"),e=e(),(0,s.jt)(),e),xt={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},kt={class:"bg-white rounded-lg shadow-xl w-11/12 max-w-4xl p-6 relative"},Ct=wt((()=>(0,s.Lk)("svg",{class:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))),Lt=[Ct],Et=wt((()=>(0,s.Lk)("h2",{class:"text-2xl font-bold mb-4 text-gray-800"},"Java Compiler",-1))),It={class:"mb-4 relative"},_t=wt((()=>(0,s.Lk)("div",{class:"code-background absolute inset-0"},null,-1))),St=wt((()=>(0,s.Lk)("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[(0,s.Lk)("path",{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"})],-1))),Tt={key:0,class:"mt-4 bg-green-100 rounded-md p-4"},Pt=wt((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-gray-800"},"Output:",-1))),Mt={class:"text-sm font-mono whitespace-pre-wrap break-words text-gray-700"},jt={key:1,class:"mt-4 bg-red-100 rounded-md p-4"},$t=wt((()=>(0,s.Lk)("h3",{class:"text-lg font-semibold mb-2 text-red-800"},"Error:",-1))),At={class:"text-sm font-mono whitespace-pre-wrap break-words text-red-700"};function Bt(e,t,o,r,i,a){return o.visible?((0,s.uX)(),(0,s.CE)("div",xt,[(0,s.Lk)("div",kt,[(0,s.Lk)("button",{onClick:t[0]||(t[0]=(...e)=>a.close&&a.close(...e)),class:"absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200","aria-label":"Close"},Lt),Et,(0,s.Lk)("div",It,[_t,(0,s.bo)((0,s.Lk)("textarea",{ref:"codeEditor","onUpdate:modelValue":t[1]||(t[1]=e=>i.code=e),onKeydown:t[2]||(t[2]=(...e)=>a.handleTab&&a.handleTab(...e)),placeholder:"Enter your Java code here",spellcheck:"false",class:"w-full h-64 p-4 text-sm font-mono bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative z-10"},null,544),[[n.Jo,i.code]])]),(0,s.Lk)("button",{onClick:t[3]||(t[3]=(...e)=>a.compileAndRun&&a.compileAndRun(...e)),class:"flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"},[St,(0,s.eW)(" Compile and Run ")]),i.output?((0,s.uX)(),(0,s.CE)("div",Tt,[Pt,(0,s.Lk)("pre",Mt,(0,L.v_)(i.output),1)])):(0,s.Q3)("",!0),i.error?((0,s.uX)(),(0,s.CE)("div",jt,[$t,(0,s.Lk)("pre",At,(0,L.v_)(i.error),1)])):(0,s.Q3)("",!0)])])):(0,s.Q3)("",!0)}var Ot={props:{visible:{type:Boolean,default:!1}},data(){return{code:"",output:"",error:""}},methods:{async compileAndRun(){try{const e=await ue.A.post("/compile_run_java",{code:this.code});e.data.output?(this.output=e.data.output,this.error=""):e.data.error&&(this.error=e.data.error,this.output="")}catch(e){this.error=e.response.data.error,this.output=""}},close(){this.$emit("close")},handleTab(e){if("Tab"===e.key){e.preventDefault();const t=this.$refs.codeEditor.selectionStart,o=this.$refs.codeEditor.selectionEnd;this.code=this.code.substring(0,t)+"    "+this.code.substring(o),this.$nextTick((()=>{this.$refs.codeEditor.selectionStart=this.$refs.codeEditor.selectionEnd=t+4}))}}}};const Jt=(0,p.A)(Ot,[["render",Bt],["__scopeId","data-v-1eb033af"]]);var Xt=Jt,Wt={name:"ChatInterface",data(){return{messages:[],userInput:"",conversations:(0,et.Kh)([]),currentConversationIndex:0,isLoading:!1,showPythonInterpreter:!1,showSidebar:!0,showSettings:!1,showCCompiler:!1,showCppCompiler:!1,showJavaCompiler:!1}},provide(){return{runPythonCode:this.runPythonCode,showPythonInterpreter:()=>this.showPythonInterpreter}},components:{ChatMessageComponent:Ce,PythonInterpreter:Ae,CCompiler:Ze,CppCompiler:yt,JavaCompiler:Xt},mounted(){this.loadConversations(),this.scrollToBottom()},methods:{async sendMessage(){if(""===this.userInput.trim())return;const e={sender:"user",content:this.userInput};this.messages.push(e),this.userInput="",this.scrollToBottom(),this.isLoading=!0;try{const t=await fetch("/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:e.content})}),o=t.body.getReader(),n=new TextDecoder("utf-8");let s="";while(1){const{done:e,value:t}=await o.read();if(e)break;const r=n.decode(t);s+=r,this.updateLastAIMessage(s),this.forceUpdateMessages()}await this.updateConversationTitle(),this.scrollToBottom(),this.forceUpdateMessages()}catch(t){console.error("Error:",t)}finally{this.isLoading=!1}},async updateConversationTitle(){try{const e=await fetch("/update_conversation_title",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({history_num:this.currentConversationIndex})}),t=await e.json(),{history_num:o,new_title:n}=t,s=this.conversations.findIndex((e=>e.history_num===o));-1!==s&&(this.conversations[s].title=n),console.log("now coversation",this.conversations[s]),console.log("now title",this.conversations[s].title),console.log("new title",this.conversations[s].title),this.$forceUpdate()}catch(e){console.error("Error updating conversation title:",e)}},updateLastAIMessage(e){const t=this.messages[this.messages.length-1];"ai"===t.sender?t.content=e:this.messages.push({sender:"ai",content:e}),this.$nextTick((()=>{this.highlightCodeBlocks()}))},scrollToBottom(){this.$nextTick((()=>{const e=this.$refs.chatMessages;e.scrollTop=e.scrollHeight}))},logout(){ue.A.get("/logout").then((()=>{this.$emit("logout")})).catch((e=>{console.error("Logout error:",e)}))},async loadConversations(){try{const e=await ue.A.get("/get_conversations"),t=e.data.conversations.map((e=>({history_num:e.history_num,title:e.name||"New Chat"})));this.conversations=t,this.conversations.length>0?this.conversations.some((e=>e.history_num===this.currentConversationIndex))?await this.switchConversation(this.currentConversationIndex):await this.switchConversation(this.conversations[0].history_num):(this.messages=[],this.currentConversationIndex=null)}catch(e){console.error("Error loading conversations:",e)}},async newConversation(){try{const e=await ue.A.post("/new_conversation");this.conversations.push({history_num:e.data.history_num,title:""}),console.log("num count",e.data.history_num),this.switchConversation(e.data.history_num)}catch(e){console.error("Error creating new conversation:",e)}},async switchConversation(e){if(!(this.currentConversationIndex===e&&this.messages.length>0)){this.currentConversationIndex=e,this.isLoading=!0;try{const t=await ue.A.post("/switch_conversation",{history_num:e});t.data.chat_history?this.messages=t.data.chat_history.map((e=>({sender:"HumanMessage"===e.type?"user":"ai",content:e.content}))):this.messages=[],this.$nextTick((()=>{this.scrollToBottom(),this.forceUpdateMessages()}))}catch(t){console.error("Error switching conversation:",t)}finally{this.isLoading=!1}}},forceUpdateMessages(){this.messages=this.messages.map((e=>({...e})))},async handleFileUpload(){const e=this.$refs.fileInput.files;if(0===e.length)return;const t=new FormData;for(let n=0;n<e.length;n++)t.append("files",e[n]);try{const e=await ue.A.post("/upload",t,{headers:{"Content-Type":"multipart/form-data"}});console.log(e.data.message),this.messages.push({sender:"system",content:"Files uploaded successfully"})}catch(o){console.error("Error uploading files:",o),this.messages.push({sender:"system",content:"File upload failed"})}},async deleteConversation(e){try{await ue.A.post("/delete_conversation",{history_num:e});const t=this.conversations.findIndex((t=>t.history_num===e));this.conversations.splice(t,1),this.loadConversations(),console.log("conversations length",this.conversations.length),console.log("delete num",e),e===this.currentConversationIndex?this.conversations.length>0?0===e?(this.currentConversationIndex=-1,await this.switchConversation(e),console.log("deleteConversation hit case 1")):e===this.conversations.length?(await this.switchConversation(e-1),console.log("deleteConversation hit case 2")):(this.currentConversationIndex=-1,await this.switchConversation(e),console.log("deleteConversation hit case 3")):(this.messages=[],this.currentConversationIndex=-1):this.switchConversation(this.currentConversationIndex-1)}catch(t){console.error("Error deleting conversation:",t)}},toggleSidebar(){this.showSidebar?this.showSidebar=!1:this.$nextTick((()=>{this.showSidebar=!0}))},openSettings(){this.showSettings=!0},closeSettings(){this.showSettings=!1},runPythonInterpreter(){this.showPythonInterpreter=!0,this.$nextTick((()=>{this.$refs.pythonInterpreter.runPythonInterpreter()}))},runPythonCode(e){this.showPythonInterpreter=!0,this.$nextTick((()=>{this.$refs.pythonInterpreter.runCode(e)}))},closePythonInterpreter(){this.showPythonInterpreter=!1}}};const Ft=(0,p.A)(Wt,[["render",de],["__scopeId","data-v-629d63de"]]);var Rt=Ft,Qt={name:"App",components:{Login:g,Register:C,ChatInterface:Rt},data(){return{currentView:"login"}},methods:{onLoginSuccess(){this.currentView="chat"},showRegister(){this.currentView="register"},showLogin(){this.currentView="login"},logout(){this.currentView="login"}}};const Nt=(0,p.A)(Qt,[["render",i]]);var zt=Nt,Ut=o(5798);const Vt=[{path:"/login",component:g},{path:"/register",component:C},{path:"/chat",component:Rt}],qt=(0,Ut.aE)({history:(0,Ut.LA)(),routes:Vt});var Ht=qt;(0,n.Ef)(zt).use(Ht).mount("#app")}},t={};function o(n){var s=t[n];if(void 0!==s)return s.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,n,s,r){if(!n){var i=1/0;for(d=0;d<e.length;d++){n=e[d][0],s=e[d][1],r=e[d][2];for(var a=!0,l=0;l<n.length;l++)(!1&r||i>=r)&&Object.keys(o.O).every((function(e){return o.O[e](n[l])}))?n.splice(l--,1):(a=!1,r<i&&(i=r));if(a){e.splice(d--,1);var c=s();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[n,s,r]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/"}(),function(){var e={524:0};o.O.j=function(t){return 0===e[t]};var t=function(t,n){var s,r,i=n[0],a=n[1],l=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(s in a)o.o(a,s)&&(o.m[s]=a[s]);if(l)var d=l(o)}for(t&&t(n);c<i.length;c++)r=i[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},n=self["webpackChunkai_chat_app"]=self["webpackChunkai_chat_app"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[504],(function(){return o(7154)}));n=o.O(n)})();
//# sourceMappingURL=app.1d4bd7e4.js.map